import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import { Products, Product, ProductEdit, ProductCreate } from './components/views/products';
import { Games, Game, GameEdit, GameCreate } from './components/views/games';
import { Reviews, Review, ReviewCreate, ReviewEdit } from 'components/views/reviews';

const App = () => {
  return (
    <Admin title="YokuPokuCMS" dataProvider={simpleRestProvider('http://localhost:3001/api')}>

      <Resource
        name="games"
        list={Games}
        show={Game}
        edit={GameEdit}
        create={GameCreate}
      />

      <Resource
        name="ngproducts"
        options={{
          label: "Other Products"
        }}
        list={Products}
        show={Product}
        edit={ProductEdit}
        create={ProductCreate}
      />

      <Resource name="products" />

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
