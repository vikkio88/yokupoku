import { List, Datagrid, TextField, EditButton } from 'react-admin';



// the list of Games
const Games = props => (
    <List {...props}>
        <Datagrid rowClick="show" >
            <TextField source="id" />
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

export default Games;