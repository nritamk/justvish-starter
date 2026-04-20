import fs from 'fs';
import path from 'path';
import fm from 'front-matter';
import { glob } from 'glob';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ScrollCamera from '../components/ScrollCamera';
import StorySection from '../components/StorySection';
import Footer from '../components/Footer';

const sections = [
    {
        id: 'brand-identity',
        number: '01',
        eyebrow: 'Brand Identity',
        title: 'We shape the soul of your brand.',
        body: 'We shape the core of your brand, including its design, voice, and personality. We identify your ideal audience so every message comes through loud and clear.',
        image: '/assets/section-brand.svg',
        imageAlt: 'Cinematic close-up of a camera lens reflecting a brand identity moodboard',
        align: 'right',
        bg: 'light',
    },
    {
        id: 'communication-strategy',
        number: '02',
        eyebrow: 'Communication Strategy',
        title: 'Strategy that speaks in pictures.',
        body: 'We transform business goals into engaging visual storytelling by creating a clear communication strategy across digital media, print, and everything else.',
        image: '/assets/section-strategy.svg',
        imageAlt: 'Director reviewing storyboard frames in a softly-lit studio',
        align: 'left',
        bg: 'pale',
    },
    {
        id: 'film-production',
        number: '03',
        eyebrow: 'Content & Film Production',
        title: 'Stories told frame by frame.',
        body: "We bring your brand to life with strong, high-quality content production. Whether it's an ad film, a docu-film, a podcast series, or eye-catching social media visuals.",
        image: '/assets/section-production.svg',
        imageAlt: 'Cinematographer operating a cinema camera on a film set with golden lighting',
        align: 'right',
        bg: 'dark',
    },
    {
        id: 'creative-design',
        number: '04',
        eyebrow: 'Creative Design',
        title: 'Designs you remember.',
        body: 'We craft visuals that communicate effectively and leave a lasting impact. Our designs are meant to be seen, understood, and remembered.',
        image: '/assets/section-design.svg',
        imageAlt: "Designer's desk with film stills, color swatches and a vintage camera",
        align: 'left',
        bg: 'light',
    },
];

function HomePage() {
    return (
        <main className="page">
            <HeroSection />
            <section className="story-track">
                <ScrollCamera />
                {sections.map((section) => (
                    <StorySection key={section.id} data={section} />
                ))}
            </section>
        </main>
    );
}

function GenericPage({ title }) {
    return (
        <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '140px 24px 80px' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.4rem)', color: 'var(--color-base-black)' }}>
                {title}
            </h1>
        </main>
    );
}

export default function Page({ title, isHome }) {
    return (
        <>
            <Navbar />
            {isHome ? <HomePage /> : <GenericPage title={title} />}
            <Footer />
        </>
    );
}

export async function getStaticPaths() {
    const contentPagesDir = path.join(process.cwd(), 'content', 'pages');
    const files = await glob('**/*.md', { cwd: contentPagesDir });
    const paths = files.map((file) => {
        const relative = file.replace(/\.md$/, '').replace(/\\/g, '/');
        const slugParts = relative === 'index' ? [] : relative.split('/');
        return { params: { slug: slugParts } };
    });
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const slugParts = params?.slug ?? [];
    const filePart = slugParts.length > 0 ? path.join(...slugParts) : 'index';
    const filePath = path.join(process.cwd(), 'content', 'pages', `${filePart}.md`);

    if (!fs.existsSync(filePath)) {
        return { notFound: true };
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { attributes } = fm(fileContent);

    return {
        props: {
            title: attributes.title ?? 'JustVish Creative Studios',
            isHome: slugParts.length === 0,
        },
    };
}
