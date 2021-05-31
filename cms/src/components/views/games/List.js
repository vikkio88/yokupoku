import { List, Datagrid, TextField } from 'react-admin';

// the list of Games
const Games = props => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="name" />
        </Datagrid>
    </List>
);

export default Games;