import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import './BlogPost.css';

// Mock data para simular um banco de dados de artigos
const blogDb: Record<string, any> = {
    "tendencias-luxo-2024": {
        title: "Tendências do mercado imobiliário de luxo para 2024",
        date: "15 Mar, 2024",
        author: "CHR Editorial",
        category: "Lifestyle",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        content: `
            <p>O mercado imobiliário de alto padrão está passando por uma transformação profunda em 2024. Mais do que metros quadrados, os clientes buscam agora experiências e uma conexão genuína com o espaço onde vivem.</p>
            
            <h3>1. Arquitetura Biofílica</h3>
            <p>A integração da natureza nos ambientes internos deixou de ser um detalhe para se tornar o coração dos projetos. Jardins verticais, ventilação cruzada e o uso massivo de luz natural são pilares fundamentais.</p>
            
            <h3>2. Tecnologia Invisível</h3>
            <p>A automação residencial evoluiu. Em vez de painéis complexos, a tecnologia agora é "invisível" e intuitiva, antecipando as necessidades dos moradores através de inteligência artificial aplicada ao conforto térmico e segurança.</p>
            
            <h3>3. Espaços Híbridos</h3>
            <p>Com a consolidação do trabalho flexível, os escritórios domésticos foram elevados ao status de suítes master, com isolamento acústico profissional e design que inspira foco e criatividade.</p>
        `
    }
};

export default function BlogPost() {
    const { id } = useParams<{ id: string }>();
    const post = blogDb[id || ""] || blogDb["tendencias-luxo-2024"];

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
                        <div className="post-meta-hero">
                            <span className="meta-item"><Calendar size={16} /> {post.date}</span>
                            <span className="meta-item"><User size={16} /> {post.author}</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="post-body container">
                <div className="post-grid">
                    <div className="post-main-content">
                        <div
                            className="post-html-content"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

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

                        <div className="sidebar-card related-posts">
                            <h3>Leitura Recomendada</h3>
                            <div className="related-item">
                                <Link to="/blog/valorizacao-bairros-bh">Os bairros que mais valorizam em BH</Link>
                                <span>10 Mar, 2024</span>
                            </div>
                            <div className="related-item">
                                <Link to="/blog/tecnologia-obras-sustentaveis">Inovação no canteiro de obras</Link>
                                <span>05 Mar, 2024</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
}
