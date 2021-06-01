import { Edit, SimpleForm, TextInput, NumberInput, NullableBooleanInput, SelectInput, DateInput } from 'react-admin';

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

const GameEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" />
            <TextInput source="name" />
            <TextInput source="genre" />
            <TextInput source="meta.edition" label="Edition" />
            <SelectInput source="meta.store" label="Store" choices={STORES.map(s => ({ id: s, name: s }))} />
            <NumberInput source="meta.played" label="Played Time" step={1} min={0} />
            <NullableBooleanInput source="meta.refunded" label="Refunded?" />
            <NumberInput source="meta.price" label="Price" step={1} min={0} />
            <DateInput source="createdAt" />
        </SimpleForm>
    </Edit>
);

export default GameEdit;