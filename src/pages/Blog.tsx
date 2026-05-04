import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Search, ChevronDown, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Blog.css';

const categories = [
    'Todos',
    'Tendências',
    'Investimento',
    'Mercado',
    'Arquitetura',
    'Engenharia CHR',
];

type BlogPost = {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    readTime: string;
    featured?: boolean;
};

const mockPosts: BlogPost[] = [
    {
        id: 'tendencias-luxo-2024',
        title: 'Tendências da arquitetura premium para os próximos anos',
        excerpt:
            'Materiais nobres, biofilia e design integrado: o que define o alto padrão na próxima década e por que isso impacta diretamente o valor do seu imóvel.',
        image:
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1100&q=70',
        category: 'Tendências',
        date: '15 Mar · 2026',
        readTime: '8 min',
        featured: true,
    },
    {
        id: 'valorizacao-bairros-bh',
        title: 'Os bairros que mais valorizam em Belo Horizonte em 2026',
        excerpt:
            'Análise completa das regiões com maior potencial de valorização — Vila da Serra, Sion, Funcionários e Belvedere — e o que sustenta sua liquidez.',
        image:
            'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=70',
        category: 'Investimento',
        date: '02 Mar · 2026',
        readTime: '10 min',
    },
    {
        id: 'identificar-imovel-valorizacao',
        title: 'Como identificar um imóvel com alto potencial de valorização',
        excerpt:
            'Os indicadores que profissionais do setor avaliam antes de adquirir um ativo imobiliário — localização, projeto, construtora e contexto urbano.',
        image:
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=70',
        category: 'Mercado',
        date: '24 Fev · 2026',
        readTime: '7 min',
    },
    {
        id: 'tecnologia-obras-sustentaveis',
        title: 'Como a CHR pensa engenharia e valor de longo prazo',
        excerpt:
            'Os processos construtivos e decisões técnicas por trás de empreendimentos que mantêm valorização décadas após a entrega.',
        image:
            'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=70',
        category: 'Engenharia CHR',
        date: '12 Fev · 2026',
        readTime: '6 min',
    },
    {
        id: 'localizacao-ativo-imobiliario',
        title: 'Por que localização continua sendo o maior ativo imobiliário',
        excerpt:
            'Mesmo com tendências mudando, dados do mercado mineiro mostram que a escolha do endereço ainda é o fator mais determinante de retorno.',
        image:
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=70',
        category: 'Investimento',
        date: '03 Fev · 2026',
        readTime: '9 min',
    },
    {
        id: 'integracao-areas-sociais',
        title: 'Como integrar áreas sociais em apartamentos de alto padrão',
        excerpt:
            'Plantas livres, transição visual e mobiliário arquitetônico: o vocabulário do morar contemporâneo de luxo segundo nossos parceiros de design.',
        image:
            'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=70',
        category: 'Arquitetura',
        date: '20 Jan · 2026',
        readTime: '5 min',
    },
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

    const featuredPost = mockPosts.find((p) => p.featured);
    const regularPosts = mockPosts
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
