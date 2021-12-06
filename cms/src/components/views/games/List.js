import { List, Datagrid, TextField, ChipField, EditButton } from 'react-admin';


// the list of Games
const Games = props => (
    <List {...props}>
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