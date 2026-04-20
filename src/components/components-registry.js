import dynamic from 'next/dynamic';

const components = {
    PageLayout: dynamic(() => import('./layouts/PageLayout'))
};

export function getComponent(key) {
    return components[key];
}
