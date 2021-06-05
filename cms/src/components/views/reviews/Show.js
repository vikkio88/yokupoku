import { FunctionField, Show, SimpleShowLayout, TextField } from 'react-admin';
import MdView from 'react-showdown';

const Review = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="subtitle" />
            <TextField source="product.name" label="product name" />
            <TextField source="product.type" label="product type" />
            <FunctionField label="Review Content (Preview)" render={record => <MdView markdown={record.content} options={{ tables: true, emoji: true }} />} />
        </SimpleShowLayout>
    </Show>
);

export default Review;