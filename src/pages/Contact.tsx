import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MessageCircle, ArrowRight, CheckCircle2, Upload, X, ChevronDown } from 'lucide-react';
import './Contact.css';

const CONTACT_REASONS = [
    { id: 'vendas', label: 'Vendas' },
    { id: 'pos-vendas', label: 'Pós-vendas' },
    { id: 'terreno', label: 'Ofereça seu terreno' },
    { id: 'fornecedor', label: 'Fornecedor' },
    { id: 'trabalhe', label: 'Trabalhe conosco' },
];

const SHOW_UPLOAD_FOR = ['fornecedor', 'trabalhe'];

export default function Contact() {
    const [activeReason, setActiveReason] = useState('vendas');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const fileRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
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
            const reasonLabel = CONTACT_REASONS.find(r => r.id === activeReason)?.label || '';

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
                    interesse: `[${reasonLabel}] ${subject} — ${message}`,
                    imovel: `Página de Contato (${reasonLabel})`,
                    data: new Date().toISOString(),
                    pagina: window.location.href,
                }),
            });

            setStatus('success');
            setName('');
            setEmail('');
            setPhone('');
            setSubject('');
            setMessage('');
            setFile(null);

            setTimeout(() => setStatus('idle'), 6000);
        } catch (error) {
            console.error('Erro no formulário de contato:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="contact-page">
            {/* ─── HERO SECTION ─── */}
            <header className="contact-hero">
                <div className="contact-hero-bg-overlay" />
                <div className="contact-hero-inner">
                    <motion.span
                        className="contact-hero-label"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        Atendimento Exclusivo
                    </motion.span>

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

                    <motion.p
                        className="contact-hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.55 }}
                    >
                        Selecione o motivo do contato e receba um atendimento consultivo da nossa equipe.
                    </motion.p>

                    {/* ─── REASON PILLS ─── */}
                    <motion.div
                        className="contact-reasons"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.75 }}
                    >
                        {CONTACT_REASONS.map((reason) => (
                            <button
                                key={reason.id}
                                className={`contact-reason-pill ${activeReason === reason.id ? 'active' : ''}`}
                                onClick={() => setActiveReason(reason.id)}
                            >
                                {reason.label}
                            </button>
                        ))}
                    </motion.div>

                    <motion.button
                        className="contact-scroll-cta"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        onClick={scrollToForm}
                    >
                        <span>Preencher formulário</span>
                        <ChevronDown size={18} className="contact-scroll-arrow" />
                    </motion.button>
                </div>
            </header>

            {/* ─── FORM SECTION ─── */}
            <section className="contact-form-section" ref={formRef}>
                <div className="contact-form-container">
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                className="contact-success-card"
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                            >
                                <CheckCircle2 size={56} className="success-icon" />
                                <h3>Solicitação Recebida</h3>
                                <p>
                                    Agradecemos muito o seu contato. Um de nossos especialistas retornará em breve
                                    para um atendimento exclusivo e personalizado.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                className="contact-form"
                                key="form"
                                onSubmit={handleSubmit}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="contact-form-header">
                                    <span className="form-reason-tag">
                                        {CONTACT_REASONS.find(r => r.id === activeReason)?.label}
                                    </span>
                                    <h2>Envie sua mensagem</h2>
                                    <p className="form-description">
                                        Preencha os campos abaixo e nossa equipe especializada entrará em contato com você.
                                    </p>
                                </div>

                                {/* Row 1: Nome, Email, Telefone */}
                                <div className="form-row form-row-3">
                                    <div className="form-field">
                                        <label htmlFor="contact-name">Nome</label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            placeholder="Como deseja ser chamado?"
                                            autoCapitalize="words"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="contact-email">E-mail</label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            placeholder="seu.email@exemplo.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="contact-phone">Telefone / WhatsApp</label>
                                        <input
                                            id="contact-phone"
                                            type="tel"
                                            placeholder="(00) 0 0000-0000"
                                            value={phone}
                                            onChange={handlePhoneChange}
                                            inputMode="numeric"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Assunto */}
                                <div className="form-row">
                                    <div className="form-field">
                                        <label htmlFor="contact-subject">Assunto</label>
                                        <input
                                            id="contact-subject"
                                            type="text"
                                            placeholder="Resuma brevemente o motivo do contato"
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Row 3: Mensagem */}
                                <div className="form-row">
                                    <div className="form-field">
                                        <label htmlFor="contact-message">Mensagem</label>
                                        <textarea
                                            id="contact-message"
                                            rows={5}
                                            placeholder="Descreva sua necessidade com detalhes..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Upload (conditional) */}
                                <AnimatePresence>
                                    {SHOW_UPLOAD_FOR.includes(activeReason) && (
                                        <motion.div
                                            className="form-row"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.35 }}
                                        >
                                            <div className="form-field">
                                                <label>Anexo</label>
                                                <input
                                                    ref={fileRef}
                                                    type="file"
                                                    className="sr-only"
                                                    accept=".pdf,.doc,.docx,.jpg,.png"
                                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                                />
                                                {!file ? (
                                                    <button
                                                        type="button"
                                                        className="upload-trigger"
                                                        onClick={() => fileRef.current?.click()}
                                                    >
                                                        <Upload size={18} />
                                                        <span>
                                                            {activeReason === 'trabalhe'
                                                                ? 'Enviar currículo (PDF, DOC)'
                                                                : 'Anexar documento (PDF, DOC, IMG)'}
                                                        </span>
                                                    </button>
                                                ) : (
                                                    <div className="upload-file-info">
                                                        <span>{file.name}</span>
                                                        <button
                                                            type="button"
                                                            className="upload-remove"
                                                            onClick={() => {
                                                                setFile(null);
                                                                if (fileRef.current) fileRef.current.value = '';
                                                            }}
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* LGPD + Submit */}
                                <div className="form-footer">
                                    <p className="lgpd-text">
                                        De acordo com a LGPD, concordo em fornecer os dados acima para que a CHR Construtora entre em contato
                                        comigo para apresentar produtos e serviços.
                                    </p>
                                    <button
                                        type="submit"
                                        className="btn-submit"
                                        disabled={status === 'sending'}
                                    >
                                        {status === 'sending' ? (
                                            <span className="btn-loading">Enviando...</span>
                                        ) : (
                                            <>
                                                <span>Solicitar atendimento</span>
                                                <ArrowRight size={18} />
                                            </>
                                        )}
                                    </button>
                                </div>

                                {status === 'error' && (
                                    <p className="form-error-msg">
                                        Ocorreu um erro ao enviar. Por favor, tente novamente ou use nosso WhatsApp.
                                    </p>
                                )}
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* ─── QUICK SHORTCUTS BAR ─── */}
            <section className="contact-shortcuts">
                <div className="shortcuts-inner">
                    <a
                        href="https://wa.me/5531998411840"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shortcut-item"
                    >
                        <MessageCircle size={20} />
                        <span>Converse pelo WhatsApp</span>
                    </a>

                    <div className="shortcut-divider" />

                    <a href="tel:+553132226345" className="shortcut-item">
                        <Phone size={20} />
                        <span>Ligue para a CHR</span>
                    </a>

                    <div className="shortcut-divider" />

                    <a href="mailto:contato@chrimoveis.com.br" className="shortcut-item">
                        <Mail size={20} />
                        <span>Envie uma mensagem</span>
                    </a>
                </div>
            </section>
        </div>
    );
}
