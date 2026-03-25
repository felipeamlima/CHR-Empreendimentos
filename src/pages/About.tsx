import { motion } from 'framer-motion';
import { Target, Eye, Shield } from 'lucide-react';
import './About.css';

const stats = [
    { number: "25+", label: "Anos de História" },
    { number: "40+", label: "Empreendimentos" },
    { number: "2500+", label: "Famílias Felizes" },
    { number: "150k+", label: "m² Construídos" }
];

export default function About() {
    return (
        <div className="about-page">
            {/* Cinematic Hero */}
            <section className="about-hero">
                <div className="about-hero-bg">
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3"
                        alt="Arquitetura CHR"
                        className="about-hero-image"
                    />
                    <div className="about-hero-overlay"></div>
                </div>

                <div className="container about-hero-content">
                    <motion.span
                        className="about-hero-label"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Desde 2001
                    </motion.span>
                    <motion.h1
                        className="about-hero-title"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        CONSTRUINDO O <span>LEGADO</span> DE MINAS.
                    </motion.h1>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="about-stats">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="stat-item"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <span className="stat-number">{stat.number}</span>
                                <span className="stat-label">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Narrative - Split Layout */}
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
                        <h2 className="luxury-title">Uma trajetória construída com <span>visão e consistência.</span></h2>
                        <div className="title-separator"></div>
                        <p>
                            A CHR Empreendimentos e Construções atua no desenvolvimento de projetos imobiliários que unem qualidade construtiva, arquitetura e valorização urbana.
                        </p>
                        <p>
                            Com presença consolidada no mercado mineiro, cada empreendimento é concebido com planejamento, engenharia e atenção aos detalhes, criando espaços pensados para viver bem e investir com segurança.
                        </p>
                        <p>
                            Mais do que construir edifícios, a CHR desenvolve empreendimentos que geram valor para moradores, investidores e para a cidade.
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
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3"
                            alt="Interior CHR"
                            className="narrative-image"
                        />
                        <div className="image-floating-badge">
                            <strong>100%</strong>
                            <span>Prazos Cumpridos</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values - Glassmorphism */}
            <section className="about-values">
                <div className="container">
                    <div className="values-title-block">
                        <span className="gold-label">Nossos Pilares</span>
                        <h2 className="luxury-title">O que nos move <span>diariamente</span></h2>
                    </div>

                    <div className="values-container">
                        <motion.div className="value-glass-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <div className="value-icon-circle"><Target size={32} /></div>
                            <h3>Missão</h3>
                            <p>Projetar e construir com excelência técnica, garantindo a satisfação absoluta e a valorização do patrimônio de nossos clientes.</p>
                        </motion.div>

                        <motion.div className="value-glass-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                            <div className="value-icon-circle"><Eye size={32} /></div>
                            <h3>Visão</h3>
                            <p>Ser a referência definitiva em inovação e sofisticação no mercado imobiliário de alto padrão em Minas Gerais.</p>
                        </motion.div>

                        <motion.div className="value-glass-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            <div className="value-icon-circle"><Shield size={32} /></div>
                            <h3>Valores</h3>
                            <p>Ética, Transparência, Respeito ao Cliente e um Compromisso Inegociável com Prazos e Qualidade Superior.</p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
