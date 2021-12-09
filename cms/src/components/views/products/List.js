import { List, Datagrid, TextField, ChipField, EditButton } from 'react-admin';


// the list of Products
const Products = props => (
    <List {...props}>
        <Datagrid rowClick="show" >
            <TextField source="id" />
            <TextField source="name" />
            <ChipField source="type" label="type" />
            <EditButton />
        </Datagrid>
    </List>
);

export default Products;