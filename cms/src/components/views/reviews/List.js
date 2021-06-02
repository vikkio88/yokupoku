import { List, Datagrid, TextField, EditButton } from 'react-admin';



// the list of Reviews
const Reviews = props => (
    <List {...props}>
        <Datagrid >
            <TextField source="slug" />
            <TextField source="title" />
            <EditButton />
        </Datagrid>
    </List>
);

export default Reviews;