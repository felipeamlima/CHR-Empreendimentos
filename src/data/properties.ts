import type { PropertyProps } from '../components/ui/PropertyCard';
import type { PropertyOverrideMap } from '../services/propertiesService';

/**
 * Base catalogue of CHR properties. The Google Sheet (propertiesService)
 * overrides title/location/status/specs/visibility at runtime.
 */
export const activeProperties: PropertyProps[] = [
    {
        id: "maranhao", title: "Edifício Maranhão", location: "Rua Maranhão 1427 - Funcionários, Belo Horizonte",
        image: "/gallery/maranhao/maranhao1.jpg",
        status: "Lançamento", specs: { area: "68m² a 182m²", beds: "2 e 3 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "helena-borges", title: "Edifício Helena Borges", location: "Rua Itaparica 98 - Serra, Belo Horizonte",
        image: "/gallery/helena-borges/1.png",
        status: "Lançamento", specs: { area: "33m² a 78m²", beds: "1 e 2 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "sion-prime", title: "Sion Prime", location: "Rua Laranjal 129 e 139, Bairro Sion, Belo Horizonte",
        image: "/gallery/sion-prime/1.jpg",
        status: "Lançamento", specs: { area: "57m² a 140m²", beds: "2 e 3 Quartos", parking: "2 Vagas" }
    },
    {
        id: "sao-domingos", title: "Edifício E. Pinheiro", location: "Rua São Domingos do Prata, 119 - São Pedro",
        image: "/gallery/sao-domingos/1.jpg",
        status: "Em Obras", specs: { area: "36m² a 160m²", beds: "1, 2 e 3 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "j-silva", title: "Edifício J. Silva", location: "Rua Teixeira Magalhães, 130 - Floresta",
        image: "/gallery/j-silva/1.jpg",
        status: "Lançamento", specs: { area: "59m² a 124m²", beds: "2 Quartos", parking: "2 Vagas" }
    },
    {
        id: "m-faria", title: "Edifício M. Faria", location: "Rua Itajubá, 108 - Floresta",
        image: "/gallery/m-faria/1.jpg",
        status: "Lançamento", specs: { area: "36m² a 90m²", beds: "1 Quarto", parking: "1 Vaga" }
    },
    {
        id: "silva-jardim", title: "Edifício Silva Jardim", location: "Rua Silva Jardim, 192 - Floresta",
        image: "/gallery/silva-jardim/1.jpg",
        status: "Lançamento", specs: { area: "60m² a 175m²", beds: "2 a 4 Quartos", parking: "2 Vagas" }
    },
    {
        id: "major-lopes", title: "Edifício F. Duarte Vidigal", location: "Rua Major Lopes, 142 - São Pedro",
        image: "/gallery/major-lopes/1.jpg",
        status: "Em Obras", specs: { area: "34m² a 61m²", beds: "1 Quarto", parking: "1 Vaga" }
    },
    {
        id: "mar-de-espanha", title: "Edifício Mar de Espanha", location: "Rua Mar de Espanha, 422 - Santo Antônio",
        image: "/gallery/mar-de-espanha/1.jpg",
        status: "Em Obras", specs: { area: "60m² a 127,50m²", beds: "2 Quartos", parking: "2 Vagas" }
    },
    {
        id: "studio-aimores", title: "Studio Aimorés", location: "Rua Aimorés - Funcionários",
        image: "/gallery/aimores/1.jpg",
        status: "Lançamento", specs: { area: "A Definir", beds: "Studio", parking: "A Definir" }
    },
    {
        id: "stela-de-souza", title: "Studio Stela de Souza", location: "Rua Stela de Souza, 107 - Sagrada Família",
        image: "/gallery/stela-de-souza/1.jpg",
        status: "Em Obras", specs: { area: "37m² a 55m²", beds: "1 Quarto", parking: "1 Vaga" }
    },
    {
        id: "odilon-braga", title: "Edifício Odilon Braga", location: "Rua Odilon Braga, 369 - Anchieta",
        image: "/gallery/odilon-braga/1.jpg",
        status: "Em Obras", specs: { area: "60m² a 124m²", beds: "2 a 3 Quartos", parking: "2 Vagas" }
    },
    {
        id: "barao-de-cocais", title: "Studio Barão de Cocais", location: "Rua Barão de Cocais, 54 - Sagrada Família",
        image: "/gallery/barao-de-cocais/1.jpg",
        status: "Em Obras", specs: { area: "37m²a 100m²", beds: "1 Quarto", parking: "1 Vaga" }
    },
    {
        id: "silvestre-ferraz", title: "Studio Silvestre Ferraz", location: "Rua Silvestre Ferraz, 132 - Sagrada Família",
        image: "/gallery/silvestre-ferraz/1.jpg",
        status: "Em Obras", specs: { area: "37m² a 75m²", beds: "1 Quarto", parking: "1 Vaga" }
    },
    {
        id: "gisa-araujo", title: "Edifício Gisa Araújo", location: "Rua Pium-í, 930 - Sion",
        image: "/gallery/gisa-araujo/1.jpg",
        status: "Últimas Unidades", specs: { area: "60m² a 203m²", beds: "2, 3 e 4 Quartos", parking: "2 a 4 Vagas" }
    },
    {
        id: "costa-monteiro", title: "Edifício Costa Monteiro", location: "Rua Costa Monteiro, 699 - Sagrada Família",
        image: "/gallery/costa-monteiro/1.jpg",
        status: "Últimas Unidades", specs: { area: "40m² a 122m²", beds: "1, 2 e 3 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "enio-soares", title: "Edifício Enio Soares", location: "Rua Conselheiro Lafaiete, 497 - Sagrada Família",
        image: "/gallery/enio-soares/1.jpg",
        status: "Últimas Unidades", specs: { area: "60m² a 208m²", beds: "2 e 3 Quartos", parking: "2 Vagas" }
    },
    {
        id: "isabela-lima", title: "Edifício Isabela Lima", location: "Rua Jaime Gomes, 76 - Floresta",
        image: "/gallery/isabela-lima/1.jpg",
        status: "Concluído", specs: { area: "78m² a 187m²", beds: "3 e 3 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "sao-pedro", title: "Edifício São Pedro", location: "Rua Mestre Luiz, 76 - São Pedro",
        image: "/gallery/sao-pedro/1.jpg",
        status: "Concluído", specs: { area: "61m² a 127m²", beds: "2 e 3 Quartos", parking: "2 Vagas" }
    },
    {
        id: "chicago", title: "Edifício Chicago", location: "Rua Chicago, 295 - Sion",
        image: "/gallery/chicago/1.JPG",
        status: "Últimas Unidades", specs: { area: "37m² a 150m²", beds: "1 e 2 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "dom-vital", title: "Edifício Dom Vital", location: "Rua Dom Vital, 47 - Anchieta",
        image: "/gallery/dom-vital/1.jpg",
        status: "Últimas Unidades", specs: { area: "37m² a 93m²", beds: "1 e 2 Quartos", parking: "1 a 2 Vagas" }
    },
    {
        id: "amaro-linari", title: "Edifício Eng. Amaro Linari", location: "Rua Engenheiro Amaro Linari, 366 - Sion",
        image: "/gallery/amaro-linari/1.jpg",
        status: "Concluído", specs: { area: "59m² a 182m²", beds: "2 Quartos", parking: "2 Vagas" }
    },
    {
        id: "francisco-bressane", title: "Edifício CHR Francisco Bressane", location: "Rua Francisco Bressane, 119 - Floresta",
        image: "/gallery/francisco-bressane/1.jpg",
        status: "Últimas Unidades", specs: { area: "61m² a 283m²", beds: "2 a 4 Quartos", parking: "2 e 3 Vagas" }
    },
    {
        id: "machado-lima", title: "Edifício Machado Lima", location: "Rua Francisco Bressane, 142 - Floresta",
        image: "/gallery/machado-lima/1.jpg",
        status: "Últimas Unidades", specs: { area: "57m² a 257m²", beds: "2 e 3 Quartos", parking: "2 Vagas" }
    },
    {
        id: "jardins-do-prado", title: "Edifício Jardins do Prado", location: "Rua Contria, 444 - Prado",
        image: "/gallery/jardins-do-prado/1.jpg",
        status: "Concluído", specs: { area: "61m² a 275,80m²", beds: "2 e 3 Quartos", parking: "2 a 3 Vagas" }
    },
    {
        id: "vincentina-de-souza", title: "Edifício Vicentina de Souza", location: "Rua Vicentina de Souza, 138 - Sagrada Família",
        image: "/gallery/vincentina-de-souza/1.jpeg",
        status: "Lançamento", specs: { area: "38m² a 122m²", beds: "1, 2 e 3 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "arnaldo-xavier", title: "Edifício Arnaldo Xavier", location: "Rua Francisco Bressane, 152 - Floresta",
        image: "/gallery/arnaldo-xavier/1.jpg",
        status: "Concluído", specs: { area: "42m² a 120m²", beds: "1 e 2 Quartos", parking: "1 e 2 Vagas" }
    },
];

export const portfolioProperties: PropertyProps[] = [
    {
        id: "sao-manoel", title: "Edifício São Manoel", location: "Rua São Manoel, 263 - Bairro Floresta",
        image: "/gallery/sao-manoel/1.jpg",
        status: "Concluído", specs: { area: "40m² a 95m²", beds: "1 e 2 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "sao-roque", title: "Edifício São Roque", location: "Rua São Roque, 620 - Sagrada Família",
        image: "/gallery/sao-roque/1.jpg",
        status: "Concluído", specs: { area: "37m² a 108m²", beds: "1 e 2 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "marechal-hermes", title: "Edifício Marechal Hermes", location: "Rua Marechal Hermes, 778 - Gutierrez",
        image: "/gallery/marechal-hermes/1.jpg",
        status: "Concluído", specs: { area: "60m² a 122m²", beds: "2 Quartos", parking: "2 Vagas" }
    },
    {
        id: "geraldo-rezende", title: "Edifício Geraldo Rezende", location: "Rua Itajubá, 1138 - Sagrada Família",
        image: "/gallery/geraldo-rezende/1.jpg",
        status: "Concluído", specs: { area: "45m² a 140m²", beds: "1 e 2 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "itajuba", title: "Edifício Itajubá", location: "Rua Itajubá, 1350 - Sagrada Família",
        image: "/gallery/itajuba/1.jpg",
        status: "Concluído", specs: { area: "42m² a 155m²", beds: "1 e 2 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "iracema-drummond", title: "Edifício Iracema Drummond", location: "Rua Canada, 54 - Sion",
        image: "/gallery/iracema-drummond/1.jpg",
        status: "Concluído", specs: { area: "59m² a 237m²", beds: "2 e 3 Quartos", parking: "2 a 4 Vagas" }
    },
    {
        id: "dona-anisia", title: "Edifício Dona Anisia", location: "Rua Congonhas, 439 - São Pedro",
        image: "/gallery/dona-anisia/1.jpg",
        status: "Concluído", specs: { area: "57m² a 165m²", beds: "1 e 2 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "caldeira-brant", title: "Edifício Caldeira Brant", location: "Rua Caldeira Brant, 70 - Sagrada Família",
        image: "/gallery/caldeira-brant/1.jpg",
        status: "Concluído", specs: { area: "77m² a 240m²", beds: "2 e 3 Quartos", parking: "2 Vagas" }
    },
    {
        id: "adelson-pazzini", title: "Edifício Eng. Adelson Pazzini", location: "Rua São Manoel, 229 - Floresta",
        image: "/gallery/adelson-pazzini/1.jpg",
        status: "Concluído", specs: { area: "60m² a 163m²", beds: "2 e 3 Quartos", parking: "2 Vagas" }
    },
    {
        id: "macedo", title: "Edifício Macedo", location: "Rua Macedo, 117 - Floresta",
        image: "/gallery/macedo/1.jpg",
        status: "Concluído", specs: { area: "60m² a 173m²", beds: "3 e 3 Quartos", parking: "3 Vagas" }
    },
    {
        id: "itabira", title: "Edifício Itabira", location: "Rua Itabira, 625 - Floresta",
        image: "/gallery/itabira/1.jpg",
        status: "Concluído", specs: { area: "46m² a 113m²", beds: "2 Quartos", parking: "2 Vagas" }
    },
    {
        id: "mem-de-sa", title: "Edifício Mem de Sá", location: "Av. Mem de Sá, 766 - Santa Efigênia",
        image: "/gallery/mem-de-sa/1.jpg",
        status: "Concluído", specs: { area: "38m² a 122m²", beds: "1 e 2 Quartos", parking: "1 a 2 Vagas" }
    },
    {
        id: "nelson-souza", title: "Edifício Nelson Souza", location: "Rua Amapa, 72 - Serra",
        image: "/gallery/nelson-souza/1.jpg",
        status: "Concluído", specs: { area: "58m² a 186m²", beds: "2 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "dona-cleonice", title: "Edifício Dona Cleonice", location: "Rua São Domingos do Prata, 430 - São Pedro",
        image: "/gallery/dona-cleonice/1.jpg",
        status: "Concluído", specs: { area: "60m² a 160m²", beds: "1 e 2 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "stela-de-souza2", title: "Edifício Stela de Souza", location: "Rua Stela de Souza, 514 - Sagrada Família",
        image: "/gallery/stela-de-souza2/1.jpg",
        status: "Concluído", specs: { area: "42m² a 155m²", beds: "1 e 2 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "getulio-vargas", title: "Edifício Getúlio Vargas", location: "Avenida Getúlio Vargas, 58 - Funcionários",
        image: "/gallery/getulio-vargas/1.jpg",
        status: "Últimas Unidades", specs: { area: "39m² a 259m²", beds: "1, 2 e 3 Quartos", parking: "1 a 3 Vagas" }
    },
    {
        id: "waldir-chaves", title: "Edifício Waldir Chaves", location: "Rua Caldeira Brant, 371 - Sagrada Família",
        image: "/gallery/waldir-chaves/1.jpg",
        status: "Concluído", specs: { area: "41m² a 150m²", beds: "1 e 2 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "joao-ayres", title: "Edifício João Ayres", location: "Rua Oswaldo Ferraz, 532 - Sagrada Família",
        image: "/gallery/joao-ayres/1.jpg",
        status: "Concluído", specs: { area: "59m² a 148m²", beds: "1, 2 e 3 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "maria-das-dores-brandao", title: "Edifício Maria das Dores Brandão", location: "Rua Formosa, 12 - Santa Tereza",
        image: "/gallery/maria-das-dores-brandao/1.jpg",
        status: "Concluído", specs: { area: "37m² a 168m²", beds: "1 e 2 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "efigenia-de-freitas", title: "Edifício Efigênia de Freitas", location: "Rua Dr. Vieira Marques, 970 - Sagrada Família",
        image: "/gallery/efigenia-de-freitas/1.jpg",
        status: "Concluído", specs: { area: "43m² a 105m²", beds: "1 e 2 Quartos", parking: "1 e 2 Vagas" }
    }
];


/** Display priority: launches first, then last units, under construction, completed. */
export const STATUS_ORDER: Record<string, number> = {
    'Lançamento': 0,
    'Últimas Unidades': 1,
    'Pronto para Morar': 1,
    'Em Obras': 2,
    'Concluído': 3,
};

export const statusRank = (status: string) => STATUS_ORDER[status] ?? 9;

/** Stable sort by status priority (keeps original order inside each group). */
export function sortByStatus<T extends { status: string }>(list: T[]): T[] {
    return list
        .map((p, i) => ({ p, i }))
        .sort((a, b) => statusRank(a.p.status) - statusRank(b.p.status) || a.i - b.i)
        .map(({ p }) => p);
}



export type CatalogTab = 'Todos' | 'Lançamento' | 'Em Obras' | 'Pronto para Morar' | 'Portfólio';
export const CATALOG_TABS: CatalogTab[] = ['Todos', 'Lançamento', 'Em Obras', 'Pronto para Morar', 'Portfólio'];

/** Applies sheet overrides, filters by tab (effective status) and sorts by priority. */
export function buildCatalog(overrides: PropertyOverrideMap, tab: CatalogTab, search = ''): PropertyProps[] {
    const q = search.trim().toLowerCase();
    const merged = [...activeProperties, ...portfolioProperties]
        .filter((p) => overrides[p.id]?.visible !== false)
        .map((p) => {
            const ov = overrides[p.id];
            const portfolio = portfolioProperties.includes(p);
            if (!ov) return { p, portfolio };
            return {
                portfolio,
                p: {
                    ...p,
                    title: (ov.title ?? p.title).replace(/\\n|\n/g, ' '),
                    location: ov.location ?? p.location,
                    status: (ov.status ?? p.status) as PropertyProps['status'],
                    specs: { ...p.specs, ...(ov.specs || {}) },
                },
            };
        });

    const list = merged
        .filter(({ p, portfolio }) => {
            switch (tab) {
                case 'Lançamento': return p.status === 'Lançamento';
                case 'Em Obras': return p.status === 'Em Obras';
                case 'Pronto para Morar': return p.status === 'Últimas Unidades' || p.status === 'Pronto para Morar';
                case 'Portfólio': return p.status === 'Concluído';
                default: return !portfolio || p.status !== 'Concluído';
            }
        })
        .map(({ p }) => p)
        .filter((p) => !q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q));

    return sortByStatus(list);
}
