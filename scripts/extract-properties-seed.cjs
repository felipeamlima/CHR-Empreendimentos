/* eslint-disable */
// Extract property data from PropertyDetail.tsx into a TSV seed file
// for pasting into the CHR Empreendimentos Google Sheet.
//
// Run with: node scripts/extract-properties-seed.cjs

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src', 'pages', 'PropertyDetail.tsx');
const OUT = path.join(__dirname, 'properties-seed.tsv');

const code = fs.readFileSync(SRC, 'utf8');

// Find the db constant block — match brace pairing
const dbStart = code.indexOf('const db = {');
if (dbStart < 0) {
    console.error('Could not locate `const db = {` in source.');
    process.exit(1);
}
let depth = 0;
let dbEnd = -1;
for (let i = code.indexOf('{', dbStart); i < code.length; i++) {
    const c = code[i];
    if (c === '{') depth++;
    else if (c === '}') {
        depth--;
        if (depth === 0) {
            dbEnd = i;
            break;
        }
    }
}
if (dbEnd < 0) {
    console.error('Could not find closing brace of db.');
    process.exit(1);
}
const dbBlock = code.slice(dbStart, dbEnd + 1);

// Parse: split by top-level slug entries. Each entry starts with "    \"slug\": {"
const entryRegex = /^ {4}"([a-z0-9-]+)":\s*{([\s\S]*?)\n {4}},?$/gm;

const rows = [];
let m;
while ((m = entryRegex.exec(dbBlock)) !== null) {
    const slug = m[1];
    const body = m[2];

    const get = (key) => {
        const re = new RegExp(`${key}:\\s*"([^"\\n]*)"`);
        const r = body.match(re);
        return r ? r[1] : '';
    };
    const getNumber = (key) => {
        const re = new RegExp(`${key}:\\s*(\\d+)`);
        const r = body.match(re);
        return r ? r[1] : '';
    };
    const getArray = (key) => {
        const re = new RegExp(`${key}:\\s*\\[([\\s\\S]*?)\\]`);
        const r = body.match(re);
        if (!r) return [];
        return [...r[1].matchAll(/"([^"]*)"/g)].map((x) => x[1]);
    };
    const getSpec = (key) => {
        const specRe = new RegExp(`specs:\\s*{([^}]*)}`);
        const s = body.match(specRe);
        if (!s) return '';
        const inner = s[1];
        const r = inner.match(new RegExp(`${key}:\\s*"([^"]*)"`));
        return r ? r[1] : '';
    };
    const getStage = (idx) => {
        const stagesRe = /progressStages:\s*\[([\s\S]*?)\]/;
        const s = body.match(stagesRe);
        if (!s) return '';
        const arr = [...s[1].matchAll(/{ name: "[^"]*", v: (\d+) }/g)].map((x) => x[1]);
        return arr[idx] ?? '';
    };

    rows.push({
        slug,
        title: get('title'),
        location: get('location'),
        status: get('status'),
        progress: getNumber('progress'),
        area: getSpec('area'),
        beds: getSpec('beds'),
        parking: getSpec('parking'),
        floors: getSpec('floors'),
        units: getSpec('units'),
        leisure: getSpec('leisure'),
        desc: (body.match(/desc:\s*"([\s\S]*?)(?:",|"\s*,)/) || [, ''])[1].replace(/\\"/g, '"'),
        differentials: getArray('differentials').join(' | '),
        prog_terreno: getStage(0),
        prog_fundacoes: getStage(1),
        prog_super: getStage(2),
        prog_alvenaria: getStage(3),
        prog_instalacoes: getStage(4),
        prog_acabamento: getStage(5),
        visible: 'TRUE',
    });
}

const headers = [
    'slug',
    'title',
    'location',
    'status',
    'progress',
    'area',
    'beds',
    'parking',
    'floors',
    'units',
    'leisure',
    'desc',
    'differentials',
    'prog_terreno',
    'prog_fundacoes',
    'prog_super',
    'prog_alvenaria',
    'prog_instalacoes',
    'prog_acabamento',
    'visible',
];

const tsv = [headers.join('\t')]
    .concat(
        rows.map((r) =>
            headers.map((h) => String(r[h] ?? '').replace(/\t/g, ' ').replace(/\r?\n/g, ' ')).join('\t'),
        ),
    )
    .join('\n');

fs.writeFileSync(OUT, tsv);
console.log(`Wrote ${rows.length} rows to ${OUT}`);
