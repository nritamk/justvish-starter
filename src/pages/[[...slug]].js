import fs from 'fs';
import path from 'path';
import fm from 'front-matter';
import { glob } from 'glob';

export default function Page({ title }) {
    return (
        <main style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            <h1>{title}</h1>
        </main>
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
            title: attributes.title ?? 'Hello World'
        }
    };
}
