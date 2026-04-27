import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Compass, MapPin, Sparkles, Shield, ArrowUpRight } from 'lucide-react';
import './Manifesto.css';

const rotatingWords = ['futuro', 'patrimônio', 'legado', 'valor'];

type Pillar = {
    icon: typeof Compass;
    title: string;
    description: string;
};

const pillars: Pillar[] = [
    {
        icon: Compass,
        title: 'Engenharia de Ponta',
        description:
            'Mais de 20 anos refinando processos construtivos, com rigor técnico em cada estrutura.',
    },
    {
        icon: MapPin,
        title: 'Localização Estratégica',
        description:
            'Terrenos minuciosamente selecionados nas regiões mais valorizadas de Belo Horizonte.',
    },
    {
        icon: Sparkles,
        title: 'Design Autoral',
        description:
            'Plantas inteligentes, áreas comuns marcantes e arquitetura que assina cada empreendimento.',
    },
    {
        icon: Shield,
        title: 'Solidez CHR',
        description:
            'Histórico inegociável: 100% dos empreendimentos entregues no prazo contratado.',
    },
];

type Stat = {
    target: number;
    suffix: string;
    label: string;
    format?: (n: number) => string;
};

const stats: Stat[] = [
    { target: 25, suffix: '+', label: 'Anos de mercado' },
    { target: 40, suffix: '+', label: 'Empreendimentos entregues' },
    {
        target: 150000,
        suffix: '+',
        label: 'm² desenvolvidos',
        format: (n) => `${Math.round(n / 1000)}k`,
    },
];

function useCountUp(target: number, duration = 2200, shouldStart = false) {
    const [value, setValue] = useState(0);
    const startedRef = useRef(false);

    useEffect(() => {
        if (!shouldStart || startedRef.current) return;
        startedRef.current = true;

        const start = performance.now();
        let frame = 0;

        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * target));
            if (progress < 1) {
                frame = requestAnimationFrame(tick);
            } else {
                setValue(target);
            }
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [target, duration, shouldStart]);

    return value;
}

function StatItem({ stat, delay }: { stat: Stat; delay: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    const value = useCountUp(stat.target, 2200, inView);
    const displayed = stat.format ? stat.format(value) : value.toLocaleString('pt-BR');

    return (
        <motion.div
            ref={ref}
            className="manifesto-stat"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay }}
        >
            <span className="manifesto-stat-value">
                <span className="manifesto-stat-plus">+</span>
                {displayed}
                {stat.suffix === '+' ? '' : stat.suffix}
            </span>
            <span className="manifesto-stat-label">{stat.label}</span>
        </motion.div>
    );
}

export default function Manifesto() {
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const id = window.setInterval(() => {
            setWordIndex((i) => (i + 1) % rotatingWords.length);
        }, 2400);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="manifesto">
            <div className="manifesto-aurora manifesto-aurora-a" aria-hidden="true" />
            <div className="manifesto-aurora manifesto-aurora-b" aria-hidden="true" />
            <div className="manifesto-grid-overlay" aria-hidden="true" />

            <div className="container manifesto-container">
                <div className="manifesto-grid">
                    {/* LEFT — Narrative */}
                    <motion.div
                        className="manifesto-content"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                    >
                        <div className="manifesto-eyebrow">
                            <span className="manifesto-eyebrow-line" />
                            <span className="manifesto-eyebrow-text">CONSTRUTORA CHR</span>
                        </div>

                        <h2 className="manifesto-headline">
                            <span className="manifesto-headline-static">Projetamos o</span>
                            <span className="manifesto-headline-rotator">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={rotatingWords[wordIndex]}
                                        className="manifesto-headline-word"
                                        initial={{ y: '105%', opacity: 0 }}
                                        animate={{ y: '0%', opacity: 1 }}
                                        exit={{ y: '-105%', opacity: 0 }}
                                        transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
                                    >
                                        {rotatingWords[wordIndex]}
                                        <span className="manifesto-headline-dot">.</span>
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                        </h2>

                        <p className="manifesto-lede">
                            Há mais de duas décadas, transformamos terrenos estratégicos em
                            patrimônios duradouros — unindo arquitetura autoral, engenharia
                            rigorosa e visão de longo prazo.
                        </p>

                        <div className="manifesto-stats" role="list">
                            {stats.map((stat, i) => (
                                <StatItem key={stat.label} stat={stat} delay={0.2 + i * 0.12} />
                            ))}
                        </div>

                        <motion.a
                            href="/sobre"
                            className="manifesto-cta"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.55 }}
                        >
                            <span>Conheça nossa história</span>
                            <ArrowUpRight size={16} className="manifesto-cta-arrow" />
                        </motion.a>
                    </motion.div>

                    {/* RIGHT — Pillars */}
                    <div className="manifesto-pillars">
                        {pillars.map((pillar, i) => {
                            const Icon = pillar.icon;
                            return (
                                <motion.article
                                    key={pillar.title}
                                    className="manifesto-pillar"
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{
                                        duration: 0.7,
                                        delay: 0.1 + i * 0.12,
                                        ease: [0.19, 1, 0.22, 1],
                                    }}
                                >
                                    <span className="manifesto-pillar-index">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <div className="manifesto-pillar-icon">
                                        <Icon size={22} strokeWidth={1.4} />
                                    </div>
                                    <h3 className="manifesto-pillar-title">{pillar.title}</h3>
                                    <p className="manifesto-pillar-text">{pillar.description}</p>
                                    <span className="manifesto-pillar-glow" aria-hidden="true" />
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
