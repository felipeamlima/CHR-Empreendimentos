import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, BadgeCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import './Testimonials.css';

type Testimonial = {
    name: string;
    role: string;
    text: string;
    year: string;
    rating: number;
};

const testimonials: Testimonial[] = [
    {
        name: 'Ricardo e Helena Almeida',
        role: 'Moradores · Edifício CHR Mem de Sá',
        text: 'A qualidade do acabamento nos surpreendeu. Desde a compra até a entrega das chaves, o atendimento da CHR foi impecável. Hoje moramos no apartamento dos nossos sonhos.',
        year: '2023',
        rating: 5,
    },
    {
        name: 'Fernando Costa',
        role: 'Investidor · 4 unidades',
        text: 'Invisto em imóveis da CHR há mais de 10 anos. A valorização na entrega e a liquidez dos apartamentos provam que a visão de mercado e a localização da construtora são incomparáveis.',
        year: '2024',
        rating: 5,
    },
    {
        name: 'Ana Paula Silva',
        role: 'Moradora · Edifício CHR Getúlio Vargas',
        text: 'Tudo reflete bom gosto e sofisticação. A área de lazer é um verdadeiro clube particular, e a segurança que o projeto nos proporciona não tem preço.',
        year: '2023',
        rating: 5,
    },
    {
        name: 'Mariana e Lucas Mendonça',
        role: 'Moradores · Edifício CHR Itabira',
        text: 'Procurávamos um imóvel que unisse arquitetura, conforto e localização — e encontramos tudo na CHR. A entrega foi pontual e os detalhes do projeto superaram expectativas.',
        year: '2024',
        rating: 5,
    },
    {
        name: 'Cláudia Rezende',
        role: 'Moradora · Edifício Dona Cleonice',
        text: 'Tive o prazer de acompanhar a obra de perto. A transparência e o cuidado com cada etapa do empreendimento mostram o porquê da CHR ser referência em Belo Horizonte.',
        year: '2022',
        rating: 5,
    },
    {
        name: 'Roberto Andrade',
        role: 'Investidor · Portfólio histórico',
        text: 'Acompanho o mercado mineiro há duas décadas. Os empreendimentos da CHR mantêm um padrão construtivo e de valorização que poucas construtoras alcançam consistentemente.',
        year: '2024',
        rating: 5,
    },
];

const initialsOf = (name: string) =>
    name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');

const averageRating = (
    testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length
).toFixed(1);

export default function Testimonials() {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollToCard = (index: number) => {
        const scroller = scrollerRef.current;
        if (!scroller) return;
        const card = scroller.children[index] as HTMLElement | undefined;
        if (!card) return;
        scroller.scrollTo({ left: card.offsetLeft - scroller.offsetLeft, behavior: 'smooth' });
    };

    const handleNav = (delta: number) => {
        const next = (activeIndex + delta + testimonials.length) % testimonials.length;
        setActiveIndex(next);
        scrollToCard(next);
    };

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        let raf = 0;
        const handleScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const cards = Array.from(scroller.children) as HTMLElement[];
                const center = scroller.scrollLeft + scroller.clientWidth / 2;
                let closest = 0;
                let minDelta = Infinity;
                cards.forEach((card, idx) => {
                    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                    const delta = Math.abs(cardCenter - center);
                    if (delta < minDelta) {
                        minDelta = delta;
                        closest = idx;
                    }
                });
                setActiveIndex(closest);
            });
        };

        scroller.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            scroller.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <section className="testimonials section-padding">
            <div className="container">
                <div className="testimonials-header text-center">
                    <span className="gold-label">RECONHECIMENTO</span>
                    <h2 className="luxury-title">
                        Depoimentos dos <span>nossos clientes.</span>
                    </h2>

                    <div className="testimonials-stats">
                        <div className="stat-pill">
                            <div className="stat-stars">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                                ))}
                            </div>
                            <span className="stat-value">{averageRating}</span>
                            <span className="stat-divider" />
                            <span className="stat-meta">Avaliação média</span>
                        </div>
                        <div className="stat-pill">
                            <span className="stat-value">+2.500</span>
                            <span className="stat-divider" />
                            <span className="stat-meta">Famílias atendidas</span>
                        </div>
                        <div className="stat-pill">
                            <BadgeCheck size={16} className="stat-check" />
                            <span className="stat-meta">Depoimentos verificados</span>
                        </div>
                    </div>
                </div>

                <div className="testimonials-stage">
                    <button
                        type="button"
                        className="testimonial-nav testimonial-nav-prev"
                        aria-label="Depoimento anterior"
                        onClick={() => handleNav(-1)}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className="testimonials-grid" ref={scrollerRef}>
                        {testimonials.map((item, index) => (
                            <motion.article
                                key={index}
                                className="testimonial-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
                            >
                                <header className="testimonial-card-top">
                                    <div className="testimonial-rating" aria-label={`${item.rating} estrelas`}>
                                        {[...Array(item.rating)].map((_, i) => (
                                            <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                                        ))}
                                    </div>
                                    <span className="testimonial-year">{item.year}</span>
                                </header>

                                <Quote size={36} className="quote-icon" />

                                <p className="testimonial-text">{item.text}</p>

                                <footer className="testimonial-author">
                                    <div className="author-avatar" aria-hidden="true">
                                        {initialsOf(item.name)}
                                    </div>
                                    <div className="author-info">
                                        <h4>
                                            {item.name}
                                            <BadgeCheck size={14} className="author-verified" />
                                        </h4>
                                        <span>{item.role}</span>
                                    </div>
                                </footer>
                            </motion.article>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="testimonial-nav testimonial-nav-next"
                        aria-label="Próximo depoimento"
                        onClick={() => handleNav(1)}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                <div className="testimonial-dots" role="tablist" aria-label="Navegação de depoimentos">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`testimonial-dot ${activeIndex === index ? 'is-active' : ''}`}
                            onClick={() => {
                                setActiveIndex(index);
                                scrollToCard(index);
                            }}
                            aria-label={`Ir para depoimento ${index + 1}`}
                            aria-selected={activeIndex === index}
                            role="tab"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
