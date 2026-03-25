import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import './BlogTeaser.css';

const blogPosts = [
    {
        id: "tendencias-luxo-2024",
        title: "Tendências do mercado imobiliário de luxo para 2024",
        excerpt: "Descubra o que há de novo em arquitetura autoral e tecnologia para residências de alto padrão.",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: "15 Mar, 2024",
        author: "CHR Editorial"
    },
    {
        id: "valorizacao-bairros-bh",
        title: "Os bairros que mais valorizam em Belo Horizonte",
        excerpt: "Análise completa sobre as regiões de Vila da Serra, Savassi e Belvedere para investidores.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: "10 Mar, 2024",
        author: "Investimento CHR"
    },
    {
        id: "tecnologia-obras-sustentaveis",
        title: "Inovação e sustentabilidade no canteiro de obras",
        excerpt: "Como a CHR utiliza as tecnologias mais recentes para garantir eficiência e respeito ao meio ambiente.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: "05 Mar, 2024",
        author: "Engenharia CHR"
    }
];

export default function BlogTeaser() {
    return (
        <section className="blog-teaser section-padding">
            <div className="container">
                <div className="section-header-row">
                    <div className="header-text">
                        <span className="section-subtitle">Insights & Notícias</span>
                        <h2 className="section-title">Conteúdo Exclusivo</h2>
                    </div>
                    <Link to="/blog" className="btn-blog-list desktop-only">
                        Ver todo o blog <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="blog-grid">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            className="blog-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link to={`/blog/${post.id}`} className="blog-card-image">
                                <img src={post.image} alt={post.title} />
                                <div className="blog-category">Lifestyle</div>
                            </Link>

                            <div className="blog-card-content">
                                <div className="blog-meta">
                                    <span className="meta-item"><Calendar size={14} /> {post.date}</span>
                                    <span className="meta-item"><User size={14} /> {post.author}</span>
                                </div>
                                <h3 className="blog-card-title">
                                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                                </h3>
                                <p className="blog-card-excerpt">{post.excerpt}</p>
                                <Link to={`/blog/${post.id}`} className="blog-card-link">
                                    LER ARTIGO COMPLETO
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="mobile-only text-center mt-4">
                    <Link to="/blog" className="btn-blog-list">
                        Ver todo o blog <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
