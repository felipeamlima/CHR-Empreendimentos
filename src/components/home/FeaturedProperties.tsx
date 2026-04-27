import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropertyCard, { type PropertyProps } from '../ui/PropertyCard';
import './FeaturedProperties.css';

const mockProperties: PropertyProps[] = [
    {
        id: 'maranhao',
        title: 'Edifício Maranhão',
        location: 'Funcionários · Belo Horizonte',
        image: '/gallery/maranhao/maranhao1.jpg',
        status: 'Em Obras',
        specs: { area: '68m² a 182m²', beds: '2 e 3 Quartos', parking: '1 e 2 Vagas' },
    },
    {
        id: 'sion-prime',
        title: 'Sion Prime',
        location: 'Sion · Belo Horizonte',
        image: '/gallery/sion-prime/1.jpg',
        status: 'Lançamento',
        specs: { area: '57 a 140m²', beds: '2 e 3 Quartos', parking: '2 Vagas' },
    },
    {
        id: 'sao-domingos',
        title: 'Edifício E. Pinheiro',
        location: 'São Pedro · Belo Horizonte',
        image: '/gallery/sao-domingos/1.jpg',
        status: 'Em Obras',
        specs: { area: '36 a 160m²', beds: '1, 2 e 3 Quartos', parking: '1 e 2 Vagas' },
    },
];

const filters = ['Todos', 'Lançamento', 'Em Obras', 'Pronto para Morar', 'Portfólio'];
const headlineWords = ['Onde', 'a', 'Arquitetura', 'Encontra', 'a', 'Alma.'];

export default function FeaturedProperties() {
    const [activeFilter, setActiveFilter] = useState('Todos');

    const filtered =
        activeFilter === 'Todos'
            ? mockProperties
            : mockProperties.filter((p) => p.status === activeFilter);

    return (
        <section className="featured-experience-dark">
            <div className="fp-aurora" aria-hidden="true" />

            <div className="container">
                <div className="experience-top">
                    <div className="experience-heading">
                        <motion.div
                            className="fp-eyebrow"
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="fp-eyebrow-line" />
                            <span className="fp-eyebrow-text">PORTFÓLIO EXCLUSIVO</span>
                        </motion.div>

                        <h2 className="luxury-title" aria-label="Onde a Arquitetura Encontra a Alma.">
                            <span className="fp-title-line">
                                {headlineWords.slice(0, 3).map((word, i) => (
                                    <span className="fp-word-wrap" key={`a-${i}`}>
                                        <motion.span
                                            className="fp-word"
                                            initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                                            viewport={{ once: true, amount: 0.5 }}
                                            transition={{
                                                duration: 0.9,
                                                delay: 0.15 + i * 0.1,
                                                ease: [0.77, 0, 0.175, 1],
                                            }}
                                        >
                                            {word}
                                        </motion.span>
                                    </span>
                                ))}
                            </span>
                            <span className="fp-title-line">
                                {headlineWords.slice(3).map((word, i) => (
                                    <span className="fp-word-wrap" key={`b-${i}`}>
                                        <motion.span
                                            className={`fp-word ${
                                                word === 'Alma.' ? 'fp-word-accent' : ''
                                            }`}
                                            initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                                            viewport={{ once: true, amount: 0.5 }}
                                            transition={{
                                                duration: 0.9,
                                                delay: 0.5 + i * 0.1,
                                                ease: [0.77, 0, 0.175, 1],
                                            }}
                                        >
                                            {word}
                                        </motion.span>
                                    </span>
                                ))}
                            </span>
                        </h2>

                        <motion.span
                            className="fp-title-underline"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 1, delay: 0.9, ease: [0.19, 1, 0.22, 1] }}
                            aria-hidden="true"
                        />
                    </div>

                    <motion.div
                        className="luxury-filters"
                        role="tablist"
                        aria-label="Filtrar empreendimentos"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        {filters.map((f) => {
                            const isActive = activeFilter === f;
                            return (
                                <button
                                    key={f}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    className={`luxury-f-btn ${isActive ? 'active' : ''}`}
                                    onClick={(e) => {
                                        setActiveFilter(f);
                                        e.currentTarget.scrollIntoView({
                                            behavior: 'smooth',
                                            inline: 'center',
                                            block: 'nearest',
                                        });
                                    }}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="filter-pill-active"
                                            className="luxury-f-bg"
                                            transition={{
                                                type: 'spring',
                                                stiffness: 320,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                    <span className="luxury-f-label">{f}</span>
                                </button>
                            );
                        })}
                    </motion.div>
                </div>

                <div className="luxury-experience-grid">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((property, idx) => (
                            <motion.div
                                key={property.id}
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{
                                    duration: 0.7,
                                    delay: idx * 0.12,
                                    ease: [0.19, 1, 0.22, 1],
                                }}
                            >
                                <PropertyCard {...property} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <motion.div
                    className="luxury-footer-action"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <Link to="/empreendimentos" className="btn-v-all-luxury">
                        <span>Conheça nosso portfólio</span>
                        <ArrowUpRight size={18} className="btn-v-all-arrow" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
