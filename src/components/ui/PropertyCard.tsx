import { MapPin, ArrowRight, Square, BedDouble, Car } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './PropertyCard.css';

export interface PropertyProps {
    id: string;
    title: string;
    location: string;
    image: string;
    status: 'Lançamento' | 'Em Obras' | 'Pronto para Morar' | 'Concluído';
    specs: {
        area: string;
        beds: string;
        parking: string;
    };
}

const statusColors = {
    'Lançamento': 'status-launch',
    'Em Obras': 'status-construction',
    'Pronto para Morar': 'status-ready',
    'Concluído': 'status-completed'
};

export default function PropertyCard({
    id,
    title,
    location,
    image,
    status,
    specs
}: PropertyProps) {
    return (
        <motion.div
            className="chr-portfolio-card"
            whileHover="hover"
            initial="initial"
        >
            <Link to={`/empreendimentos/${id}`} className="card-outer-link">
                <div className="card-visual">
                    <motion.img
                        src={image}
                        alt={title}
                        className="card-main-image"
                        variants={{
                            hover: { scale: 1.1 }
                        }}
                        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                    />
                    <div className="card-image-overlay"></div>

                    {/* Floating Status Badge */}
                    <div className={`status-tag ${statusColors[status]}`}>
                        <div className="tag-dot"></div>
                        <span>{status}</span>
                    </div>

                    {/* Architectural Reveal Info */}
                    <motion.div
                        className="card-reveal-content"
                        variants={{
                            initial: { opacity: 0, y: 30 },
                            hover: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                    >
                        <div className="reveal-specs">
                            <div className="rev-spec">
                                <Square size={16} />
                                <span>{specs.area}</span>
                            </div>
                            <div className="rev-spec">
                                <BedDouble size={16} />
                                <span>{specs.beds}</span>
                            </div>
                            <div className="rev-spec">
                                <Car size={16} />
                                <span>{specs.parking}</span>
                            </div>
                        </div>
                        <div className="reveal-cta">
                            CONHECER DETALHES <ArrowRight size={18} />
                        </div>
                    </motion.div>
                </div>

                <div className="card-static-info">
                    <div className="card-title-row">
                        <h3 className="card-title-text">{title}</h3>
                        <div className="card-title-line"></div>
                    </div>
                    <div className="card-loc">
                        <MapPin size={12} />
                        <span>{location}</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
