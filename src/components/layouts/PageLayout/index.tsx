import Navbar from '../../Navbar';
import HeroSection from '../../HeroSection';
import ScrollCamera from '../../ScrollCamera';
import StorySection from '../../StorySection';
import Footer from '../../Footer';

interface StatProps {
    value: string;
    label: string;
    __metadata?: { modelName: string };
}

interface HeroProps {
    eyebrow?: string;
    title?: string;
    lead?: string;
    ctaLabel?: string;
    ctaUrl?: string;
    heroImage?: string;
    heroImageAlt?: string;
    stats?: StatProps[];
    __metadata?: { modelName: string };
}

interface StorySectionProps {
    id: string;
    number: string;
    eyebrow: string;
    title: string;
    body: string;
    image: string;
    imageAlt: string;
    align: 'left' | 'right';
    bg: 'light' | 'pale' | 'dark';
    __metadata?: { modelName: string };
}

interface PageProps {
    title: string;
    hero?: HeroProps;
    sections?: StorySectionProps[];
    __metadata: { id: string; modelName: string; urlPath: string };
}

interface NavLink {
    label: string;
    url: string;
}

interface HeaderData {
    title?: string;
    primaryLinks?: NavLink[];
    ctaLabel?: string;
    ctaUrl?: string;
    __metadata: { id: string; modelName: string };
}

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

interface FooterData {
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
    __metadata: { id: string; modelName: string };
}

interface Props {
    page: PageProps;
    header?: HeaderData | null;
    footer?: FooterData | null;
}

export default function PageLayout({ page, header, footer }: Props) {
    const { hero, sections = [] } = page;
    const pageId = page.__metadata?.id;

    const storySections = sections.filter(
        (s) => s.__metadata?.modelName === 'JustVishStorySection'
    );

    return (
        <div data-sb-object-id={pageId}>
            <div data-sb-object-id={header?.__metadata?.id}>
                <Navbar
                    title={header?.title}
                    primaryLinks={header?.primaryLinks}
                    ctaLabel={header?.ctaLabel}
                    ctaUrl={header?.ctaUrl}
                />
            </div>
            <main className="page">
                {hero && (
                    <div data-sb-field-path="hero">
                        <HeroSection
                            eyebrow={hero.eyebrow}
                            title={hero.title}
                            lead={hero.lead}
                            ctaLabel={hero.ctaLabel}
                            ctaUrl={hero.ctaUrl}
                            heroImage={hero.heroImage}
                            heroImageAlt={hero.heroImageAlt}
                            stats={hero.stats}
                        />
                    </div>
                )}

                {storySections.length > 0 && (
                    <section className="story-track" data-sb-field-path="sections">
                        <ScrollCamera />
                        {storySections.map((section, index) => {
                            const sectionIndex = sections.indexOf(section);
                            return (
                                <div
                                    key={section.id}
                                    data-sb-field-path={`.${sectionIndex}`}
                                >
                                    <StorySection
                                        id={section.id}
                                        number={section.number}
                                        eyebrow={section.eyebrow}
                                        title={section.title}
                                        body={section.body}
                                        image={section.image}
                                        imageAlt={section.imageAlt}
                                        align={section.align}
                                        bg={section.bg}
                                    />
                                </div>
                            );
                        })}
                    </section>
                )}
            </main>
            <div data-sb-object-id={footer?.__metadata?.id}>
                <Footer
                    brandName={footer?.brandName}
                    text={footer?.text}
                    ctaEyebrow={footer?.ctaEyebrow}
                    ctaHeading={footer?.ctaHeading}
                    ctaSubheading={footer?.ctaSubheading}
                    ctaLabel={footer?.ctaLabel}
                    ctaUrl={footer?.ctaUrl}
                    primaryLinks={footer?.primaryLinks}
                    secondaryLinks={footer?.secondaryLinks}
                    socialLinks={footer?.socialLinks}
                    copyrightText={footer?.copyrightText}
                />
            </div>
        </div>
    );
}
