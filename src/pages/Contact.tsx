import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import './Contact.css';

export default function Contact() {
    const [phone, setPhone] = useState('');

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // only digits
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length <= 2) {
            value = value.replace(/(\d{0,2})/, '($1');
        } else if (value.length <= 6) {
            value = value.replace(/(\d{2})(\d{0,4})/, '($1) $2');
        } else if (value.length <= 10) {
            value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else {
            value = value.replace(/(\d{2})(\d{1})(\d{4})(\d{0,4})/, '($1) $2 $3-$4');
        }
        setPhone(value);
    };
    return (
        <div className="contact-page">
            {/* Cinematic Hero */}
            <header className="contact-hero">
                <div className="container">
                    <motion.div
                        className="contact-hero-content"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="contact-hero-label">Atendimento Exclusivo</span>
                        <h1 className="contact-hero-title">VAMOS INICIAR<br />UM <span>NOVO</span> LEGADO.</h1>
                        <p className="contact-hero-subtitle">
                            Nossa equipe está pronta para oferecer um atendimento sob medida para o seu próximo grande investimento.
                        </p>
                    </motion.div>
                </div>
                <div className="contact-hero-spotlight"></div>
            </header>

            <main className="container">
                <div className="contact-main-grid">
                    {/* Left Side: Professional Information */}
                    <motion.div
                        className="contact-details-block"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="section-subtitle">Fale Diretamente</span>
                        <h2>Como podemos elevar sua experiência?</h2>

                        <div className="contact-method-list">
                            <div className="method-item">
                                <div className="method-icon-box"><Phone size={24} /></div>
                                <div className="method-text">
                                    <label>Departamento de Vendas</label>
                                    <a href="https://wa.me/5531998411840">(31) 9 9841-1840</a>
                                    <p>Atendimento imediato via WhatsApp</p>
                                </div>
                            </div>

                            <div className="method-item">
                                <div className="method-icon-box"><MapPin size={24} /></div>
                                <div className="method-text">
                                    <label>Escritório Central</label>
                                    <p>Av. Francisco Sales, 329 — Conj. 301 a 304<br />Floresta — Belo Horizonte, MG</p>
                                </div>
                            </div>

                            <div className="method-item">
                                <div className="method-icon-box"><Phone size={24} /></div>
                                <div className="method-text">
                                    <label>SAC e Financeiro</label>
                                    <a href="https://wa.me/5531995194463">(31) 9 9519-4463 <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>(Financeiro)</span></a>
                                    <a style={{ display: 'block', margin: '0.2rem 0 0.8rem 0', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }} href="mailto:financeiro@chrimoveis.com.br">financeiro@chrimoveis.com.br</a>
                                    <a href="https://wa.me/5531996145588">(31) 9 9614-5588 <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>(SAC)</span></a>
                                    <a style={{ display: 'block', margin: '0.2rem 0 0', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }} href="mailto:sac@chrimoveis.com.br">sac@chrimoveis.com.br</a>
                                </div>
                            </div>

                            <div className="method-item">
                                <div className="method-icon-box"><Mail size={24} /></div>
                                <div className="method-text">
                                    <label>Contatos Corporativos</label>
                                    <a href="mailto:contato@chrimoveis.com.br">contato@chrimoveis.com.br</a>
                                    <a style={{ display: 'block', marginTop: '0.4rem' }} href="mailto:financeiro@chrimoveis.com.br">financeiro@chrimoveis.com.br</a>
                                    <a style={{ display: 'block', marginTop: '0.4rem' }} href="mailto:sac@chrimoveis.com.br">sac@chrimoveis.com.br</a>
                                    <a style={{ display: 'block', marginTop: '0.4rem' }} href="tel:+553132226345">(31) 3222-6345</a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Glassmorphism Form */}
                    <motion.div
                        className="contact-glass-form-container"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <h3 className="glass-form-title">Envie sua mensagem</h3>
                        <form className="glass-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="glass-input-group">
                                <label>Nome Completo</label>
                                <input
                                    type="text"
                                    placeholder="Como deseja ser chamado?"
                                    autoCapitalize="words"
                                    style={{ textTransform: 'capitalize' }}
                                    required
                                />
                            </div>

                            <div className="glass-input-group">
                                <label>Telefone para contato</label>
                                <input
                                    type="tel"
                                    placeholder="(00) 0 0000-0000"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    inputMode="numeric"
                                    required
                                />
                            </div>

                            <div className="glass-input-group">
                                <label>Assunto</label>
                                <select required>
                                    <option value="">Selecione a finalidade</option>
                                    <option value="interesse-empreendimento">Interesse em Empreendimento</option>
                                    <option value="seja-investidor">Seja um Investidor CHR</option>
                                    <option value="simulacao-financiamento">Simulação de Financiamento</option>
                                    <option value="negociacao-debito">Negociação de Débito</option>
                                    <option value="documentacao">Informações sobre Documentação</option>
                                    <option value="terreno-parceria">Oferta de Terreno / Parceria</option>
                                    <option value="sac">SAC – Atendimento Pós-Venda</option>
                                    <option value="outros">Outros Assuntos</option>
                                </select>
                            </div>

                            <div className="glass-input-group">
                                <label>Sua Mensagem</label>
                                <textarea rows={4} placeholder="Descreva brevemente sua necessidade..."></textarea>
                            </div>

                            <button type="submit" className="btn-glass-submit">
                                SOLICITAR ATENDIMENTO <ArrowRight size={18} style={{ marginLeft: '1rem' }} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
