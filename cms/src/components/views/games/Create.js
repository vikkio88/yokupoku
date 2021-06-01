import { Create, SimpleForm, TextInput, NumberInput, NullableBooleanInput, SelectInput } from 'react-admin';

const STORES = [
    'steam',
    'gog',
    'origin',
    'epic',
    'ubi',
    'itchio',
    'other',
    'drm-free'
];

const GameCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="genre" />
            <TextInput source="meta.edition" label="Edition" />
            <SelectInput source="meta.store" label="Store" choices={STORES.map(s => ({ id: s, name: s }))} />
            <NumberInput source="meta.played" label="Played Time" step={1} min={0} />
            <NullableBooleanInput source="meta.refunded" label="Refunded?" />
            <NumberInput source="meta.price" label="Price" step={1} min={0} />
        </SimpleForm>
    </Create>
);

export default GameCreate;