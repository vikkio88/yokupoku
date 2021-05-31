import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';


import { Show, SimpleShowLayout, List, Datagrid, TextField, DateField, ChipField, NumberField, BooleanField } from 'react-admin';
const GameList = props => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" />
    </Datagrid>
  </List>
);

const Game = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="meta.edition" label="Edition" />
      <ChipField source="genre" />
      <ChipField source="meta.store" label="Store" />
      <NumberField source="meta.played" label="Played Time" />
      <BooleanField source="meta.refunded" label="Refunded?" />
      <NumberField source="meta.price" label="Price" options={{ style: 'currency', currency: 'GBP' }} />
      <TextField source="genre" />
      <DateField source="createdAt" />
    </SimpleShowLayout>
  </Show>
);

function App() {
  return (
    <Admin title="Stuff" dataProvider={simpleRestProvider('http://localhost:3001/api')}>
      <Resource name="games" list={GameList} show={Game} />
    </Admin>
  );
}

export default App;
