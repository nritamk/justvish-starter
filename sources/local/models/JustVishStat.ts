import { Model } from '@stackbit/types';

export const JustVishStat: Model = {
    type: 'object',
    name: 'JustVishStat',
    label: 'Stat',
    labelField: 'label',
    fields: [
        { type: 'string', name: 'value', label: 'Value', required: true },
        { type: 'string', name: 'label', label: 'Label', required: true }
    ]
};
