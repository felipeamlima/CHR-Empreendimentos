import { motion } from 'framer-motion';
import { ArrowRight, Search, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Blog.css';

const categories = ["Todos", "Arquitetura", "Mercado", "Inovação", "Decoração", "Lifestyle"];

const mockPosts = [
    {
        id: "tendencias-luxo-2024",
        title: "Tendências de arquitetura para apartamentos de alto padrão em 2024",
        excerpt: "Descubra o que há de mais moderno em design de interiores e materiais que valorizam o seu imóvel através da biofilia e tecnologia invisível.",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3",
        category: "Arquitetura",
        date: "15 Mai 2024",
        featured: true
    },
    {
        id: "valorizacao-bairros-bh",
        title: "Por que investir no bairro Sion é uma das melhores escolhas de BH",
        excerpt: "Uma análise completa sobre a valorização imobiliária, infraestrutura e qualidade de vida na região centro-sul da capital mineira.",
        image: "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3",
        category: "Mercado",
        date: "02 Mai 2024"
    },
    {
        id: "tecnologia-obras-sustentaveis",
        title: "Como funcionam os condomínios inteligentes?",
        excerpt: "Tecnologia, segurança e sustentabilidade. Entenda como as inovações da CHR transformam a gestão e o conforto do seu novo prédio.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3",
        category: "Inovação",
        date: "20 Abr 2024"
    },
    {
        id: "decoracao-integracao-areas",
        title: "Dicas de decoração para ampliar a integração das áreas sociais",
        excerpt: "Aprenda truques essenciais com nossos parceiros arquitetos para aproveitar ao máximo a planta livre dos nossos empreendimentos.",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3",
        category: "Decoração",
        date: "10 Abr 2024"
    }
];

export default function Blog() {
    const featuredPost = mockPosts.find(p => p.featured);
    const regularPosts = mockPosts.filter(p => !p.featured);

    return (
        <div className="blog-page">
            {/* Cinematic Header with Spotlight */}
            <header className="blog-header">
                <div className="container">
                    <motion.div
                        className="header-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="blog-label">BLOG</span>
                        <h1 className="blog-main-title">Perspectivas <span>&</span> Insights</h1>
                        <p className="blog-main-subtitle">A curadoria definitiva sobre o morar contemporâneo e o mercado de alto padrão.</p>
                    </motion.div>
                </div>
                <div className="header-spotlight"></div>
            </header>

            <main className="container">
                {/* Featured Post - Editorial Style */}
                {featuredPost && (
                    <section className="featured-article-section">
                        <motion.div
                            className="featured-post-card"
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="featured-image">
                                <img src={featuredPost.image} alt={featuredPost.title} />
                                <div className="featured-badge">DESTAQUE</div>
                            </div>
                            <div className="featured-content">
                                <span className="post-category">{featuredPost.category}</span>
                                <h2 className="featured-title">
                                    <Link to={`/blog/${featuredPost.id}`}>{featuredPost.title}</Link>
                                </h2>
                                <p className="featured-excerpt">{featuredPost.excerpt}</p>
                                <div className="post-meta">
                                    <span>{featuredPost.date}</span>
                                </div>
                                <Link to={`/blog/${featuredPost.id}`} className="btn-featured">
                                    LER ARTIGO COMPLETO <ArrowRight size={18} />
                                </Link>
                            </div>
                        </motion.div>
                    </section>
                )}

                {/* Filter & Search Bar */}
                <div className="blog-controls">
                    <div className="categories-filter">
                        {categories.map(cat => (
                            <button key={cat} className={`cat-btn ${cat === 'Todos' ? 'active' : ''}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="blog-search">
                        <Search size={18} />
                        <input type="text" placeholder="Buscar artigo..." />
                    </div>
                </div>

                {/* Articles Grid */}
                <section className="articles-section">
                    <div className="blog-luxury-grid">
                        {regularPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                className="luxury-blog-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link to={`/blog/${post.id}`} className="luxury-card-image">
                                    <img src={post.image} alt={post.title} />
                                    <div className="card-hover-overlay">
                                        <span>LER ARTIGO</span>
                                    </div>
                                </Link>
                                <div className="luxury-card-content">
                                    <div className="card-meta">
                                        <Hash size={12} /> {post.category}
                                    </div>
                                    <h3 className="luxury-card-title">
                                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                                    </h3>
                                    <p className="luxury-card-excerpt">{post.excerpt}</p>
                                    <div className="luxury-card-footer">
                                        <span className="post-date">{post.date}</span>
                                        <Link to={`/blog/${post.id}`} className="read-more-link">
                                            Luz própria <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </section>
            </main>

            {/* Newsletter CTA */}
            <section className="blog-newsletter">
                <div className="container">
                    <div className="newsletter-box">
                        <h2>Fique sempre <span>à frente</span> do mercado.</h2>
                        <p>Assine nossa curadoria e receba insights exclusivos diretamente no seu e-mail.</p>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Seu melhor e-mail" required />
                            <button type="submit">INSCREVER-SE</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
