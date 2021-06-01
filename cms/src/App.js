import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import { Games, GameEdit, GameCreate } from './components/views/games';

const App = () => {
  return (
    <Admin title="Stuff" dataProvider={simpleRestProvider('http://localhost:3001/api')}>
      <Resource
        name="games"
        list={Games}
        //show={Game}
        edit={GameEdit}
        create={GameCreate}
      />
    </Admin>
  );
};

export default App;
