interface FooterLink {
    label: string;
    url: string;
}

interface FooterLinksGroup {
    title?: string;
    links?: FooterLink[];
}

interface SocialLink {
    altText?: string;
    url?: string;
    icon?: string;
}

interface Props {
    brandName?: string;
    text?: string;
    ctaEyebrow?: string;
    ctaHeading?: string;
    ctaSubheading?: string;
    ctaLabel?: string;
    ctaUrl?: string;
    primaryLinks?: FooterLinksGroup;
    secondaryLinks?: FooterLinksGroup;
    socialLinks?: SocialLink[];
    copyrightText?: string;
}

const socialIcons: Record<string, React.ReactNode> = {
    youtube: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/>
        </svg>
    ),
    instagram: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="18" height="18" rx="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
        </svg>
    ),
};

const defaultPrimaryLinks: FooterLinksGroup = {
    title: 'Studio',
    links: [
        { label: 'Home', url: '#home' },
        { label: 'Services', url: '#brand-identity' },
        { label: 'Our Work', url: '#film-production' },
        { label: 'Contact', url: '#contact' },
    ],
};

const defaultSecondaryLinks: FooterLinksGroup = {
    title: 'Reach Us',
    links: [
        { label: 'hello@justvish.in', url: 'mailto:hello@justvish.in' },
        { label: 'Mumbai · India', url: '#contact' },
    ],
};

const defaultSocialLinks: SocialLink[] = [
    { altText: 'YouTube', url: 'https://youtube.com', icon: 'youtube' },
    { altText: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
];

export default function Footer({
    brandName = 'JustVish Creative Studios',
    text = "We don't just film. We tell your story.",
    ctaEyebrow = "Let's create something",
    ctaHeading = 'Have a story worth telling?',
    ctaSubheading = "Let's roll camera.",
    ctaLabel = 'Start a Project',
    ctaUrl = 'mailto:hello@justvish.in',
    primaryLinks = defaultPrimaryLinks,
    secondaryLinks = defaultSecondaryLinks,
    socialLinks = defaultSocialLinks,
    copyrightText = '© JustVish Creative Studios · All rights reserved.',
}: Props) {
    const year = new Date().getFullYear();

    return (
        <footer id="contact" className="footer">
            <div className="container">
                <div className="footer-cta">
                    <span className="eyebrow" data-sb-field-path="ctaEyebrow">{ctaEyebrow}</span>
                    <h2>
                        <span data-sb-field-path="ctaHeading">{ctaHeading}</span>{' '}
                        <em data-sb-field-path="ctaSubheading">{ctaSubheading}</em>
                    </h2>
                    <a className="btn-pill" href={ctaUrl} data-sb-field-path="ctaUrl#@href ctaLabel">
                        {ctaLabel}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor"
                                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>

                <div className="footer-grid">
                    <div className="brand-block">
                        <div className="brand">
                            <span className="brand-mark" aria-hidden="true">
                                <svg viewBox="0 0 32 32" fill="none">
                                    <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="16" cy="16" r="6" fill="currentColor" />
                                </svg>
                            </span>
                            <span className="brand-name" data-sb-field-path="brandName">{brandName}</span>
                        </div>
                        <p className="tagline" data-sb-field-path="text">{text}</p>
                    </div>

                    <div className="link-col" data-sb-field-path="primaryLinks">
                        <h4 data-sb-field-path="title">{primaryLinks.title}</h4>
                        <ul data-sb-field-path="links">
                            {primaryLinks.links?.map((link, i) => (
                                <li key={i} data-sb-field-path={`.${i}`}>
                                    <a href={link.url} data-sb-field-path="url#@href label">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="link-col" data-sb-field-path="secondaryLinks">
                        <h4 data-sb-field-path="title">{secondaryLinks.title}</h4>
                        <ul data-sb-field-path="links">
                            {secondaryLinks.links?.map((link, i) => (
                                <li key={i} data-sb-field-path={`.${i}`}>
                                    <a href={link.url} data-sb-field-path="url#@href label">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="link-col">
                        <h4>Follow</h4>
                        <ul className="social" data-sb-field-path="socialLinks">
                            {socialLinks.map((social, i) => (
                                <li key={i} data-sb-field-path={`.${i}`}>
                                    <a
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener"
                                        aria-label={social.altText}
                                        data-sb-field-path="url#@href"
                                    >
                                        {socialIcons[social.icon ?? ''] ?? null}
                                        <span data-sb-field-path="altText">{social.altText}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span data-sb-field-path="copyrightText">{copyrightText?.replace(/\n/g, '')}</span>
                    <span>Crafted with care, cut with precision.</span>
                </div>
            </div>
        </footer>
    );
}
