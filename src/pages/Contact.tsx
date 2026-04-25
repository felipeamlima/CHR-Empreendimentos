import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
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
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyoR0s8CRngON_wkHvlS-GVGdXCajsRtZkjSQCxLACl7FQs59HePmUk6wzxy383oKYiEQ/exec';
            
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
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

            // Com mode: 'no-cors', não podemos ler a resposta, então assumimos sucesso se a promise não falhar.
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="contact-hero-label">Atendimento Exclusivo</span>
                        <h1 className="contact-hero-title" aria-label="Vamos iniciar um novo legado.">
                            <span className="contact-hero-line">
                                {['VAMOS', 'INICIAR'].map((word, i) => (
                                    <span className="contact-word-wrap" key={`l1-${i}`}>
                                        <motion.span
                                            className="contact-word"
                                            initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                            animate={{ clipPath: 'inset(0 0% 0 0)' }}
                                            transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: [0.77, 0, 0.175, 1] }}
                                        >
                                            {word}
                                        </motion.span>
                                    </span>
                                ))}
                            </span>
                            <span className="contact-hero-line">
                                {['UM', 'NOVO'].map((word, i) => (
                                    <span className="contact-word-wrap" key={`l2-${i}`}>
                                        <motion.span
                                            className="contact-word"
                                            initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                            animate={{ clipPath: 'inset(0 0% 0 0)' }}
                                            transition={{ duration: 1, delay: 0.6 + i * 0.15, ease: [0.77, 0, 0.175, 1] }}
                                        >
                                            {word}
                                        </motion.span>
                                    </span>
                                ))}
                                <span className="contact-word-wrap">
                                    <motion.span
                                        className="contact-word contact-word-accent"
                                        initial={{ clipPath: 'inset(0 100% 0 0)' }}
                                        animate={{ clipPath: 'inset(0 0% 0 0)' }}
                                        transition={{ duration: 1, delay: 0.9, ease: [0.77, 0, 0.175, 1] }}
                                    >
                                        LEGADO.
                                    </motion.span>
                                </span>
                            </span>
                        </h1>
                        <p className="contact-hero-subtitle">
                            Nossa equipe está pronta para oferecer um atendimento sob medida para o seu próximo grande investimento.
                        </p>

                        <motion.div
                            className="contact-scroll-hint"
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
                            <span>FALE CONOSCO</span>
                            <ChevronDown size={20} strokeWidth={1.5} className="contact-scroll-arrow" />
                        </motion.div>
                    </motion.div>
                </div>
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
                                <CheckCircle2 size={56} color="var(--color-primary)" style={{ marginBottom: '0.5rem' }} />
                                <h4 style={{ fontSize: '1.5rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Solicitação Recebida!</h4>
                                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '400px' }}>
                                    Agradecemos muito o seu contato. Um de nossos especialistas retornará em breve através do telefone <strong>{phone}</strong> ou e-mail para um atendimento exclusivo.
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
