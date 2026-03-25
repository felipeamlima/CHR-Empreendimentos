import { motion } from 'framer-motion';
import { ArrowRight, Building2, MapPin, Gem, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Heritage.css';

const differentials = [
    {
        icon: <Building2 size={24} />,
        title: "Engenharia de Ponta",
        description: "Mais de 20 anos de inovação e rigor técnico em cada detalhe."
    },
    {
        icon: <MapPin size={24} />,
        title: "Localização",
        description: "Terrenos nas áreas mais nobres e valorizadas de Belo Horizonte."
    },
    {
        icon: <Gem size={24} />,
        title: "Design Autoral",
        description: "Plantas inteligentes que unem estética e funcionalidade total."
    },
    {
        icon: <ShieldCheck size={24} />,
        title: "Solidez CHR",
        description: "Segurança de quem entrega excelência rigorosamente no prazo."
    }
];

export default function Heritage() {
    return (
        <section className="heritage-section">
            <div className="heritage-video-bg">
                <video autoPlay muted loop playsInline className="heritage-video">
                    <source src="https://player.vimeo.com/external/517047341.hd.mp4?s=d063715104618e05ccae15a3196c8d19799ae929" type="video/mp4" />
                </video>
                <div className="heritage-overlay"></div>
            </div>

            <div className="container heritage-content">
                <div className="heritage-main-grid">
                    <motion.div
                        className="heritage-left"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <span className="heritage-label">CONSTRUTORA CHR</span>
                        <h2 className="heritage-title">
                            Projetamos o <span>futuro</span>,<br />
                            edificamos o <span>legado</span>.
                        </h2>
                        <p className="heritage-desc">
                            Há duas décadas, transformamos o horizonte de Belo Horizonte com projetos que unem arquitetura autoral, tecnologia e um compromisso inabalável com a excelência.
                        </p>

                        <Link to="/sobre" className="heritage-btn">
                            CONHEÇA NOSSA HISTÓRIA
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>

                    <div className="heritage-right">
                        <div className="differentials-grid">
                            {differentials.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="diff-item"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <div className="diff-icon-wrapper">
                                        {item.icon}
                                    </div>
                                    <div className="diff-text">
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
