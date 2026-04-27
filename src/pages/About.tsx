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
    { year: '2001', title: 'Fundação', text: 'Nasce a CHR em Minas Gerais, com o propósito de construir com excelência.' },
    { year: '2008', title: 'Verticalização', text: 'Entregamos nosso primeiro grande empreendimento vertical.' },
    { year: '2015', title: 'Mil lares', text: 'Alcançamos a marca de 1.000 famílias atendidas.' },
    { year: '2019', title: 'Expansão', text: 'Levamos a marca CHR a novos municípios de Minas Gerais.' },
    { year: '2024', title: 'Legado consolidado', text: '2.500 famílias e mais de 40 empreendimentos entregues.' },
];

const differentials = [
    {
        icon: Building2,
        title: 'Engenharia Própria',
        text: 'Equipe técnica interna em todas as etapas da obra, garantindo controle absoluto sobre qualidade e prazos.',
    },
    {
        icon: Award,
        title: 'Arquitetura Premiada',
        text: 'Projetos assinados com foco em design e funcionalidade, reconhecidos no mercado mineiro.',
    },
    {
        icon: Clock,
        title: 'Prazo Garantido',
        text: '100% dos empreendimentos entregues no prazo contratado — um compromisso inegociável.',
    },
    {
        icon: TrendingUp,
        title: 'Valorização Real',
        text: 'Imóveis com histórico consistente de valorização acima da média do mercado.',
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
}: {
    item: (typeof timeline)[number];
    index: number;
}) {
    const side = index % 2 === 0 ? 'left' : 'right';
    return (
        <motion.div
            className={`timeline-item timeline-item-${side}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
        >
            <div className="timeline-dot" />
            <div className="timeline-card">
                <span className="timeline-year">{item.year}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-text">{item.text}</p>
            </div>
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
                        <span className="gold-label">Nossos Diferenciais</span>
                        <h2 className="luxury-title">
                            O que nos torna <span>singulares</span>
                        </h2>
                    </div>

                    <div className="differentials-grid">
                        {differentials.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.article
                                    key={i}
                                    className="differential-card"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: i * 0.08 }}
                                >
                                    <div className="differential-icon">
                                        <Icon size={48} strokeWidth={1.3} />
                                    </div>
                                    <h3 className="differential-title">{item.title}</h3>
                                    <p className="differential-text">{item.text}</p>
                                    <span className="differential-border" />
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Narrative */}
            <section className="about-narrative container">
                <div className="narrative-grid">
                    <motion.div
                        className="narrative-text-block"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="gold-label">A CONSTRUTORA</span>
                        <h2 className="luxury-title">
                            Uma trajetória construída com{' '}
                            <span>visão e consistência.</span>
                        </h2>
                        <div className="title-separator"></div>
                        <p>
                            A CHR Empreendimentos e Construções atua no desenvolvimento
                            de projetos imobiliários que unem qualidade construtiva,
                            arquitetura e valorização urbana.
                        </p>
                        <p>
                            Com presença consolidada no mercado mineiro, cada
                            empreendimento é concebido com planejamento, engenharia e
                            atenção aos detalhes, criando espaços pensados para viver
                            bem e investir com segurança.
                        </p>
                        <p>
                            Mais do que construir edifícios, a CHR desenvolve
                            empreendimentos que geram valor para moradores, investidores
                            e para a cidade.
                        </p>
                    </motion.div>

                    <motion.div
                        className="narrative-image-wrapper"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <img
                            src="/about-narrative.png"
                            alt="Interior CHR"
                            className="narrative-image"
                        />
                        <div className="image-floating-badge">
                            <div className="medal-coin">
                                <div className="medal-face">
                                    <span className="medal-star medal-star-l">✦</span>
                                    <span className="medal-star medal-star-r">✦</span>
                                    <strong className="medal-number">
                                        100<em>%</em>
                                    </strong>
                                    <span className="medal-divider" />
                                    <span className="medal-label">Prazos<br/>Cumpridos</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Timeline */}
            <section className="about-timeline">
                <div className="container">
                    <div className="timeline-title-block">
                        <span className="gold-label">Nossa jornada</span>
                        <h2 className="luxury-title">
                            Marcos de uma <span>história sólida</span>
                        </h2>
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
                                <TimelineItem key={i} item={item} index={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="about-values">
                <div className="container">
                    <div className="values-title-block">
                        <span className="gold-label">Nossos Pilares</span>
                        <h2 className="luxury-title">
                            O que nos move <span>diariamente</span>
                        </h2>
                    </div>

                    <div className="values-container">
                        <motion.div
                            className="value-glass-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="value-icon-circle">
                                <Target size={32} />
                            </div>
                            <h3>Missão</h3>
                            <p>
                                Projetar e construir com excelência técnica, garantindo
                                a satisfação absoluta e a valorização do patrimônio de
                                nossos clientes.
                            </p>
                        </motion.div>

                        <motion.div
                            className="value-glass-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="value-icon-circle">
                                <Eye size={32} />
                            </div>
                            <h3>Visão</h3>
                            <p>
                                Ser a referência definitiva em inovação e sofisticação
                                no mercado imobiliário de alto padrão em Minas Gerais.
                            </p>
                        </motion.div>

                        <motion.div
                            className="value-glass-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="value-icon-circle">
                                <Shield size={32} />
                            </div>
                            <h3>Valores</h3>
                            <p>
                                Ética, Transparência, Respeito ao Cliente e um
                                Compromisso Inegociável com Prazos e Qualidade Superior.
                            </p>
                        </motion.div>
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
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        Pronto para seu<br />
                        <span>próximo capítulo?</span>
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
