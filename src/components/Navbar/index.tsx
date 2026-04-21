import { useState, useEffect } from 'react';

interface NavLink {
    label: string;
    url: string;
}

interface Props {
    title?: string;
    primaryLinks?: NavLink[];
    ctaLabel?: string;
    ctaUrl?: string;
}

const defaultLinks: NavLink[] = [
    { label: 'Services', url: '#brand-identity' },
    { label: 'Our Work', url: '#film-production' },
    { label: 'About', url: '#about' },
    { label: 'Contact', url: '#contact' },
];

export default function Navbar({
    title = 'JustVish',
    primaryLinks = defaultLinks,
    ctaLabel = "Let's Connect",
    ctaUrl = '#contact',
}: Props) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={`navbar-wrap${scrolled ? ' is-scrolled' : ''}`}>
            <nav className="navbar" aria-label="Primary navigation">
                <a className="brand" href="#home" onClick={closeMenu}>
                    <span className="brand-mark" aria-hidden="true">
                        <svg viewBox="0 0 32 32" fill="none">
                            <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="16" cy="16" r="6" fill="currentColor" />
                        </svg>
                    </span>
                    <span className="brand-name" data-sb-field-path="title">{title}</span>
                </a>

                <ul className={`nav-links${menuOpen ? ' open' : ''}`} data-sb-field-path="primaryLinks">
                    {primaryLinks.map((link, i) => (
                        <li key={link.url} data-sb-field-path={`.${i}`}>
                            <a href={link.url} onClick={closeMenu} data-sb-field-path="url#@href label">{link.label}</a>
                        </li>
                    ))}
                </ul>

                <a
                    className="btn-pill nav-cta"
                    href={ctaUrl}
                    onClick={closeMenu}
                    data-sb-field-path="ctaUrl#@href ctaLabel"
                >
                    {ctaLabel}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2"
                              strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>

                <button
                    className="menu-toggle"
                    aria-expanded={menuOpen}
                    aria-label="Toggle menu"
                    onClick={() => setMenuOpen((v) => !v)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
        </header>
    );
}
