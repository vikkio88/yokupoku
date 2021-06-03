import { List, Datagrid, TextField, EditButton } from 'react-admin';



// the list of Reviews
const Reviews = props => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="product.name" label="product name" />
            <TextField source="product.type" label="product type" />
            <EditButton />
        </Datagrid>
    </List>
);

export default Reviews;