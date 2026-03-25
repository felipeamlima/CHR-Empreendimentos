import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

// 5 Lançamentos/Obras (como pedido, estilo Somattos)
const slides = [
    {
        id: "maranhao",
        image: "/gallery/maranhao/maranhao1.jpg",
        badge: "Em Obras",
        title: "Edifício Maranhão",
        subtitle: "Lançamento de alto luxo no coração do bairro Funcionários."
    },
    {
        id: "sion-prime",
        image: "/gallery/sion-prime/1.jpg",
        badge: "Lançamento",
        title: "Sion Prime",
        subtitle: "A sua nova perspectiva de vida no coração do Sion."
    },
    {
        id: "sao-domingos",
        image: "/gallery/sao-domingos/1.jpg",
        badge: "Em Obras",
        title: "Edifício\nE. Pinheiro",
        subtitle: "Excelente localização no São Pedro."
    },
    {
        id: "studio-aimores",
        image: "/gallery/aimores/1.jpg",
        badge: "Lançamento",
        title: "Studio\nAimorés",
        subtitle: "Design contemporâneo e praticidade no Funcionários."
    },
    {
        id: "mar-de-espanha",
        image: "/gallery/mar-de-espanha/2.jpg",
        badge: "Pronto para Morar",
        title: "Edf. M. de\nEspanha",
        subtitle: "Seu lugar ideal no bairro Santo Antônio."
    }
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    // Auto-play
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 6000); // 6 seconds per slide
        return () => clearInterval(timer);
    }, []);

    const handleNext = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    const handlePrev = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <section className="hero">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentSlide}
                    className="hero-background"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    style={{ backgroundImage: `url('${slides[currentSlide].image}')` }}
                />
            </AnimatePresence>
            <div className="hero-overlay"></div>

            <div className="hero-content container">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="hero-text-wrapper"
                    >
                        <span className="hero-badge">
                            {slides[currentSlide].badge}
                        </span>

                        <h1 className="hero-title">
                            {slides[currentSlide].title}
                        </h1>

                        <p className="hero-subtitle" style={{ maxWidth: '500px' }}>
                            {slides[currentSlide].subtitle}
                        </p>

                        <div className="hero-actions" style={{ marginTop: '2rem' }}>
                            <button
                                onClick={() => navigate(`/empreendimentos/${slides[currentSlide].id}`)}
                                className="btn btn-primary hero-cta"
                            >
                                SABER MAIS
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Status Slider (Bottom Left) e Controls (Bottom Right) */}
            <div className="hero-bottom-bar container">
                <div className="hero-progress">
                    <span className="progress-num">{(currentSlide + 1).toString().padStart(2, '0')}</span>
                    <div className="progress-track">
                        <motion.div
                            key={`progress-${currentSlide}`}
                            className="progress-fill"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 6, ease: "linear" }}
                        />
                    </div>
                    <span className="progress-num">05</span>
                </div>

                <div className="hero-scroll-wrapper">
                    <button className="hero-scroll-btn" onClick={scrollToContent}>
                        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                            <ChevronDown size={28} />
                        </motion.div>
                    </button>
                </div>

                <div className="hero-controls">
                    <button onClick={handlePrev} className="control-btn" aria-label="Anterior">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={handleNext} className="control-btn" aria-label="Próximo">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
}
