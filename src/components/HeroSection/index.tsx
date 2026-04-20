import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface StatItem {
    value: string;
    label: string;
}

interface Props {
    eyebrow?: string;
    title?: string;
    lead?: string;
    ctaLabel?: string;
    ctaUrl?: string;
    heroImage?: string;
    heroImageAlt?: string;
    stats?: StatItem[];
}

export default function HeroSection({
    eyebrow = 'JustVish Creative Studios',
    title = "We're not just another creative agency.",
    lead = "We're storytellers, filmmakers, and brand architects who believe in the transformative power of visual narrative.",
    ctaLabel = 'Start Your Story',
    ctaUrl = '#contact',
    heroImage = '/assets/hero-camera.png',
    heroImageAlt = 'Cinematographer holding a professional cinema camera in soft golden light',
    stats = [
        { value: '120+', label: 'Films delivered' },
        { value: '40+', label: 'Brands built' },
        { value: '9 yrs', label: 'Of storytelling' },
    ],
}: Props) {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const root = heroRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.from(root.querySelector('.eyebrow'), { y: 24, opacity: 0, duration: 0.7 })
              .from(root.querySelector('.hero-title'), { y: 40, opacity: 0, duration: 0.9 }, '-=0.4')
              .from(root.querySelector('.hero-lead'), { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
              .from(root.querySelectorAll('.hero-actions > *'), {
                  y: 20, opacity: 0, duration: 0.6, stagger: 0.12,
              }, '-=0.4')
              .from(root.querySelector('.hero-stats'), { y: 30, opacity: 0, duration: 0.7 }, '-=0.3')
              .from(root.querySelector('.hero-visual'), {
                  scale: 0.95, opacity: 0, duration: 1.2, ease: 'power2.out',
              }, 0.2)
              .from(root.querySelectorAll('.float-tag'), {
                  y: 20, opacity: 0, duration: 0.6, stagger: 0.15,
              }, '-=0.6');
        }, root);

        const onMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 14;
            const y = (e.clientY / innerHeight - 0.5) * 14;
            gsap.to(root.querySelector('.hero-visual'), {
                x, y, duration: 0.8, ease: 'power2.out',
            });
        };

        root.addEventListener('mousemove', onMouseMove);
        return () => {
            ctx.revert();
            root.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <section ref={heroRef} id="home" className="hero" aria-label="Introduction">
            <div className="hero-bg" aria-hidden="true">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="grain"></div>
            </div>

            <div className="container hero-grid">
                <div className="hero-content">
                    <span className="eyebrow" data-sb-field-path="eyebrow">{eyebrow}</span>

                    <h1 className="hero-title" data-sb-field-path="title">
                        {title}
                    </h1>

                    <p className="hero-lead" data-sb-field-path="lead">
                        {lead}
                    </p>

                    <div className="hero-actions">
                        <a className="btn-pill" href={ctaUrl} data-sb-field-path="ctaUrl#@href ctaLabel">
                            {ctaLabel}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2"
                                      strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a className="btn-pill btn-ghost" href="#brand-identity">See Our Work</a>
                    </div>

                    <div className="hero-stats" data-sb-field-path="stats">
                        {stats.map((stat, i) => (
                            <div key={i} data-sb-field-path={`.${i}`}>
                                <strong data-sb-field-path="value">{stat.value}</strong>
                                <span data-sb-field-path="label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hero-visual">
                    <img
                        src={heroImage}
                        alt={heroImageAlt}
                        loading="eager"
                        data-sb-field-path="heroImage#@src heroImageAlt#@alt"
                    />
                </div>
            </div>

            <a className="scroll-cue" href="#brand-identity" aria-label="Scroll down">
                <span>Scroll</span>
                <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
                    <rect x="1" y="1" width="12" height="20" rx="6"
                          stroke="currentColor" strokeWidth="1.4" />
                    <circle cx="7" cy="7" r="1.6" fill="currentColor" />
                </svg>
            </a>
        </section>
    );
}
