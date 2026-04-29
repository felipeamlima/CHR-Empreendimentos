import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
    Target,
    Eye,
    Shield,
    Building2,
    Award,
    Clock,
    TrendingUp,
    ArrowRight,
    MessageCircle,
    ChevronDown,
} from 'lucide-react';
import './About.css';

type Stat = {
    target: number;
    suffix: string;
    label: string;
    format?: (n: number) => string;
};

const stats: Stat[] = [
    { target: 25, suffix: '+', label: 'Anos de História' },
    { target: 40, suffix: '+', label: 'Empreendimentos' },
    { target: 2500, suffix: '+', label: 'Famílias Felizes' },
    {
        target: 150000,
        suffix: '+',
        label: 'm² Construídos',
        format: (n: number) => `${Math.round(n / 1000)}k`,
    },
];

const timeline = [
    {
        year: '2001',
        title: 'Fundação',
        text: 'Nasce a CHR com a missão de desenvolver empreendimentos guiados por engenharia, confiança e visão de longo prazo.',
    },
    {
        year: '2008',
        title: 'Primeiro Marco Vertical',
        text: 'Entrega do primeiro edifício residencial, consolidando presença no mercado mineiro.',
    },
    {
        year: '2015',
        title: 'Escala e Reconhecimento',
        text: 'Mais de mil famílias impactadas por projetos entregues com excelência.',
    },
    {
        year: '2019',
        title: 'Nova Expansão',
        text: 'A CHR amplia atuação e fortalece sua presença estratégica em Belo Horizonte.',
    },
    {
        year: '2024',
        title: 'Legado em Evolução',
        text: 'Mais de 40 empreendimentos entregues e uma nova fase de crescimento.',
    },
];

const trajectoryStats = [
    '25 anos de mercado',
    '+40 empreendimentos',
    'Milhares de vidas impactadas',
    'Construindo valor desde 2001',
];

const differentials = [
    {
        icon: Building2,
        title: 'Engenharia Própria',
        text: 'Controle técnico total em todas as etapas da obra, assegurando qualidade e eficiência.',
    },
    {
        icon: Award,
        title: 'Arquitetura Premiada',
        text: 'Projetos que unem estética, funcionalidade e valor duradouro.',
    },
    {
        icon: Clock,
        title: 'Prazo Garantido',
        text: 'Compromisso rigoroso com cronogramas e previsibilidade de entrega.',
    },
    {
        icon: TrendingUp,
        title: 'Valorização Real',
        text: 'Empreendimentos pensados para preservar e ampliar valor patrimonial.',
    },
];

const heroWords = ['CONSTRUINDO', 'O', 'LEGADO', 'DE', 'MINAS.'];

function useCountUp(target: number, duration = 2000, shouldStart = false) {
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
            // easeOutCubic
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

function StatItem({ stat, index }: { stat: Stat; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    const value = useCountUp(stat.target, 2000, inView);
    const displayed = stat.format ? stat.format(value) : value.toLocaleString('pt-BR');

    return (
        <motion.div
            ref={ref}
            className="stat-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <span className="stat-number">
                {displayed}
                {stat.suffix}
            </span>
            <span className="stat-label">{stat.label}</span>
        </motion.div>
    );
}

function TimelineItem({
    item,
    index,
    total,
}: {
    item: (typeof timeline)[number];
    index: number;
    total: number;
}) {
    const side = index % 2 === 0 ? 'left' : 'right';
    return (
        <motion.div
            className={`timeline-item timeline-item-${side}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
        >
            <span className="timeline-dot" aria-hidden="true">
                <span className="timeline-dot-pulse" />
                <span className="timeline-dot-core" />
            </span>

            <article className="timeline-card">
                <header className="timeline-card-head">
                    <span className="timeline-year">{item.year}</span>
                    <span className="timeline-step">
                        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>
                </header>
                <span className="timeline-rule" />
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-text">{item.text}</p>
                <span className="timeline-card-glow" aria-hidden="true" />
            </article>
        </motion.div>
    );
}

export default function About() {
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    const timelineRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: timelineProgress } = useScroll({
        target: timelineRef,
        offset: ['start 80%', 'end 20%'],
    });
    const lineScale = useTransform(timelineProgress, [0, 1], [0, 1]);

    // Subtle parallax on the narrative image
    const narrativeRef = useRef<HTMLElement>(null);
    const { scrollYProgress: narrativeProgress } = useScroll({
        target: narrativeRef,
        offset: ['start end', 'end start'],
    });
    const narrativeImageY = useTransform(narrativeProgress, [0, 1], ['-40px', '40px']);

    return (
        <div className="about-page">
            {/* Cinematic Hero */}
            <section className="about-hero" ref={heroRef}>
                <motion.div className="about-hero-bg" style={{ y: bgY }}>
                    <img
                        src="/about-hero-bg.png"
                        alt="Arquitetura CHR"
                        className="about-hero-image"
                    />
                    <div className="about-hero-overlay" />
                </motion.div>

                <div className="container about-hero-content">
                    <motion.span
                        className="about-hero-label"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Desde 2001
                    </motion.span>

                    <h1 className="about-hero-title" aria-label={heroWords.join(' ')}>
                        {heroWords.map((word, i) => (
                            <span className="hero-word-wrap" key={i}>
                                <motion.span
                                    className={
                                        word === 'LEGADO'
                                            ? 'hero-word hero-word-accent'
                                            : 'hero-word'
                                    }
                                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                    animate={{ clipPath: 'inset(0 0% 0 0)' }}
                                    transition={{
                                        duration: 1,
                                        delay: 0.3 + i * 0.15,
                                        ease: [0.77, 0, 0.175, 1],
                                    }}
                                >
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </h1>

                    <motion.div
                        className="hero-scroll-hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                        style={{ cursor: 'pointer' }}
                    >
                        <span>SAIBA MAIS</span>
                        <span className="hero-scroll-arrow">
                            <ChevronDown size={24} strokeWidth={2.5} />
                        </span>
                    </motion.div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="about-stats">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <StatItem key={index} stat={stat} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Differentials */}
            <section className="about-differentials">
                <div className="container">
                    <div className="differentials-title-block">
                        <div className="diff-eyebrow">
                            <span className="diff-eyebrow-line" />
                            <span className="diff-eyebrow-text">NOSSOS DIFERENCIAIS</span>
                        </div>

                        <motion.h2
                            className="diff-headline"
                            aria-label="O que nos torna singulares"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <span className="diff-line-mask">
                                <motion.span
                                    className="diff-line-text"
                                    variants={{
                                        hidden: { y: '105%' },
                                        visible: { y: '0%' },
                                    }}
                                    transition={{ duration: 1.05, delay: 0.15, ease: [0.77, 0, 0.175, 1] }}
                                >
                                    O que nos torna <em className="diff-soul">singulares</em>
                                </motion.span>
                            </span>
                        </motion.h2>
                    </div>

                    <div className="differentials-grid">
                        {differentials.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.article
                                    key={i}
                                    className="differential-card"
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{
                                        duration: 0.7,
                                        delay: 0.1 + i * 0.1,
                                        ease: [0.19, 1, 0.22, 1],
                                    }}
                                >
                                    <span className="differential-index">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <div className="differential-icon">
                                        <Icon size={28} strokeWidth={1.4} />
                                    </div>
                                    <h3 className="differential-title">{item.title}</h3>
                                    <p className="differential-text">{item.text}</p>
                                    <span className="differential-border" />
                                    <span className="differential-glow" aria-hidden="true" />
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Narrative */}
            <section className="about-narrative container" ref={narrativeRef}>
                <div className="narrative-grid">
                    <motion.div
                        className="narrative-text-block"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                    >
                        <motion.div
                            className="narrative-eyebrow"
                            variants={{
                                hidden: { opacity: 0, y: 12 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.7, delay: 0.05 }}
                        >
                            <span className="narrative-eyebrow-line" />
                            <span className="narrative-eyebrow-text">A CONSTRUTORA</span>
                        </motion.div>

                        <h2 className="narrative-headline" aria-label="Uma trajetória construída com visão e consistência.">
                            <span className="narrative-line-mask">
                                <motion.span
                                    className="narrative-line-text"
                                    variants={{
                                        hidden: { y: '105%' },
                                        visible: { y: '0%' },
                                    }}
                                    transition={{ duration: 1.05, delay: 0.15, ease: [0.77, 0, 0.175, 1] }}
                                >
                                    Uma trajetória
                                </motion.span>
                            </span>
                            <span className="narrative-line-mask">
                                <motion.span
                                    className="narrative-line-text"
                                    variants={{
                                        hidden: { y: '105%' },
                                        visible: { y: '0%' },
                                    }}
                                    transition={{ duration: 1.05, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
                                >
                                    construída com
                                </motion.span>
                            </span>
                            <span className="narrative-line-mask">
                                <motion.span
                                    className="narrative-line-text"
                                    variants={{
                                        hidden: { y: '105%' },
                                        visible: { y: '0%' },
                                    }}
                                    transition={{ duration: 1.05, delay: 0.45, ease: [0.77, 0, 0.175, 1] }}
                                >
                                    <em className="narrative-soul">visão e consistência.</em>
                                </motion.span>
                            </span>
                        </h2>

                        <motion.span
                            className="narrative-rule"
                            variants={{
                                hidden: { scaleX: 0 },
                                visible: { scaleX: 1 },
                            }}
                            transition={{ duration: 0.9, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
                        />

                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: 16 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.8, delay: 0.55 }}
                        >
                            A CHR Empreendimentos e Construções atua no desenvolvimento
                            de projetos imobiliários guiados por engenharia, arquitetura
                            e valorização urbana.
                        </motion.p>
                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: 16 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                        >
                            Cada empreendimento nasce de planejamento rigoroso, atenção
                            aos detalhes e compromisso com valor de longo prazo.
                        </motion.p>
                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: 16 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.8, delay: 0.85 }}
                        >
                            Mais do que construir edifícios, a CHR desenvolve ativos
                            sólidos para moradores, investidores e para a cidade.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="narrative-image-wrapper"
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                    >
                        <motion.img
                            src="/about-narrative.png"
                            alt="Empreendimento CHR"
                            className="narrative-image"
                            style={{ y: narrativeImageY }}
                        />
                        <motion.div
                            className="image-floating-badge"
                            initial={{ opacity: 0, y: 24, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.9, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
                        >
                            <div className="medal-coin">
                                <div className="medal-face">
                                    <span className="medal-star medal-star-l">✦</span>
                                    <span className="medal-star medal-star-r">✦</span>
                                    <strong className="medal-number">25</strong>
                                    <span className="medal-anos">ANOS</span>
                                    <span className="medal-divider" />
                                    <span className="medal-label">Construindo<br/>valor</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Timeline */}
            <section className="about-timeline">
                <div className="timeline-aurora" aria-hidden="true" />

                <div className="container">
                    <div className="timeline-title-block">
                        <div className="timeline-eyebrow">
                            <span className="timeline-eyebrow-line" />
                            <span className="timeline-eyebrow-text">NOSSA TRAJETÓRIA</span>
                        </div>

                        <motion.h2
                            className="timeline-headline"
                            aria-label="Uma história erguida com excelência."
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <span className="timeline-line-mask">
                                <motion.span
                                    className="timeline-line-text"
                                    variants={{
                                        hidden: { y: '105%' },
                                        visible: { y: '0%' },
                                    }}
                                    transition={{ duration: 1.1, delay: 0.15, ease: [0.77, 0, 0.175, 1] }}
                                >
                                    Uma história erguida
                                </motion.span>
                            </span>
                            <span className="timeline-line-mask">
                                <motion.span
                                    className="timeline-line-text"
                                    variants={{
                                        hidden: { y: '105%' },
                                        visible: { y: '0%' },
                                    }}
                                    transition={{ duration: 1.1, delay: 0.4, ease: [0.77, 0, 0.175, 1] }}
                                >
                                    com <em className="timeline-soul">excelência.</em>
                                </motion.span>
                            </span>
                        </motion.h2>

                        <ul className="timeline-stats" aria-label="Marcos da CHR">
                            {trajectoryStats.map((stat, i) => (
                                <motion.li
                                    key={stat}
                                    className="timeline-stat"
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.6, delay: 0.6 + i * 0.08 }}
                                >
                                    {stat}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div className="timeline-wrapper" ref={timelineRef}>
                        <div className="timeline-line-track">
                            <motion.div
                                className="timeline-line-fill"
                                style={{ scaleY: lineScale, transformOrigin: 'top' }}
                            />
                        </div>

                        <div className="timeline-items">
                            {timeline.map((item, i) => (
                                <TimelineItem
                                    key={i}
                                    item={item}
                                    index={i}
                                    total={timeline.length}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="about-values">
                <div className="container">
                    <div className="values-title-block">
                        <div className="values-eyebrow">
                            <span className="values-eyebrow-line" />
                            <span className="values-eyebrow-text">NOSSOS PILARES</span>
                        </div>

                        <motion.h2
                            className="values-headline"
                            aria-label="A base da nossa excelência."
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <span className="values-line-mask">
                                <motion.span
                                    className="values-line-text"
                                    variants={{
                                        hidden: { y: '105%' },
                                        visible: { y: '0%' },
                                    }}
                                    transition={{ duration: 1.05, delay: 0.15, ease: [0.77, 0, 0.175, 1] }}
                                >
                                    A base da nossa <em className="values-soul">excelência.</em>
                                </motion.span>
                            </span>
                        </motion.h2>
                    </div>

                    <div className="values-container">
                        <motion.article
                            className="value-glass-card"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
                        >
                            <span className="value-index">01</span>
                            <div className="value-icon-circle">
                                <Target size={26} strokeWidth={1.4} />
                            </div>
                            <h3>Missão</h3>
                            <p>
                                Projetar e construir empreendimentos que unem excelência
                                técnica, valorização patrimonial e satisfação duradoura.
                            </p>
                            <span className="value-card-glow" aria-hidden="true" />
                        </motion.article>

                        <motion.article
                            className="value-glass-card"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, delay: 0.22, ease: [0.19, 1, 0.22, 1] }}
                        >
                            <span className="value-index">02</span>
                            <div className="value-icon-circle">
                                <Eye size={26} strokeWidth={1.4} />
                            </div>
                            <h3>Visão</h3>
                            <p>
                                Ser referência em desenvolvimento imobiliário de alto
                                padrão em Minas Gerais, reconhecida por inovação,
                                consistência e confiança.
                            </p>
                            <span className="value-card-glow" aria-hidden="true" />
                        </motion.article>

                        <motion.article
                            className="value-glass-card"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, delay: 0.34, ease: [0.19, 1, 0.22, 1] }}
                        >
                            <span className="value-index">03</span>
                            <div className="value-icon-circle">
                                <Shield size={26} strokeWidth={1.4} />
                            </div>
                            <h3>Valores</h3>
                            <p>
                                Ética, transparência, respeito ao cliente, rigor técnico
                                e compromisso inegociável com qualidade e prazo.
                            </p>
                            <span className="value-card-glow" aria-hidden="true" />
                        </motion.article>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section
                className="about-cta"
            >
                <div className="about-cta-glow" />
                <div className="container about-cta-inner">
                    <motion.span
                        className="gold-label"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        CHR EXPERIENCE
                    </motion.span>

                    <motion.h2
                        className="about-cta-title"
                        aria-label="Pronto para seu próximo capítulo?"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <span className="cta-line-mask">
                            <motion.span
                                className="cta-line"
                                variants={{
                                    hidden: { y: '105%' },
                                    visible: { y: '0%' },
                                }}
                                transition={{ duration: 1.1, delay: 0.15, ease: [0.77, 0, 0.175, 1] }}
                            >
                                Pronto para seu
                            </motion.span>
                        </span>
                        <span className="cta-line-mask">
                            <motion.span
                                className="cta-line"
                                variants={{
                                    hidden: { y: '105%' },
                                    visible: { y: '0%' },
                                }}
                                transition={{ duration: 1.1, delay: 0.4, ease: [0.77, 0, 0.175, 1] }}
                            >
                                <span className="cta-soul">próximo capítulo?</span>
                            </motion.span>
                        </span>
                    </motion.h2>

                    <motion.p
                        className="about-cta-sub"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.25 }}
                    >
                        Conheça nossos empreendimentos e encontre o imóvel ideal.
                    </motion.p>

                    <motion.div
                        className="about-cta-actions"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <a href="/imoveis" className="about-cta-btn about-cta-btn-primary">
                            Ver Empreendimentos
                            <ArrowRight size={18} />
                        </a>
                        <a
                            href="/contato"
                            className="about-cta-btn about-cta-btn-ghost"
                        >
                            <MessageCircle size={18} />
                            FALE CONOSCO
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
