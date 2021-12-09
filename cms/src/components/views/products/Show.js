import {
    Show, SimpleShowLayout, TextField,
    DateField, ChipField, NumberField, BooleanField
} from 'react-admin';

import { Csl } from 'components/common';

import Title from './shared/Title';

// Single View
const Product = props => (
    <Show {...props} title={<Title />}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="type" />
            <ChipField source="genre" />
            <TextField multiline source="meta" label="Meta" />
            <TextField source="notes" />
            <Csl source="tags" />
            <Csl source="links" />
            <DateField source="released" />
            <DateField source="consumed" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </SimpleShowLayout>
    </Show >
);

export default Product;