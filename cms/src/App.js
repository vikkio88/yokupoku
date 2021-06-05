import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import { Games, Game, GameEdit, GameCreate } from './components/views/games';
import { Reviews, Review, ReviewCreate, ReviewEdit } from 'components/views/reviews';

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
        show={Review}
        create={ReviewCreate}
        edit={ReviewEdit}
      />
    </Admin>
  );
};

export default App;
