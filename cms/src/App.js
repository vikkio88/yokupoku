import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import { Games, Game, GameEdit, GameCreate } from './components/views/games';
import { Reviews } from 'components/views/reviews';

const App = () => {
  return (
    <Admin title="Stuff" dataProvider={simpleRestProvider('http://localhost:3001/api')}>
      <Resource
        name="games"
        list={Games}
        show={Game}
        edit={GameEdit}
        create={GameCreate}
      />

      <Resource
        name="reviews"
        list={Reviews}
      />
    </Admin>
  );
};

export default App;
