import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, BadgeCheck, ChevronLeft, ChevronRight, Pencil, X, CheckCircle2 } from 'lucide-react';
import './Testimonials.css';

// URL do Google Apps Script que recebe submissões e retorna aprovados.
const TESTIMONIALS_API_URL =
    'https://script.google.com/macros/s/AKfycbw7jJjQiIMIiwlVEcTbcQfcgEGJQoxIsdWJ8cwfv65ovL4BdYe7ztbZaVVOIyIQTNDk/exec';

const CACHE_KEY = 'chr_testimonials_cache_v1';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

type Testimonial = {
    name: string;
    role: string;
    text: string;
    year: string;
    rating: number;
};

const baseTestimonials: Testimonial[] = [
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

export default function Testimonials() {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [approved, setApproved] = useState<Testimonial[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({
        name: '',
        role: '',
        text: '',
        rating: 5,
        email: '',
    });
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const testimonials = [...baseTestimonials, ...approved];
    const averageRating = (
        testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length
    ).toFixed(1);

    // Load approved testimonials from Apps Script (with sessionStorage cache)
    useEffect(() => {
        if (!TESTIMONIALS_API_URL) return;

        const loadFromCache = (): Testimonial[] | null => {
            try {
                const raw = sessionStorage.getItem(CACHE_KEY);
                if (!raw) return null;
                const parsed = JSON.parse(raw) as { ts: number; data: Testimonial[] };
                if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
                return parsed.data;
            } catch {
                return null;
            }
        };

        const cached = loadFromCache();
        if (cached) {
            setApproved(cached);
            return;
        }

        let cancelled = false;
        fetch(TESTIMONIALS_API_URL, { method: 'GET' })
            .then((r) => r.json())
            .then((json: { testimonials?: Testimonial[] }) => {
                if (cancelled) return;
                const list = Array.isArray(json.testimonials) ? json.testimonials : [];
                setApproved(list);
                try {
                    sessionStorage.setItem(
                        CACHE_KEY,
                        JSON.stringify({ ts: Date.now(), data: list })
                    );
                } catch {
                    /* ignore quota errors */
                }
            })
            .catch(() => {
                /* fall back to base list silently */
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitStatus === 'sending') return;

        if (!TESTIMONIALS_API_URL) {
            setSubmitStatus('error');
            return;
        }

        setSubmitStatus('sending');
        try {
            await fetch(TESTIMONIALS_API_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({
                    name: form.name,
                    role: form.role,
                    text: form.text,
                    rating: form.rating,
                    email: form.email,
                }),
            });
            setSubmitStatus('success');
            setForm({ name: '', role: '', text: '', rating: 5, email: '' });
            setTimeout(() => {
                setSubmitStatus('idle');
                setModalOpen(false);
            }, 2400);
        } catch {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 4000);
        }
    };

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

                <div className="testimonials-cta">
                    <p className="testimonials-cta-text">
                        Mora ou investiu em um empreendimento CHR?
                    </p>
                    <button
                        type="button"
                        className="testimonials-cta-btn"
                        onClick={() => setModalOpen(true)}
                    >
                        <Pencil size={16} />
                        Compartilhe sua experiência
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        className="testimonial-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => submitStatus !== 'sending' && setModalOpen(false)}
                    >
                        <motion.div
                            className="testimonial-modal"
                            initial={{ opacity: 0, y: 30, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 30, scale: 0.96 }}
                            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                className="testimonial-modal-close"
                                onClick={() => setModalOpen(false)}
                                aria-label="Fechar"
                                disabled={submitStatus === 'sending'}
                            >
                                <X size={20} />
                            </button>

                            {submitStatus === 'success' ? (
                                <div className="testimonial-modal-success">
                                    <CheckCircle2 size={48} className="success-icon" />
                                    <h3>Recebido com sucesso</h3>
                                    <p>Seu depoimento foi enviado para análise. Após aprovação, ele aparecerá aqui na página.</p>
                                </div>
                            ) : (
                                <>
                                    <header className="testimonial-modal-header">
                                        <span className="gold-label">DEPOIMENTO</span>
                                        <h3>Compartilhe sua experiência</h3>
                                        <p>Conte como foi sua jornada com a CHR. Seu depoimento passa por uma curadoria antes de aparecer aqui.</p>
                                    </header>

                                    <form className="testimonial-form" onSubmit={handleSubmit}>
                                        <div className="testimonial-form-row">
                                            <label className="testimonial-form-field">
                                                <span>Nome completo</span>
                                                <input
                                                    type="text"
                                                    value={form.name}
                                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                    required
                                                    maxLength={80}
                                                    placeholder="Ex: João Pereira"
                                                />
                                            </label>
                                            <label className="testimonial-form-field">
                                                <span>Empreendimento ou perfil</span>
                                                <input
                                                    type="text"
                                                    value={form.role}
                                                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                                                    required
                                                    maxLength={80}
                                                    placeholder="Ex: Morador · Edifício CHR Itabira"
                                                />
                                            </label>
                                        </div>

                                        <label className="testimonial-form-field">
                                            <span>Email (não será exibido publicamente)</span>
                                            <input
                                                type="email"
                                                value={form.email}
                                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                placeholder="seu@email.com"
                                                maxLength={120}
                                            />
                                        </label>

                                        <div className="testimonial-form-field">
                                            <span>Avaliação</span>
                                            <div className="testimonial-rating-input">
                                                {[1, 2, 3, 4, 5].map((n) => (
                                                    <button
                                                        type="button"
                                                        key={n}
                                                        className={`star-btn ${n <= form.rating ? 'is-on' : ''}`}
                                                        onClick={() => setForm({ ...form, rating: n })}
                                                        aria-label={`${n} estrelas`}
                                                    >
                                                        <Star size={22} fill="currentColor" strokeWidth={0} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <label className="testimonial-form-field">
                                            <span>Seu depoimento</span>
                                            <textarea
                                                value={form.text}
                                                onChange={(e) => setForm({ ...form, text: e.target.value })}
                                                required
                                                rows={5}
                                                maxLength={500}
                                                placeholder="Compartilhe sua experiência com a CHR…"
                                            />
                                            <small className="char-count">{form.text.length}/500</small>
                                        </label>

                                        {submitStatus === 'error' && (
                                            <p className="testimonial-form-error">
                                                Não foi possível enviar agora. Tente novamente em alguns minutos.
                                            </p>
                                        )}

                                        <div className="testimonial-form-actions">
                                            <button
                                                type="button"
                                                className="testimonial-form-btn ghost"
                                                onClick={() => setModalOpen(false)}
                                                disabled={submitStatus === 'sending'}
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                className="testimonial-form-btn primary"
                                                disabled={submitStatus === 'sending'}
                                            >
                                                {submitStatus === 'sending' ? 'Enviando…' : 'Enviar depoimento'}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
