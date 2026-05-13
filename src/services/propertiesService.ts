/**
 * Fetches property overrides from the "CHR Empreendimentos" Google Sheet
 * via Apps Script. Each row, indexed by slug, OVERRIDES the hardcoded
 * fields in PropertyDetail.tsx's `db`. Fields left blank in the sheet
 * fall through to the hardcoded value.
 */

const ENDPOINT = ''; // <— Paste deployed Apps Script URL here after setup

const CACHE_KEY = 'chr_properties_overrides_v1';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export type PropertyOverride = {
    title?: string;
    location?: string;
    status?: string;
    progress?: number;
    specs?: Partial<{
        area: string;
        beds: string;
        parking: string;
        floors: string;
        units: string;
        leisure: string;
    }>;
    desc?: string;
    differentials?: string[];
    progressStages?: { name: string; v: number }[];
    visible?: boolean;
};

export type PropertyOverrideMap = Record<string, PropertyOverride>;

type RawRow = {
    slug?: string;
    title?: string;
    location?: string;
    status?: string;
    progress?: string | number;
    area?: string;
    beds?: string;
    parking?: string;
    floors?: string;
    units?: string;
    leisure?: string;
    desc?: string;
    differentials?: string;
    prog_terreno?: string | number;
    prog_fundacoes?: string | number;
    prog_super?: string | number;
    prog_alvenaria?: string | number;
    prog_instalacoes?: string | number;
    prog_acabamento?: string | number;
    visible?: string | boolean;
};

const num = (v: unknown): number | undefined => {
    if (v === '' || v === null || v === undefined) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
};

const str = (v: unknown): string | undefined => {
    if (v === '' || v === null || v === undefined) return undefined;
    return String(v);
};

const parseRow = (row: RawRow): PropertyOverride | null => {
    if (!row.slug) return null;

    // visible: respect TRUE/FALSE/"true"/"false" — undefined means default true
    let visible: boolean | undefined;
    if (typeof row.visible === 'boolean') visible = row.visible;
    else if (typeof row.visible === 'string') {
        const v = row.visible.trim().toLowerCase();
        if (v === 'false' || v === 'no' || v === '0') visible = false;
        else if (v === 'true' || v === 'yes' || v === '1') visible = true;
    }

    const specs: PropertyOverride['specs'] = {};
    if (str(row.area)) specs.area = str(row.area)!;
    if (str(row.beds)) specs.beds = str(row.beds)!;
    if (str(row.parking)) specs.parking = str(row.parking)!;
    if (str(row.floors)) specs.floors = str(row.floors)!;
    if (str(row.units)) specs.units = str(row.units)!;
    if (str(row.leisure)) specs.leisure = str(row.leisure)!;

    // Differentials supports both pipe-separated (|) and newline-separated
    let differentials: string[] | undefined;
    if (typeof row.differentials === 'string' && row.differentials.trim()) {
        differentials = row.differentials
            .split(/\s*\|\s*|\r?\n/)
            .map((s) => s.trim())
            .filter(Boolean);
    }

    // Stage overrides — only if at least one stage has a value
    const stageValues = [
        num(row.prog_terreno),
        num(row.prog_fundacoes),
        num(row.prog_super),
        num(row.prog_alvenaria),
        num(row.prog_instalacoes),
        num(row.prog_acabamento),
    ];
    const stageNames = [
        'Preparo do Terreno',
        'Fundações',
        'Superestrutura',
        'Alvenaria',
        'Instalações',
        'Acabamento',
    ];
    let progressStages: PropertyOverride['progressStages'];
    if (stageValues.some((v) => v !== undefined)) {
        progressStages = stageNames.map((name, i) => ({
            name,
            v: stageValues[i] ?? 0,
        }));
    }

    const override: PropertyOverride = {};
    if (str(row.title)) override.title = str(row.title);
    if (str(row.location)) override.location = str(row.location);
    if (str(row.status)) override.status = str(row.status);
    if (num(row.progress) !== undefined) override.progress = num(row.progress);
    if (Object.keys(specs).length > 0) override.specs = specs;
    if (str(row.desc)) override.desc = str(row.desc);
    if (differentials) override.differentials = differentials;
    if (progressStages) override.progressStages = progressStages;
    if (visible !== undefined) override.visible = visible;

    return override;
};

const loadFromCache = (): PropertyOverrideMap | null => {
    if (typeof sessionStorage === 'undefined') return null;
    try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as { ts: number; data: PropertyOverrideMap };
        if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
        return parsed.data;
    } catch {
        return null;
    }
};

const saveToCache = (data: PropertyOverrideMap) => {
    if (typeof sessionStorage === 'undefined') return;
    try {
        sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ ts: Date.now(), data }),
        );
    } catch {
        /* ignore quota errors */
    }
};

export async function fetchPropertyOverrides(): Promise<PropertyOverrideMap> {
    if (!ENDPOINT) return {};

    const cached = loadFromCache();
    if (cached) return cached;

    try {
        const res = await fetch(ENDPOINT, { method: 'GET' });
        const json = (await res.json()) as { properties?: Record<string, RawRow> };
        const rows = json.properties ?? {};
        const result: PropertyOverrideMap = {};
        for (const [slug, row] of Object.entries(rows)) {
            const parsed = parseRow({ ...row, slug });
            if (parsed) result[slug] = parsed;
        }
        saveToCache(result);
        return result;
    } catch {
        return {};
    }
}

/** Merge override fields on top of a base property object. Missing override
 *  fields keep the base value. */
export function mergeOverride<T extends Record<string, unknown>>(
    base: T,
    override: PropertyOverride | undefined,
): T {
    if (!override) return base;
    const result: any = { ...base };
    if (override.title !== undefined) result.title = override.title;
    if (override.location !== undefined) result.location = override.location;
    if (override.status !== undefined) result.status = override.status;
    if (override.progress !== undefined) result.progress = override.progress;
    if (override.desc !== undefined) result.desc = override.desc;
    if (override.differentials !== undefined) result.differentials = override.differentials;
    if (override.progressStages !== undefined) result.progressStages = override.progressStages;
    if (override.specs !== undefined) {
        result.specs = { ...(base.specs as object | undefined), ...override.specs };
    }
    return result as T;
}
