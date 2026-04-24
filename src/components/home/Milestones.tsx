import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Milestones.css';

const milestones = [
    {
        year: '2001',
        title: 'Fundação',
        text: 'Nasce a CHR em Minas Gerais, com o propósito de construir com excelência.',
    },
    {
        year: '2008',
        title: 'Verticalização',
        text: 'Entregamos nosso primeiro grande empreendimento vertical.',
    },
    {
        year: '2015',
        title: 'Mil lares',
        text: 'Alcançamos a marca de 1.000 famílias atendidas.',
    },
    {
        year: '2019',
        title: 'Expansão',
        text: 'Levamos a marca CHR a novos municípios de Minas Gerais.',
    },
    {
        year: '2024',
        title: 'Legado consolidado',
        text: '2.500 famílias e mais de 40 empreendimentos entregues.',
    },
];

export default function Milestones() {
    const trackRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ['start 85%', 'end 40%'],
    });
    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section className="milestones-section" id="milestones">
            <div className="container">
                <motion.div
                    className="milestones-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="milestones-label">Nossa jornada</span>
                    <h2 className="milestones-title">
                        Marcos de uma <span>história sólida</span>
                    </h2>
                </motion.div>

                <div className="milestones-timeline" ref={trackRef}>
                    <div className="milestones-line-track">
                        <motion.div
                            className="milestones-line-fill"
                            style={{ scaleX: lineScale, transformOrigin: 'left' }}
                        />
                    </div>

                    <div className="milestones-items">
                        {milestones.map((item, index) => (
                            <motion.div
                                key={index}
                                className="milestone-item"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <div className="milestone-dot" />
                                <div className="milestone-card">
                                    <span className="milestone-year">{item.year}</span>
                                    <h3 className="milestone-name">{item.title}</h3>
                                    <p className="milestone-desc">{item.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
