import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './BlogTeaser.css';

type BlogPost = {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    readTime: string;
    category: string;
    accent?: 'mercado' | 'investimento' | 'engenharia' | 'arquitetura';
};

const blogPosts: BlogPost[] = [
    {
        id: 'valorizacao-bairros-bh-2026',
        title: 'Funcionários, Sion, Lourdes: o que os dados revelam sobre a nova geografia de valor em BH',
        excerpt:
            'Os dados por trás dos bairros mais disputados de BH: por que Funcionários, Sion e Lourdes continuam no topo da valorização.',
        image:
            'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1100&q=70',
        date: '05 Mai · 2026',
        readTime: '14 min',
        category: 'Investimento',
        accent: 'investimento',
    },
    {
        id: 'engenharia-invisivel-detalhes',
        title: 'A engenharia invisível: os detalhes construtivos que o cliente não vê, mas sente ao longo dos anos',
        excerpt:
            'As decisões técnicas tomadas no canteiro de obras definem o valor patrimonial de um imóvel décadas após a entrega.',
        image:
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1100&q=70',
        date: '12 Mai · 2026',
        readTime: '12 min',
        category: 'Engenharia CHR',
        accent: 'engenharia',
    },
    {
        id: 'obra-por-administracao-modelo',
        title: 'Obra por administração: o modelo que alinha transparência, qualidade e inteligência financeira',
        excerpt:
            'O modelo de obra por administração oferece transparência total e controle de custos ao comprador.',
        image:
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1100&q=70',
        date: '28 Abr · 2026',
        readTime: '11 min',
        category: 'Mercado',
        accent: 'mercado',
    },
];

export default function BlogTeaser() {
    return (
        <section className="blog-teaser">
            <div className="bt-aurora" aria-hidden="true" />

            <div className="container">
                {/* HEADER */}
                <header className="bt-header">
                    <motion.div
                        className="bt-header-text"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                    >
                        <div className="bt-eyebrow">
                            <span className="bt-eyebrow-line" />
                            <span className="bt-eyebrow-text">REVISTA CHR · INSIGHTS</span>
                        </div>

                        <h2 className="bt-title">
                            <span className="bt-line-mask">
                                <motion.span
                                    className="bt-line"
                                    initial={{ y: '105%' }}
                                    animate={{ y: '0%' }}
                                    transition={{
                                        duration: 1.1,
                                        delay: 0.15,
                                        ease: [0.77, 0, 0.175, 1],
                                    }}
                                >
                                    Conhecimento
                                </motion.span>
                            </span>
                            <span className="bt-line-mask">
                                <motion.span
                                    className="bt-line"
                                    initial={{ y: '105%' }}
                                    animate={{ y: '0%' }}
                                    transition={{
                                        duration: 1.1,
                                        delay: 0.4,
                                        ease: [0.77, 0, 0.175, 1],
                                    }}
                                >
                                    que <em className="bt-soul">antecipa</em> tendências.
                                </motion.span>
                            </span>
                        </h2>

                        <p className="bt-lede">
                            Análises sobre arquitetura, bairros estratégicos, investimento
                            imobiliário e tendências de alto padrão em Belo Horizonte.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                    >
                        <Link to="/blog" className="bt-cta-top">
                            <span>Explorar conteúdos</span>
                            <ArrowUpRight size={16} className="bt-cta-arrow" />
                        </Link>
                    </motion.div>
                </header>

                {/* FEATURED INSIGHT — credibility marker */}
                <motion.aside
                    className="bt-insight"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                >
                    <div className="bt-insight-meta">
                        <span className="bt-insight-pulse" aria-hidden="true">
                            <span className="bt-insight-pulse-dot" />
                        </span>
                        <span className="bt-insight-label">Último insight</span>
                        <span className="bt-insight-divider" />
                        <span className="bt-insight-stamp">Análise de mercado · 2026</span>
                    </div>

                    <blockquote className="bt-insight-quote">
                        Funcionários, Sion e São Pedro seguem entre os bairros mais desejados
                        de Belo Horizonte em 2026 — sustentando valorização consistente acima
                        da média do mercado.
                    </blockquote>

                    <div className="bt-insight-foot">
                        <span className="bt-insight-source">CHR Editorial</span>
                        <Link to="/blog/valorizacao-bairros-bh-2026" className="bt-insight-link">
                            <span>Ler análise completa</span>
                            <ArrowUpRight size={14} />
                        </Link>
                    </div>
                </motion.aside>

                {/* GRID */}
                <div className="blog-grid">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            className={`blog-card blog-card-${post.accent ?? 'default'}`}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.15 + index * 0.12,
                                ease: [0.19, 1, 0.22, 1],
                            }}
                        >
                            <Link to={`/blog/${post.id}`} className="blog-card-image">
                                <img src={post.image} alt={post.title} loading="lazy" />
                                <div className="blog-card-image-mask" />
                                <span className="blog-category">{post.category}</span>
                            </Link>

                            <div className="blog-card-content">
                                <div className="blog-meta">
                                    <span className="meta-item">{post.date}</span>
                                    <span className="meta-divider" />
                                    <span className="meta-item meta-item-time">
                                        <Clock size={12} strokeWidth={1.6} />
                                        {post.readTime} de leitura
                                    </span>
                                </div>

                                <h3 className="blog-card-title">
                                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                                </h3>

                                <p className="blog-card-excerpt">{post.excerpt}</p>

                                <Link to={`/blog/${post.id}`} className="blog-card-link">
                                    <span>Ler análise completa</span>
                                    <ArrowUpRight size={14} className="blog-card-link-arrow" />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <motion.div
                    className="bt-footer-cta"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <Link to="/blog" className="bt-footer-cta-btn">
                        <span>Acessar todos os artigos</span>
                        <ArrowUpRight size={18} className="bt-footer-cta-arrow" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
