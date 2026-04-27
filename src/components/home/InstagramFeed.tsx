import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import './InstagramFeed.css';

// Lightweight Unsplash thumbnails (≈30KB each) — much smaller than full-size files
const IMG_PARAMS = '?auto=format&fit=crop&w=420&q=60';

const feedImages = [
    `https://images.unsplash.com/photo-1600607687920-4e2a09cf159d${IMG_PARAMS}`,
    `https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b${IMG_PARAMS}`,
    `https://images.unsplash.com/photo-1600585154340-be6161a56a0c${IMG_PARAMS}`,
    `https://images.unsplash.com/photo-1600573472591-ee6b68d14c68${IMG_PARAMS}`,
    `https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde${IMG_PARAMS}`,
    `https://images.unsplash.com/photo-1600210492486-724fe5c67fb0${IMG_PARAMS}`,
];

// Duplicate once for seamless infinite loop (translate -50%)
const rowTop = [...feedImages, ...feedImages];
const rowBottom = [...feedImages.slice().reverse(), ...feedImages.slice().reverse()];

export default function InstagramFeed() {
    return (
        <section className="insta-section">
            <div className="insta-marquee" aria-hidden="true">
                <div className="insta-row insta-row-left">
                    {rowTop.map((img, idx) => (
                        <div key={`t-${idx}`} className="insta-item">
                            <img src={img} alt="" loading="lazy" decoding="async" />
                        </div>
                    ))}
                </div>
                <div className="insta-row insta-row-right">
                    {rowBottom.map((img, idx) => (
                        <div key={`b-${idx}`} className="insta-item">
                            <img src={img} alt="" loading="lazy" decoding="async" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="insta-overlay">
                <motion.div
                    className="insta-content"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="insta-header">
                        <Instagram size={20} className="insta-icon" />
                        <span className="insta-label">INSTAGRAM</span>
                    </div>
                    <h2 className="insta-title">Siga, curta & compartilhe</h2>
                    <a
                        href="https://instagram.com/chr_empreendimentos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="insta-handle"
                    >
                        @chr_empreendimentos
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
