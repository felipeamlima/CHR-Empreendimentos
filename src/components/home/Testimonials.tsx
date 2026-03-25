import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
    {
        name: "Ricardo e Helena Almeida",
        role: "Moradores - Lumière Residence",
        text: "A qualidade do acabamento nos surpreendeu. Desde a compra até a entrega das chaves, o atendimento da CHR foi impecável. Hoje moramos no apartamento dos nossos sonhos."
    },
    {
        name: "Fernando Costa",
        role: "Investidor",
        text: "Invisto em imóveis da CHR há mais de 10 anos. A valorização na entrega e a liquidez dos apartamentos provam que a visão de mercado e localização da construtora são incomparáveis."
    },
    {
        name: "Ana Paula Silva",
        role: "Moradora - Parc Exclusive",
        text: "Tudo reflete bom gosto e sofisticação. A área de lazer é um verdadeiro clube particular, e a segurança que o projeto nos proporciona não tem preço."
    }
];

export default function Testimonials() {
    return (
        <section className="testimonials section-padding">
            <div className="container">
                <div className="testimonials-header text-center">
                    <span className="gold-label">RECONHECIMENTO</span>
                    <h2 className="luxury-title">Depoimentos dos <span>nossos clientes.</span></h2>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            className="testimonial-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <Quote size={40} className="quote-icon" />
                            <p className="testimonial-text">{item.text}</p>
                            <div className="testimonial-author">
                                <div className="author-info">
                                    <h4>{item.name}</h4>
                                    <span>{item.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
