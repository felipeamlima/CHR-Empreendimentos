import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import PropertyCard, { type PropertyProps } from '../components/ui/PropertyCard';
import './Properties.css';

const allProperties: PropertyProps[] = [
    {
        id: "maranhao", title: "Edifício Maranhão", location: "Funcionários, Belo Horizonte",
        image: "/gallery/maranhao/maranhao1.jpg",
        status: "Lançamento", specs: { area: "68m² a 182m²", beds: "2 e 3 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "sion-prime", title: "Sion Prime", location: "Sion, Belo Horizonte",
        image: "/gallery/sion-prime/1.jpg",
        status: "Lançamento", specs: { area: "57 a 140m²", beds: "2 e 3 Quartos", parking: "2 Vagas" }
    },
    {
        id: "sao-domingos", title: "Edifício E. Pinheiro", location: "Rua São Domingos do Prata - São Pedro",
        image: "/gallery/sao-domingos/1.jpg",
        status: "Em Obras", specs: { area: "36 a 160m²", beds: "1, 2 e 3 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "j-silva", title: "Edifício J. Silva", location: "Rua Teixeira Magalhães, 130 - Floresta",
        image: "/gallery/j-silva/1.jpg",
        status: "Lançamento", specs: { area: "59 a 124m²", beds: "2 Quartos", parking: "2 Vagas" }
    },
    {
        id: "m-faria", title: "Edifício M. Faria", location: "Rua Itajubá, 108 - Floresta",
        image: "/gallery/m-faria/1.jpg",
        status: "Lançamento", specs: { area: "36m² a 90m²", beds: "1 Quarto", parking: "1 Vaga" }
    },
    {
        id: "silva-jardim", title: "Edifício Silva Jardim", location: "Rua Silva Jardim, 192 - Floresta",
        image: "/gallery/silva-jardim/1.jpg",
        status: "Lançamento", specs: { area: "60 a 191m²", beds: "2 a 4 Quartos", parking: "2 Vagas" }
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
        status: "Em Obras", specs: { area: "A Definir", beds: "Studio", parking: "A Definir" }
    },
    {
        id: "stela-de-souza", title: "Studio Stela de Souza", location: "Rua Stela de Souza, 107 - Sagrada Família",
        image: "/gallery/stela-de-souza/1.jpg",
        status: "Em Obras", specs: { area: "37m² a 55m²", beds: "1 Quarto", parking: "1 Vaga" }
    },
    {
        id: "odilon-braga", title: "Edifício Odilon Braga", location: "Rua Odilon Braga, 369 - Anchieta",
        image: "/gallery/odilon-braga/1.jpg",
        status: "Em Obras", specs: { area: "60 a 124m²", beds: "2 a 3 Quartos", parking: "2 Vagas" }
    },
    {
        id: "barao-de-cocais", title: "Studio Barão de Cocais", location: "Rua Barão de Cocais, 54 - Sagrada Família",
        image: "/gallery/barao-de-cocais/1.jpg",
        status: "Em Obras", specs: { area: "37 a 100m²", beds: "1 Quarto", parking: "1 Vaga" }
    },
    {
        id: "silvestre-ferraz", title: "Studio Silvestre Ferraz", location: "Rua Silvestre Ferraz, 132 - Sagrada Família",
        image: "/gallery/silvestre-ferraz/1.jpg",
        status: "Em Obras", specs: { area: "37 a 75m²", beds: "1 Quarto", parking: "1 Vaga" }
    },
    {
        id: "gisa-araujo", title: "Edifício Gisa Araújo", location: "Rua Pium-í, 930 - Sion",
        image: "/gallery/gisa-araujo/1.jpg",
        status: "Pronto para Morar", specs: { area: "60 a 203m²", beds: "2, 3 e 4 Quartos", parking: "2 a 4 Vagas" }
    },
    {
        id: "costa-monteiro", title: "Edifício Costa Monteiro", location: "Rua Costa Monteiro, 699 - Sagrada Família",
        image: "/gallery/costa-monteiro/1.jpg",
        status: "Pronto para Morar", specs: { area: "40 a 122m²", beds: "1, 2 e 3 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "enio-soares", title: "Edifício Enio Soares", location: "Rua Conselheiro Lafaiete, 497 - Sagrada Família",
        image: "/gallery/enio-soares/1.jpg",
        status: "Em Obras", specs: { area: "A Definir", beds: "2 e 3 Quartos", parking: "A Definir" }
    },
    {
        id: "isabela-lima", title: "Edifício Isabela Lima", location: "Rua Jaime Gomes, 76 - Floresta",
        image: "/gallery/isabela-lima/1.jpg",
        status: "Em Obras", specs: { area: "A Definir", beds: "A Definir", parking: "A Definir" }
    },
    {
        id: "sao-pedro", title: "Edifício São Pedro", location: "Rua Mestre Luiz, 76 - São Pedro",
        image: "/gallery/sao-pedro/1.jpg",
        status: "Em Obras", specs: { area: "A Definir", beds: "2 e 3 Quartos", parking: "A Definir" }
    },
    {
        id: "chicago", title: "Edifício Chicago", location: "Rua Chicago, 295 - Sion",
        image: "/gallery/chicago/1.JPG",
        status: "Em Obras", specs: { area: "A Definir", beds: "2 e 3 Quartos", parking: "A Definir" }
    },
    {
        id: "dom-vital", title: "Edifício Dom Vital", location: "Rua Dom Vital, 47 - Anchieta",
        image: "/gallery/dom-vital/1.jpg",
        status: "Em Obras", specs: { area: "37 a 75m²", beds: "1 Quarto", parking: "1 a 2 Vagas" }
    },
    {
        id: "amaro-linari", title: "Edifício Eng. Amaro Linari", location: "Rua Engenheiro Amaro Linari, 366 - Sion",
        image: "/gallery/amaro-linari/1.jpg",
        status: "Em Obras", specs: { area: "A Definir", beds: "2 e 3 Quartos", parking: "A Definir" }
    },
    {
        id: "francisco-bressane", title: "Edifício CHR Francisco Bressane", location: "Rua Francisco Bressane, 119 - Floresta",
        image: "/gallery/francisco-bressane/1.jpg",
        status: "Em Obras", specs: { area: "A Definir", beds: "2 e 3 Quartos", parking: "A Definir" }
    },
    {
        id: "machado-lima", title: "Edifício Machado Lima", location: "Rua Francisco Bressane, 142 - Floresta",
        image: "/gallery/machado-lima/1.jpg",
        status: "Em Obras", specs: { area: "A Definir", beds: "2 e 3 Quartos", parking: "A Definir" }
    },
    {
        id: "jardins-do-prado", title: "Edifício Jardins do Prado", location: "Rua Contria, 444 - Prado",
        image: "/gallery/jardins-do-prado/1.jpg",
        status: "Em Obras", specs: { area: "A Definir", beds: "2 e 3 Quartos", parking: "A Definir" }
    },
    {
        id: "arnaldo-xavier", title: "Edifício Arnaldo Xavier", location: "Rua Francisco Bressane, 152 - Floresta",
        image: "/gallery/arnaldo-xavier/1.jpg",
        status: "Em Obras", specs: { area: "A Definir", beds: "1 e 2 Quartos", parking: "1 e 2 Vagas" }
    },
];

const completedProperties: PropertyProps[] = [
    {
        id: "sao-manoel", title: "Edifício São Manoel", location: "Rua São Manoel, 263 - Bairro Floresta",
        image: "/gallery/sao-manoel/1.jpg",
        status: "Concluído", specs: { area: "A Definir", beds: "1 e 2 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "sao-roque", title: "Edifício São Roque", location: "Rua São Roque, 620 - Sagrada Família",
        image: "/gallery/sao-roque/1.jpg",
        status: "Concluído", specs: { area: "A Definir", beds: "1 Quarto", parking: "1 e 2 Vagas" }
    },
    {
        id: "marechal-hermes", title: "Edifício Marechal Hermes", location: "Rua Marechal Hermes, 778 - Gutierrez",
        image: "/gallery/marechal-hermes/1.jpg",
        status: "Concluído", specs: { area: "60m² a 120m²", beds: "2 Quartos", parking: "2 Vagas" }
    },
    {
        id: "geraldo-rezende", title: "Edifício Geraldo Rezende", location: "Rua Itajubá, 1138 - Sagrada Família",
        image: "/gallery/geraldo-rezende/1.jpg",
        status: "Concluído", specs: { area: "A Definir", beds: "1 e 2 Quartos", parking: "A Definir" }
    },
    {
        id: "itajuba", title: "Edifício Itajubá", location: "Rua Itajubá, 1350 - Sagrada Família",
        image: "/gallery/itajuba/1.jpg",
        status: "Concluído", specs: { area: "A Definir", beds: "1 e 2 Quartos", parking: "A Definir" }
    },
    {
        id: "iracema-drummond", title: "Edifício Iracema Drummond", location: "Rua Canada, 54 - Sion",
        image: "/gallery/iracema-drummond/1.jpg",
        status: "Concluído", specs: { area: "A Definir", beds: "A Definir", parking: "A Definir" }
    },
    {
        id: "dona-anisia", title: "Edifício CHR Dona Anisia", location: "Rua Congonhas, 439 - São Pedro",
        image: "/gallery/dona-anisia/1.jpg",
        status: "Concluído", specs: { area: "A Definir", beds: "A Definir", parking: "A Definir" }
    },
    {
        id: "caldeira-brant", title: "Edifício Caldeira Brant", location: "Rua Caldeira Brant, 70 - Sagrada Família",
        image: "/gallery/caldeira-brant/1.jpg",
        status: "Concluído", specs: { area: "A Definir", beds: "2 e 3 Quartos", parking: "A Definir" }
    },
    {
        id: "adelson-pazzini", title: "Edf. Eng. Adelson Pazzini", location: "Rua São Manoel, 229 - Floresta",
        image: "/gallery/adelson-pazzini/1.jpg",
        status: "Concluído", specs: { area: "A Definir", beds: "A Definir", parking: "A Definir" }
    },
    {
        id: "macedo", title: "Edifício Macedo", location: "Rua Macedo, 117 - Floresta",
        image: "/gallery/macedo/1.jpg",
        status: "Concluído", specs: { area: "A Definir", beds: "A Definir", parking: "A Definir" }
    },
    {
        id: "itabira", title: "Edifício CHR Itabira", location: "Rua Itabira, 625 - Floresta",
        image: "/gallery/itabira/1.jpg",
        status: "Concluído", specs: { area: "A Definir", beds: "A Definir", parking: "A Definir" }
    },
    {
        id: "mem-de-sa", title: "Edifício CHR Mem de Sá", location: "Av. Mem de Sá, 766 - Santa Efigênia",
        image: "/gallery/mem-de-sa/1.jpg",
        status: "Concluído", specs: { area: "A Definir", beds: "A Definir", parking: "A Definir" }
    },
    {
        id: "nelson-souza", title: "Edifício Nelson Souza", location: "Rua Amapa, 72 - Serra",
        image: "/gallery/nelson-souza/1.jpg",
        status: "Concluído", specs: { area: "A Definir", beds: "2 e 3 Quartos", parking: "A Definir" }
    },
    {
        id: "dona-cleonice", title: "Edifício Dona Cleonice", location: "Rua São Domingos do Prata, 430 - São Pedro",
        image: "/gallery/dona-cleonice/1.jpg",
        status: "Concluído", specs: { area: "A Definir", beds: "2 Quartos", parking: "A Definir" }
    },
    {
        id: "stela-de-souza2", title: "Edifício CHR Stela de Souza", location: "Rua Stela de Souza, 514 - Sagrada Família",
        image: "/gallery/stela-de-souza2/1.jpg",
        status: "Concluído", specs: { area: "A Definir", beds: "1, 2 e 3 Quartos", parking: "A Definir" }
    },
    {
        id: "getulio-vargas", title: "Edifício CHR Getúlio Vargas", location: "Avenida Getulio Vargas, 58 - Funcionários",
        image: "/gallery/getulio-vargas/1.jpg",
        status: "Concluído", specs: { area: "A Definir", beds: "1, 2 e 3 Quartos", parking: "A Definir" }
    },
    {
        id: "waldir-chaves", title: "Edifício Waldir Chaves", location: "Rua Caldeira Brant, 371 - Sagrada Família",
        image: "/gallery/waldir-chaves/1.jpg",
        status: "Concluído", specs: { area: "A Definir", beds: "1 e 2 Quartos", parking: "A Definir" }
    },
    {
        id: "joao-ayres", title: "Edifício João Ayres", location: "Rua Oswaldo Ferraz, 532 - Sagrada Família",
        image: "/gallery/joao-ayres/1.jpg",
        status: "Concluído", specs: { area: "A Definir", beds: "2 e 3 Quartos", parking: "A Definir" }
    },
    {
        id: "maria-das-dores-brandao", title: "Edifício Maria das Dores Brandão", location: "Rua Formosa, 12 - Santa Tereza",
        image: "/gallery/maria-das-dores-brandao/1.jpg",
        status: "Concluído", specs: { area: "A Definir", beds: "A Definir", parking: "A Definir" }
    },
    {
        id: "efigenia-de-freitas", title: "Edifício Efigênia de Freitas", location: "Rua Dr. Vieira Marques, 970 - Sagrada Família",
        image: "/gallery/efigenia-de-freitas/1.jpg",
        status: "Concluído", specs: { area: "A Definir", beds: "A Definir", parking: "A Definir" }
    }
];

export default function Properties() {
    const [activeStatus, setActiveStatus] = useState<string>('Todos');
    const [searchQuery, setSearchQuery] = useState('');

    const statusOptions = ['Todos', 'Lançamento', 'Em Obras', 'Pronto para Morar', 'Portfólio'];

    const filteredProperties = useMemo(() => {
        if (activeStatus === 'Portfólio') {
            return completedProperties.filter(property => {
                const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    property.location.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesSearch;
            });
        }
        return allProperties.filter(property => {
            const matchesStatus = activeStatus === 'Todos' || property.status === activeStatus;
            const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.location.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [activeStatus, searchQuery]);

    return (
        <div className="properties-page">
            <header className="listing-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hero-text"
                    >
                        <span className="hero-tag">CHR EXPERIENCE</span>
                        <h1 className="hero-main-title">PORTIFÓLIO <br /> <span>EXCLUSIVO</span></h1>
                        <p>Onde cada traço é pensado para você. Viva a experiência CHR.</p>
                    </motion.div>
                </div>
                <div className="hero-gradient"></div>
            </header>

            <main className="container listing-main">
                <div className="luxury-filter-bar">
                    <div className="search-pill">
                        <Search size={18} />
                        <input
                            placeholder="Buscar residência..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="status-pills">
                        {statusOptions.map(opt => (
                            <button
                                key={opt}
                                className={`pill ${activeStatus === opt ? 'active' : ''}`}
                                onClick={() => setActiveStatus(opt)}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="listing-grid-wrapper">
                    <AnimatePresence>
                        <div className="luxury-listing-grid">
                            {filteredProperties.map((p, idx) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <PropertyCard {...p} />
                                </motion.div>
                            ))}
                        </div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
