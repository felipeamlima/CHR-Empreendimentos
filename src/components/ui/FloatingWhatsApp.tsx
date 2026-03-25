import { MessageCircle } from 'lucide-react';
import './FloatingWhatsApp.css';

export default function FloatingWhatsApp() {
    const whatsappNumber = "5531998411840";
    const message = "Olá! Gostaria de saber mais sobre os empreendimentos da CHR.";
    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-whatsapp"
            aria-label="Contact us on WhatsApp"
        >
            <div className="floating-whatsapp-icon">
                <MessageCircle size={32} />
            </div>
            <span className="floating-whatsapp-tooltip">Fale conosco</span>
        </a>
    );
}
