import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Search, ChevronDown, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchBlogPosts, type BlogPost } from '../services/blogService';
import './Blog.css';

const categories = [
    'Todos',
    'Tendências',
    'Investimento',
    'Mercado',
    'Arquitetura',
    'Engenharia CHR',
];



function BlogCard({ post, index }: { post: BlogPost; index: number }) {
    const ref = useRef<HTMLElement>(null);

    const handleMove = (e: React.MouseEvent<HTMLElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty('--card-mx', `${x}%`);
        el.style.setProperty('--card-my', `${y}%`);
    };

    return (
        <motion.article
            ref={ref}
            className="luxury-blog-card"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.8,
                delay: 0.1 + index * 0.1,
                ease: [0.19, 1, 0.22, 1],
            }}
            onMouseMove={handleMove}
        >
            <Link to={`/blog/${post.id}`} className="luxury-card-image">
                <img src={post.image} alt={post.title} loading="lazy" />
                <span className="luxury-card-mask" />
                <span className="luxury-card-category">{post.category}</span>
            </Link>

            <div className="luxury-card-content">
                <div className="luxury-card-meta">
                    <span>{post.date}</span>
                    <span className="luxury-meta-divider" />
                    <span className="luxury-meta-time">
                        <Clock size={12} strokeWidth={1.6} />
                        {post.readTime} de leitura
                    </span>
                </div>

                <h3 className="luxury-card-title">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>

                <p className="luxury-card-excerpt">{post.excerpt}</p>

                <Link to={`/blog/${post.id}`} className="luxury-card-link">
                    <span>Ler análise completa</span>
                    <ArrowUpRight size={14} className="luxury-card-link-arrow" />
                </Link>
            </div>
        </motion.article>
    );
}

export default function Blog() {
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [search, setSearch] = useState('');
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch posts from Google Sheets via Apps Script
    useEffect(() => {
        fetchBlogPosts()
            .then(setPosts)
            .catch(() => setPosts([]))
            .finally(() => setLoading(false));
    }, []);

    const featuredPost = posts.find((p) => p.featured);
    const regularPosts = posts
        .filter((p) => !p.featured)
        .filter((p) => activeCategory === 'Todos' || p.category === activeCategory)
        .filter(
            (p) =>
                !search ||
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.excerpt.toLowerCase().includes(search.toLowerCase()),
        );

    // Cinematic spotlight following the cursor (CSS vars only — no React rerenders)
    useEffect(() => {
        const handle = (e: MouseEvent) => {
            document.documentElement.style.setProperty('--blog-spot-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--blog-spot-y', `${e.clientY}px`);
        };
        window.addEventListener('mousemove', handle, { passive: true });
        return () => window.removeEventListener('mousemove', handle);
    }, []);

    return (
        <div className="blog-page">
            <div className="blog-spotlight" aria-hidden="true" />

            {/* Cinematic Header — DO NOT MODIFY */}
            <header className="blog-header">
                <div className="container">
                    <motion.div
                        className="header-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="blog-label">BLOG</span>
                        <h1 className="blog-main-title" aria-label="Perspectivas & Insights">
                            {['PERSPECTIVAS', '&', 'INSIGHTS'].map((word, i) => (
                                <span className="blog-word-wrap" key={i}>
                                    <motion.span
                                        className={`blog-word ${word === '&' ? 'gold-ampersand' : ''}`}
                                        initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                        animate={{ clipPath: 'inset(0 0% 0 0)' }}
                                        transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: [0.77, 0, 0.175, 1] }}
                                    >
                                        {word}
                                    </motion.span>
                                </span>
                            ))}
                        </h1>

                        <motion.div
                            className="blog-scroll-hint"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.6, duration: 1 }}
                            onClick={() =>
                                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
                            }
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                                }
                            }}
                        >
                            <span>ACESSE ABAIXO</span>
                            <ChevronDown size={20} strokeWidth={1.5} className="blog-scroll-arrow" />
                        </motion.div>
                    </motion.div>
                </div>
                <div className="header-spotlight"></div>
            </header>

            <main className="container blog-main">
                {/* Editorial intro */}
                <section className="blog-intro">
                    <motion.div
                        className="blog-intro-text"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                    >
                        <div className="blog-intro-eyebrow">
                            <span className="blog-intro-eyebrow-line" />
                            <span className="blog-intro-eyebrow-text">REVISTA CHR · INSIGHTS</span>
                        </div>
                        <motion.h2
                            className="blog-intro-title"
                            aria-label="Conhecimento que antecipa tendências."
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <span className="blog-intro-line-mask">
                                <motion.span
                                    className="blog-intro-line"
                                    variants={{
                                        hidden: { y: '105%' },
                                        visible: { y: '0%' },
                                    }}
                                    transition={{ duration: 1.1, delay: 0.15, ease: [0.77, 0, 0.175, 1] }}
                                >
                                    Conhecimento que <em className="blog-intro-soul">antecipa</em> tendências.
                                </motion.span>
                            </span>
                        </motion.h2>
                        <p className="blog-intro-lede">
                            Análises sobre arquitetura, bairros estratégicos, investimento
                            imobiliário e tendências de alto padrão em Belo Horizonte.
                        </p>
                    </motion.div>
                </section>

                {/* Featured Insight pull-quote */}
                <motion.aside
                    className="blog-insight"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                >
                    <div className="blog-insight-meta">
                        <span className="blog-insight-pulse" aria-hidden="true">
                            <span className="blog-insight-pulse-dot" />
                        </span>
                        <span className="blog-insight-label">Último insight</span>
                        <span className="blog-insight-divider" />
                        <span className="blog-insight-stamp">Análise de mercado · 2026</span>
                    </div>

                    <blockquote className="blog-insight-quote">
                        Funcionários, Sion e São Pedro seguem entre os bairros mais desejados
                        de Belo Horizonte em 2026 — sustentando valorização consistente acima
                        da média do mercado.
                    </blockquote>

                    <div className="blog-insight-foot">
                        <span className="blog-insight-source">CHR Editorial</span>
                        <Link to="/blog/valorizacao-bairros-bh" className="blog-insight-link">
                            <span>Ler análise completa</span>
                            <ArrowUpRight size={14} />
                        </Link>
                    </div>
                </motion.aside>

                {/* Featured post — editorial showcase */}
                {featuredPost && (
                    <section className="featured-article-section">
                        <motion.article
                            className="featured-post-card"
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                        >
                            <Link to={`/blog/${featuredPost.id}`} className="featured-image">
                                <img src={featuredPost.image} alt={featuredPost.title} />
                                <span className="featured-mask" />
                                <span className="featured-badge">DESTAQUE EDITORIAL</span>
                            </Link>
                            <div className="featured-content">
                                <span className="featured-category">{featuredPost.category}</span>
                                <h2 className="featured-title">
                                    <Link to={`/blog/${featuredPost.id}`}>{featuredPost.title}</Link>
                                </h2>
                                <p className="featured-excerpt">{featuredPost.excerpt}</p>
                                <div className="featured-meta">
                                    <span>{featuredPost.date}</span>
                                    <span className="featured-meta-divider" />
                                    <span className="featured-meta-time">
                                        <Clock size={12} strokeWidth={1.6} />
                                        {featuredPost.readTime} de leitura
                                    </span>
                                </div>
                                <Link to={`/blog/${featuredPost.id}`} className="btn-featured">
                                    <span>Ler análise completa</span>
                                    <ArrowUpRight size={16} />
                                </Link>
                            </div>
                        </motion.article>
                    </section>
                )}

                {/* Filter & Search Bar */}
                <div className="blog-controls">
                    <div className="categories-filter" role="tablist" aria-label="Filtrar artigos">
                        {categories.map((cat) => {
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    className={`cat-btn ${isActive ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    <span className="cat-btn-label">{cat}</span>
                                </button>
                            );
                        })}
                        {/* Spacer to guarantee padding is not ignored by browser scroll engines */}
                        <div style={{ minWidth: '0.5rem', flexShrink: 0 }} aria-hidden="true" />
                    </div>
                    <div className="blog-search">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Buscar artigo..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Articles Grid */}
                <section className="articles-section">
                    {regularPosts.length === 0 ? (
                        <p className="blog-empty">
                            Nenhum artigo encontrado para esse filtro.
                        </p>
                    ) : (
                        <div className="blog-luxury-grid">
                            {regularPosts.map((post, index) => (
                                <BlogCard key={post.id} post={post} index={index} />
                            ))}
                        </div>
                    )}
                </section>
            </main>

            {/* Newsletter CTA */}
            <section className="blog-newsletter">
                <div className="container">
                    <div className="newsletter-box">
                        <h2>
                            Fique sempre <span>à frente</span> do mercado.
                        </h2>
                        <p>
                            Assine nossa curadoria e receba insights exclusivos diretamente
                            no seu e-mail.
                        </p>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Seu melhor e-mail" required />
                            <button type="submit">
                                <span>Inscrever-se</span>
                                <ArrowUpRight size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
