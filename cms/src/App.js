import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';


import { List, Datagrid, TextField, DateField } from 'react-admin';
const GameList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="genre" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);

function App() {
  return (
    <Admin title="Stuff" dataProvider={simpleRestProvider('http://localhost:3001/api')}>
      <Resource name="games" list={GameList} />
    </Admin>
  );
}

export default App;
