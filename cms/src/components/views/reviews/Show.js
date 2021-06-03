import { Show, SimpleShowLayout, TextField } from 'react-admin';

const Review = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="subtitle" />
            <TextField source="product.name" label="product name" />
            <TextField source="product.type" label="product type" />
            <TextField source="content" />
        </SimpleShowLayout>
    </Show>
);

export default Review;