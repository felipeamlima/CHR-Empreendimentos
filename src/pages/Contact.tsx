import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import './Contact.css';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/chr-leads';
            
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: name,
                    email: email,
                    telefone: phone,
                    interesse: `${subject} - ${message}`,
                    imovel: 'Página de Contato (Geral)',
                    data: new Date().toISOString(),
                    pagina: window.location.href,
                }),
            });

            if (!response.ok) {
                throw new Error('Falha ao enviar para o n8n');
            }

            setStatus('success');
            // Limpar formulário
            setName('');
            setEmail('');
            setPhone('');
            setSubject('');
            setMessage('');
            
            // Voltar para idle depois de 5 segundos
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Erro no formulário de contato:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
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
                        {status === 'success' ? (
                            <motion.div 
                                className="glass-form-success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '3rem 2rem',
                                    textAlign: 'center',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    gap: '1rem'
                                }}
                            >
                                <CheckCircle2 size={48} color="#4ade80" />
                                <h4>Mensagem Enviada!</h4>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                                    Recebemos sua solicitação com sucesso. Nossa equipe entrará em contato em breve pelo telefone {phone} ou e-mail {email}.
                                </p>
                            </motion.div>
                        ) : (
                            <form className="glass-form" onSubmit={handleSubmit}>
                                <div className="glass-input-group">
                                    <label>Nome Completo</label>
                                    <input
                                        type="text"
                                        placeholder="Como deseja ser chamado?"
                                        autoCapitalize="words"
                                        style={{ textTransform: 'capitalize' }}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="glass-input-group">
                                    <label>E-mail</label>
                                    <input
                                        type="email"
                                        placeholder="seu.email@exemplo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                    <select 
                                        required
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    >
                                        <option value="">Selecione a finalidade</option>
                                        <option value="Interesse em Empreendimento">Interesse em Empreendimento</option>
                                        <option value="Seja um Investidor CHR">Seja um Investidor CHR</option>
                                        <option value="Simulação de Financiamento">Simulação de Financiamento</option>
                                        <option value="Negociação de Débito">Negociação de Débito</option>
                                        <option value="Informações sobre Documentação">Informações sobre Documentação</option>
                                        <option value="Oferta de Terreno / Parceria">Oferta de Terreno / Parceria</option>
                                        <option value="SAC – Atendimento Pós-Venda">SAC – Atendimento Pós-Venda</option>
                                        <option value="Outros Assuntos">Outros Assuntos</option>
                                    </select>
                                </div>

                                <div className="glass-input-group">
                                    <label>Sua Mensagem</label>
                                    <textarea 
                                        rows={4} 
                                        placeholder="Descreva brevemente sua necessidade..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn-glass-submit"
                                    disabled={status === 'sending'}
                                    style={{ opacity: status === 'sending' ? 0.7 : 1 }}
                                >
                                    {status === 'sending' ? 'ENVIANDO...' : (
                                        <>SOLICITAR ATENDIMENTO <ArrowRight size={18} style={{ marginLeft: '1rem' }} /></>
                                    )}
                                </button>
                                
                                {status === 'error' && (
                                    <p style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '1rem', textAlign: 'center' }}>
                                        Ocorreu um erro ao enviar. Por favor, tente novamente ou use nosso WhatsApp.
                                    </p>
                                )}
                            </form>
                        )}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
