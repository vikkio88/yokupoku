import {
    Show, SimpleShowLayout, TextField,
    DateField, ChipField, FunctionField
} from 'react-admin';
import { JsonField } from "react-admin-json-view";

import { Csl } from 'components/common';

import Title from './shared/Title';

// Single View
const Product = props => (
    <Show {...props} title={<Title />}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="slug" />
            <TextField source="name" />
            <TextField source="type" />
            <ChipField source="genre" />
            <JsonField source="meta" addLabel />
            <TextField source="notes" />
            <Csl source="tags" />
            <Csl source="links" />
            <DateField source="released" />
            <DateField source="consumed" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <FunctionField
                label="Image"
                render={record => <img src={record.image} alt={record.name}/>}
            />
        </SimpleShowLayout>
    </Show >
);

export default Product;