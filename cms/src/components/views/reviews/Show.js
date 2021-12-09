import { Csl } from 'components/common';
import { BooleanField, FunctionField, NumberField, Show, SimpleShowLayout, TextField, DateField } from 'react-admin';
import MdView from 'react-showdown';
import Title from './shared/Title';

const Review = props => (
    <Show title={<Title />} {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="subtitle" />
            <TextField source="product.name" label="product name" />
            <TextField source="product.type" label="product type" />
            <FunctionField
                label="Review Content (Preview)"
                render={record => <MdView markdown={record.content} options={{ tables: true, emoji: true }} />}
            />
            <Csl source="pros" />
            <Csl source="cons" />
            <Csl source="tags" />
            <NumberField source="rating" />
            <NumberField source="bsi" label="Boredom Speed Index" />
            <BooleanField source="suggested" />
            <BooleanField source="published" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <FunctionField
                label="Image"
                render={record => <img src={record.image} alt={record.name}/>}
            />
        </SimpleShowLayout>
    </Show>
);

export default Review;