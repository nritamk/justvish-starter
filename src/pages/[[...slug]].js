import Head from 'next/head';
import { allContent } from '../utils/local-content';
import { getComponent } from '../components/components-registry';

export default function Page({ page }) {
    if (!page) return null;
    const { modelName } = page.__metadata;
    const PageLayout = getComponent(modelName);
    if (!PageLayout) {
        return (
            <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '140px 24px 80px' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.4rem)', color: 'var(--color-base-black)' }}>
                    {page.title}
                </h1>
            </main>
        );
    }
    return (
        <>
            <Head>
                <title>{page.seo?.metaTitle ?? page.title ?? 'JustVish Creative Studios'}</title>
                {page.seo?.metaDescription && (
                    <meta name="description" content={page.seo.metaDescription} />
                )}
            </Head>
            <PageLayout page={page} />
        </>
    );
}

export function getStaticPaths() {
    const { pages } = allContent();
    const paths = pages
        .filter((page) => !page.isDraft)
        .map((page) => {
            const urlPath = page.__metadata.urlPath;
            const slug = urlPath === '/' ? [] : urlPath.replace(/^\//, '').split('/');
            return { params: { slug } };
        });
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const { pages } = allContent();
    const urlPath = '/' + (params?.slug ?? []).join('/');
    const page = pages.find((p) => p.__metadata.urlPath === urlPath);
    if (!page) return { notFound: true };
    return { props: { page } };
}
