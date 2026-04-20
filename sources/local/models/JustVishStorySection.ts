import { Model } from '@stackbit/types';

export const JustVishStorySection: Model = {
    type: 'object',
    name: 'JustVishStorySection',
    label: 'Story Section',
    labelField: 'eyebrow',
    fields: [
        { type: 'string', name: 'id', label: 'Section ID (anchor)', required: true },
        { type: 'string', name: 'number', label: 'Number', required: true },
        { type: 'string', name: 'eyebrow', label: 'Eyebrow', required: true },
        { type: 'string', name: 'title', label: 'Title', required: true },
        { type: 'markdown', name: 'body', label: 'Body text', required: true },
        { type: 'string', name: 'image', label: 'Image path' },
        { type: 'string', name: 'imageAlt', label: 'Image alt text' },
        {
            type: 'enum',
            name: 'align',
            label: 'Image alignment',
            options: [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' }
            ],
            default: 'right'
        },
        {
            type: 'enum',
            name: 'bg',
            label: 'Background',
            options: [
                { label: 'Light', value: 'light' },
                { label: 'Pale', value: 'pale' },
                { label: 'Dark', value: 'dark' }
            ],
            default: 'light'
        }
    ]
};
