import { Model } from '@stackbit/types';

export const JustVishHero: Model = {
    type: 'object',
    name: 'JustVishHero',
    label: 'Hero Section',
    fields: [
        { type: 'string', name: 'eyebrow', label: 'Eyebrow text' },
        { type: 'string', name: 'title', label: 'Headline', required: true },
        { type: 'string', name: 'lead', label: 'Lead paragraph' },
        { type: 'string', name: 'ctaLabel', label: 'CTA button label' },
        { type: 'string', name: 'ctaUrl', label: 'CTA button URL' },
        { type: 'string', name: 'heroImage', label: 'Hero image path' },
        { type: 'string', name: 'heroImageAlt', label: 'Hero image alt text' },
        {
            type: 'list',
            name: 'stats',
            label: 'Stats',
            items: { type: 'model', models: ['JustVishStat'] }
        }
    ]
};
