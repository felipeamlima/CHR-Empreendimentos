import { motion } from 'framer-motion';
import { Building2, MapPin, ShieldCheck, Gem } from 'lucide-react';
import './Manifesto.css';

const differentials = [
    {
        icon: <Building2 size={32} />,
        title: "Qualidade Construtiva",
        description: "Acabamentos de alto padrão e engenharia de ponta em todos os detalhes."
    },
    {
        icon: <MapPin size={32} />,
        title: "Localização Privilegiada",
        description: "Terrenos nas áreas mais nobres e valorizadas de Belo Horizonte."
    },
    {
        icon: <Gem size={32} />,
        title: "Inovação em Projetos",
        description: "Plantas inteligentes e áreas comuns que antecipam tendências."
    },
    {
        icon: <ShieldCheck size={32} />,
        title: "Segurança para Investir",
        description: "Solidez de quem já entregou dezenas de empreendimentos no prazo."
    }
];

export default function Manifesto() {
    return (
        <section className="manifesto section-padding">
            <div className="container">
                <div className="manifesto-grid">
                    <motion.div
                        className="manifesto-content"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="section-subtitle">A CHR Construtora</span>
                        <h2 className="section-title">Mais de 20 anos construindo futuros</h2>
                        <p>
                            Tudo começou em 2001, com um propósito claro: elevar o padrão do mercado imobiliário em Belo Horizonte. Desde o nosso primeiro projeto, a CHR Empreendimentos e Construções tem sido sinônimo de inovação, pontualidade e respeito absoluto pelo cliente.
                        </p>
                        <p>
                            Não construímos apenas metros quadrados. Projetamos espaços onde a vida acontece, onde o design encontra a funcionalidade, e onde cada detalhe é pensado para proporcionar uma experiência de moradia incomparável.
                        </p>
                        <button className="btn btn-outline mt-4">Conheça nossa história</button>
                    </motion.div>

                    <div className="manifesto-differentials">
                        {differentials.map((item, index) => (
                            <motion.div
                                key={index}
                                className="differential-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="differential-icon">
                                    {item.icon}
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
