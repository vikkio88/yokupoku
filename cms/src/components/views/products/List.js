import { List, Datagrid, TextField, ChipField, EditButton, Filter, TextInput } from 'react-admin';


const Filters = props => (
    <Filter {...props}>
        <TextInput label="Search" source="name" alwaysOn autoComplete="off" />
    </Filter>
);

// the list of Products
const Products = props => (
    <List {...props} filters={<Filters />}>
        <Datagrid rowClick="show" >
            <TextField source="id" />
            <TextField source="name" />
            <ChipField source="type" label="type" />
            <EditButton />
        </Datagrid>
    </List>
);

export default Products;