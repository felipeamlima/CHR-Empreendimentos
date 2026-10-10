import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import PropertyCard from '../components/ui/PropertyCard';
import {
    fetchPropertyOverrides,
    type PropertyOverrideMap,
} from '../services/propertiesService';
import { buildCatalog, CATALOG_TABS, type CatalogTab } from '../data/properties';
import './Properties.css';

export default function Properties() {
    const [activeStatus, setActiveStatus] = useState<CatalogTab>('Todos');
    const [searchQuery, setSearchQuery] = useState('');

    const statusOptions = CATALOG_TABS;

    const [overrides, setOverrides] = useState<PropertyOverrideMap>({});
    useEffect(() => {
        let cancelled = false;
        fetchPropertyOverrides().then((map) => {
            if (!cancelled) setOverrides(map);
        });
        return () => { cancelled = true; };
    }, []);

    // Lançamentos → Últimas Unidades → Em Obras → Concluídos
    const filteredProperties = useMemo(
        () => buildCatalog(overrides, activeStatus, searchQuery),
        [activeStatus, searchQuery, overrides],
    );

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
                        <h1 className="hero-main-title" aria-label="Portifólio Exclusivo">
                            <span className="hero-line">
                                <span className="hero-word-wrap">
                                    <motion.span
                                        className="hero-word"
                                        initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                        animate={{ clipPath: 'inset(0 0% 0 0)' }}
                                        transition={{ duration: 1, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
                                    >
                                        PORTIFÓLIO
                                    </motion.span>
                                </span>
                            </span>
                            <span className="hero-line">
                                <span className="hero-word-wrap">
                                    <motion.span
                                        className="hero-word hero-word-accent"
                                        initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                        animate={{ clipPath: 'inset(0 0% 0 0)' }}
                                        transition={{ duration: 1, delay: 0.55, ease: [0.77, 0, 0.175, 1] }}
                                    >
                                        EXCLUSIVO
                                    </motion.span>
                                </span>
                            </span>
                        </h1>
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
