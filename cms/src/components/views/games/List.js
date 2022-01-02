import { List, Datagrid, TextField, ChipField, EditButton, TextInput, Filter } from 'react-admin';
const Filters = props => (
    <Filter {...props}>
        <TextInput label="Search" source="name" alwaysOn autoComplete="off" />
    </Filter>
);

// the list of Games
const Games = props => (
    <List {...props} filters={<Filters />}>
        <Datagrid rowClick="show" >
            <TextField source="id" />
            <TextField source="name" />
            <ChipField source="meta.device" label="device" />
            <ChipField source="meta.store" label="store" />
            <EditButton />
        </Datagrid>
    </List>
);

export default Games;