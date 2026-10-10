import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropertyCard from '../ui/PropertyCard';
import {
    fetchPropertyOverrides,
    type PropertyOverrideMap,
} from '../../services/propertiesService';
import { buildCatalog, CATALOG_TABS, type CatalogTab } from '../../data/properties';
import './FeaturedProperties.css';

/** How many cards the home showcase displays per tab. */
const MAX_CARDS = 6;

const filters = CATALOG_TABS;

export default function FeaturedProperties() {
    const [activeFilter, setActiveFilter] = useState<CatalogTab>('Todos');

    const [overrides, setOverrides] = useState<PropertyOverrideMap>({});
    useEffect(() => {
        let cancelled = false;
        fetchPropertyOverrides().then((map) => {
            if (!cancelled) setOverrides(map);
        });
        return () => { cancelled = true; };
    }, []);

    // Full list per tab, already synced with the sheet and sorted
    // (Lançamentos → Últimas Unidades → Em Obras → Concluídos).
    const catalog = useMemo(() => {
        const map = {} as Record<CatalogTab, ReturnType<typeof buildCatalog>>;
        for (const f of filters) map[f] = buildCatalog(overrides, f);
        return map;
    }, [overrides]);

    // "Todos" on the home is a curated mix: lançamentos first, but always
    // guarantees at least one card from each other active category.
    const filtered = useMemo(() => {
        const list = catalog[activeFilter];
        if (activeFilter !== 'Todos') return list.slice(0, MAX_CARDS);
        const picks = [
            catalog['Pronto para Morar'][0],
            catalog['Em Obras'][0],
        ].filter(Boolean);
        const launches = catalog['Lançamento'].slice(0, MAX_CARDS - picks.length);
        const chosen = new Set([...launches, ...picks].map((p) => p.id));
        return list.filter((p) => chosen.has(p.id)).slice(0, MAX_CARDS);
    }, [catalog, activeFilter]);

    const totalInTab = catalog[activeFilter].length;

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
                            <span className="fp-line-mask">
                                <motion.span
                                    className="fp-line"
                                    initial={{ y: '105%' }}
                                    animate={{ y: '0%' }}
                                    transition={{
                                        duration: 1.1,
                                        delay: 0.15,
                                        ease: [0.77, 0, 0.175, 1],
                                    }}
                                >
                                    Onde a Arquitetura
                                </motion.span>
                            </span>
                            <span className="fp-line-mask">
                                <motion.span
                                    className="fp-line"
                                    initial={{ y: '105%' }}
                                    animate={{ y: '0%' }}
                                    transition={{
                                        duration: 1.1,
                                        delay: 0.4,
                                        ease: [0.77, 0, 0.175, 1],
                                    }}
                                >
                                    Encontra a <em className="fp-soul">Alma.</em>
                                </motion.span>
                            </span>
                        </h2>

                        <motion.span
                            className="fp-title-underline"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 1.1, ease: [0.19, 1, 0.22, 1] }}
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
                                        // Scroll only the filter container (not the window)
                                        const btn = e.currentTarget;
                                        const container = btn.parentElement;
                                        if (
                                            container &&
                                            container.scrollWidth > container.clientWidth
                                        ) {
                                            const target =
                                                btn.offsetLeft -
                                                container.clientWidth / 2 +
                                                btn.offsetWidth / 2;
                                            container.scrollTo({
                                                left: target,
                                                behavior: 'smooth',
                                            });
                                        }
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
                                    <span className="luxury-f-count">{catalog[f].length}</span>
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
                        <span>
                            {totalInTab > filtered.length
                                ? `Ver todos os ${totalInTab} empreendimentos`
                                : 'Conheça nosso portfólio'}
                        </span>
                        <ArrowUpRight size={18} className="btn-v-all-arrow" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
