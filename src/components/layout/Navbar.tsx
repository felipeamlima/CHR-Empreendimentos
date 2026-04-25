import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const isTransparentPage = location.pathname === '/' || location.pathname.startsWith('/empreendimentos/');

        const handleScroll = () => {
            if (isTransparentPage) {
                setIsScrolled(window.scrollY > 50);
            } else {
                setIsScrolled(true);
            }
        };

        // Initial state
        if (!isTransparentPage) {
            setIsScrolled(true);
        } else {
            setIsScrolled(window.scrollY > 50);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    // Close mobile menu on route change
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container container">
                <Link to="/" className="navbar-logo">
                    <img src="/logo.svg" alt="CHR Construtora" className="logo-img" />
                </Link>

                <div className="navbar-links desktop-only">
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Início</Link>
                    <Link to="/empreendimentos" className={location.pathname.includes('/empreendimentos') ? 'active' : ''}>Empreendimentos</Link>
                    <Link to="/sobre" className={location.pathname === '/sobre' ? 'active' : ''}>Sobre a CHR</Link>
                    <Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>Blog</Link>
                </div>

                <div className="navbar-actions desktop-only">
                    <Link to="/contato" className="btn-portal">
                        FALE CONOSCO
                    </Link>
                </div>

                <button
                    className="mobile-menu-btn mobile-only"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Backdrop */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-links">
                    <Link to="/">Início</Link>
                    <Link to="/empreendimentos">Empreendimentos</Link>
                    <Link to="/sobre">Sobre a CHR</Link>
                    <Link to="/blog">Blog</Link>
                    <Link
                        to="/contato"
                        className="btn-portal"
                        style={{ display: 'block', textAlign: 'center', marginTop: '2rem' }}
                    >
                        FALE CONOSCO
                    </Link>
                </div>
            </div>
        </nav>
    );
}
