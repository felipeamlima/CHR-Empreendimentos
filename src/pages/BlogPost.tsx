import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Clock, Tag } from 'lucide-react';
import { marked } from 'marked';
import { fetchBlogPost, fetchBlogPosts, type BlogPost } from '../services/blogService';
import './BlogPost.css';

// Configure marked for clean output
marked.setOptions({
    breaks: true,
    gfm: true,
});

export default function BlogPostPage() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!id) return;

        setLoading(true);
        
        // Fetch the specific post and related posts in parallel
        Promise.all([
            fetchBlogPost(id),
            fetchBlogPosts(),
        ]).then(([foundPost, allPosts]) => {
            setPost(foundPost);
            // Get up to 3 related posts (same category, different id)
            const related = allPosts
                .filter(p => p.id !== id)
                .filter(p => foundPost ? p.category === foundPost.category : true)
                .slice(0, 3);
            setRelatedPosts(related.length > 0 ? related : allPosts.filter(p => p.id !== id).slice(0, 3));
        }).finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="blog-post-page">
                <div className="post-loading">
                    <div className="loading-shimmer" />
                    <div className="loading-shimmer short" />
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="blog-post-page">
                <div className="post-not-found container">
                    <h2>Artigo não encontrado</h2>
                    <Link to="/blog" className="back-to-blog">
                        <ArrowLeft size={16} /> Voltar ao Blog
                    </Link>
                </div>
            </div>
        );
    }

    // Convert markdown to HTML
    const contentHtml = post.content ? marked.parse(post.content) as string : '';

    return (
        <div className="blog-post-page">
            <section className="post-hero">
                <img src={post.image} alt={post.title} className="post-hero-image" />
                <div className="post-hero-overlay"></div>
                <div className="container post-hero-content">
                    <Link to="/blog" className="back-to-blog">
                        <ArrowLeft size={16} /> Voltar ao Blog
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="post-category-badge">{post.category}</span>
                        <h1 className="post-title">{post.title}</h1>
                        {post.subtitle && (
                            <p className="post-subtitle">{post.subtitle}</p>
                        )}
                        <div className="post-meta-hero">
                            <span className="meta-item"><Calendar size={16} /> {post.date}</span>
                            <span className="meta-item"><User size={16} /> CHR Editorial</span>
                            {post.readTime && (
                                <span className="meta-item"><Clock size={16} /> {post.readTime}</span>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="post-body container">
                <div className="post-grid">
                    <div className="post-main-content">
                        <div
                            className="post-html-content premium-article"
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                        />

                        {post.tags && post.tags.length > 0 && (
                            <div className="post-tags">
                                <Tag size={14} />
                                {post.tags.map(tag => (
                                    <span key={tag} className="post-tag">{tag}</span>
                                ))}
                            </div>
                        )}

                        <div className="post-share-bar">
                            <span>Compartilhar este artigo:</span>
                            <div className="share-icons">
                                <button className="share-btn"><Facebook size={18} /></button>
                                <button className="share-btn"><Twitter size={18} /></button>
                                <button className="share-btn"><Linkedin size={18} /></button>
                                <button className="share-btn"><Share2 size={18} /></button>
                            </div>
                        </div>
                    </div>

                    <aside className="post-sidebar">
                        <div className="sidebar-card newsletter-card">
                            <h3>Newsletter</h3>
                            <p>Receba insights exclusivos sobre o mercado imobiliário.</p>
                            <input type="email" placeholder="Seu melhor e-mail" />
                            <button className="btn-primary-mini">ASSINAR</button>
                        </div>

                        {relatedPosts.length > 0 && (
                            <div className="sidebar-card related-posts">
                                <h3>Leitura Recomendada</h3>
                                {relatedPosts.map(rp => (
                                    <div className="related-item" key={rp.id}>
                                        <Link to={`/blog/${rp.id}`}>{rp.title}</Link>
                                        <span>{rp.date}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </aside>
                </div>
            </section>
        </div>
    );
}
