import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import frontmatter from 'front-matter';

const pagesDir = 'content/pages';
const dataDir = 'content/data';

function readContent(file) {
    const rawContent = fs.readFileSync(file, 'utf8');
    let content;
    const ext = path.extname(file).substring(1);
    if (ext === 'md') {
        const parsed = frontmatter(rawContent);
        content = { ...parsed.attributes, markdown_content: parsed.body };
    } else if (ext === 'json') {
        content = JSON.parse(rawContent);
    } else {
        throw new Error(`Unhandled file type: ${file}`);
    }
    content.__metadata = {
        id: file.replace(/\\/g, '/'),
        modelName: content.type
    };
    return content;
}

function injectMetadata(obj, parentModelName) {
    if (!obj || typeof obj !== 'object') return;
    if (Array.isArray(obj)) {
        obj.forEach((item) => injectMetadata(item));
        return;
    }
    if (obj.type && !obj.__metadata) {
        obj.__metadata = { modelName: obj.type };
    }
    for (const val of Object.values(obj)) {
        if (val && typeof val === 'object') injectMetadata(val);
    }
}

function getPageUrlPath(page) {
    const slug = page.slug ?? '';
    const clean = slug.replace(/^\/+/, '');
    return clean === '' ? '/' : `/${clean}`;
}

export function allContent() {
    const pages = globSync(`${pagesDir}/**/*.{md,json}`).map(readContent);
    const data = globSync(`${dataDir}/**/*.{md,json}`).map(readContent);

    pages.forEach((page) => {
        injectMetadata(page);
        page.__metadata.urlPath = getPageUrlPath(page);
    });
    data.forEach((d) => injectMetadata(d));

    return { pages, data };
}
