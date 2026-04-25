import { Instagram, Facebook } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    return (
        <section className="chr-contact-grid">
            <div className="chr-contact-inner">
                {/* Row 1 */}                <div className="chr-contact-block border-right">
                    <span className="chr-contact-label">ONDE ESTAMOS</span>
                    <p style={{ marginTop: '1rem' }}>Av. Francisco Sales, 329</p>
                    <p>Conj. 301 a 304 - Floresta</p>
                    <p>CEP: 30150-220</p>
                    <p>Belo Horizonte / MG</p>
                    <a
                        href="https://maps.google.com/?q=Av.+Francisco+Sales,+329+Belo+Horizonte"
                        target="_blank"
                        rel="noreferrer"
                        className="chr-como-chegar"
                    >
                        COMO CHEGAR
                    </a>
                </div>

                <div className="chr-contact-block border-right">
                    <span className="chr-contact-label">FALE COM A GENTE</span>
                    <a href="tel:+553132226345" className="chr-small-phone" style={{ marginTop: '1rem', display: 'block' }}>
                        (31) 3222-6345
                    </a>
                    <a href="tel:+5531984060414" className="chr-small-phone" style={{ marginBottom: '1.5rem', display: 'block' }}>
                        (31) 9 8406-0414 <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>(WhatsApp)</span>
                    </a>

                    <span className="chr-contact-label" style={{ marginTop: "1rem" }}>VENDAS</span>
                    <a href="https://wa.me/5531998411840" className="chr-small-phone" style={{ display: 'block' }}>
                        (31) 9 9841-1840 <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>(WhatsApp)</span>
                    </a>
                    <a href="mailto:contato@chrimoveis.com.br" className="chr-email-link" style={{ marginTop: '0.5rem', display: 'block' }}>
                        contato@chrimoveis.com.br
                    </a>
                </div>

                <div className="chr-contact-block">
                    <span className="chr-contact-label">FINANCEIRO E SAC</span>
                    <a href="https://wa.me/5531995194463" className="chr-small-phone" style={{ display: 'block', marginTop: '1rem' }}>
                        (31) 9 9519-4463 <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>(WhatsApp)</span>
                    </a>
                    <a href="mailto:financeiro@chrimoveis.com.br" className="chr-email-link" style={{ marginTop: '0.5rem', marginBottom: '1.5rem', display: 'block' }}>
                        financeiro@chrimoveis.com.br
                    </a>

                    <span className="chr-contact-label">SAC - ATENDIMENTO</span>
                    <a href="https://wa.me/5531996145588" className="chr-small-phone" style={{ display: 'block', marginTop: '0.5rem' }}>
                        (31) 9 9614-5588 <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>(WhatsApp)</span>
                    </a>
                    <a href="mailto:sac@chrimoveis.com.br" className="chr-email-link" style={{ marginTop: '0.5rem', display: 'block' }}>
                        sac@chrimoveis.com.br
                    </a>
                </div>

                {/* Row 2 */}
                <div className="chr-contact-block border-right border-top">
                    <span className="chr-contact-label">CERTIFICAÇÕES</span>
                    <div className="chr-certs">
                        <div className="chr-cert-badge">PBQP-H</div>
                    </div>
                </div>

                <div className="chr-contact-block border-right border-top" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '3rem 4rem' }}>

                    <div className="chr-social-wrap" style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className="chr-contact-label" style={{ marginBottom: '1rem' }}>SIGA NAS REDES</span>
                        <div className="chr-social-links" style={{ marginTop: 0 }}>
                            <a href="https://www.instagram.com/chr_empreendimentos" target="_blank" rel="noreferrer" className="chr-social-btn" aria-label="Instagram">
                                <Instagram size={18} />
                            </a>
                            <a href="https://web.facebook.com/construtorachr" target="_blank" rel="noreferrer" className="chr-social-btn" aria-label="Facebook">
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>

                    <div className="chr-brand-signature" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="/logo.svg" alt="CHR" style={{ height: '50px', filter: 'brightness(0) invert(1)', opacity: 0.8 }} />
                    </div>

                </div>
            </div>

            <div className="chr-contact-footer-bar">
                <span>© {new Date().getFullYear()} · CHR Construtora</span>
                <div className="chr-footer-links">
                    <img src="/logo.svg" alt="CHR Logo" className="footer-logo-chique-mini" />
                    <a href="#">Política de Privacidade</a>
                    <a href="#">Termos de Uso</a>
                </div>
            </div>
        </section>
    );
}
