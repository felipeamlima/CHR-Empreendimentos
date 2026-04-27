import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropertyCard, { type PropertyProps } from '../ui/PropertyCard';
import './FeaturedProperties.css';

const mockProperties: PropertyProps[] = [
    {
        id: "maranhao", title: "Edifício Maranhão", location: "Funcionários, Belo Horizonte",
        image: "/gallery/maranhao/maranhao1.jpg",
        status: "Em Obras", specs: { area: "68m² a 182m²", beds: "2 e 3 Quartos", parking: "1 e 2 Vagas" }
    },
    {
        id: "sion-prime", title: "Sion Prime", location: "Sion, Belo Horizonte",
        image: "/gallery/sion-prime/1.jpg",
        status: "Lançamento", specs: { area: "57 a 140m²", beds: "2 e 3 Quartos", parking: "2 Vagas" }
    },
    {
        id: "sao-domingos", title: "Edifício E. Pinheiro", location: "Rua São Domingos do Prata, 119 - São Pedro",
        image: "/gallery/sao-domingos/1.jpg",
        status: "Em Obras", specs: { area: "36 a 160m²", beds: "1, 2 e 3 Quartos", parking: "1 e 2 Vagas" }
    }
];

export default function FeaturedProperties() {
    const [activeFilter, setActiveFilter] = useState('Todos');
    const filters = ['Todos', 'Lançamento', 'Em Obras', 'Pronto para Morar', 'Portfólio'];

    const filtered = activeFilter === 'Todos'
        ? mockProperties
        : mockProperties.filter(p => p.status === activeFilter);

    const scrollFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    };

    return (
        <section className="featured-experience-dark">
            <div className="container">
                <div className="experience-top">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="gold-label">PORTIFÓLIO EXCLUSIVO</span>
                        <h2 className="luxury-title">Onde a Arquitetura <span>Encontra a Alma.</span></h2>
                    </motion.div>

                    <div className="luxury-filters">
                        {filters.map(f => (
                            <button
                                key={f}
                                className={`luxury-f-btn ${activeFilter === f ? 'active' : ''}`}
                                onClick={(e) => {
                                    setActiveFilter(f);
                                    scrollFilter(e);
                                }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="luxury-experience-grid">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((property, idx) => (
                            <motion.div
                                key={property.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <PropertyCard {...property} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="luxury-footer-action">
                    <Link to="/empreendimentos" className="btn-v-all-luxury">
                        <span>EXPLORAR PORTIFÓLIO COMPLETO</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
