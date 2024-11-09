import {
  Admin,
  Resource,
  ListGuesser,
  // EditGuesser,
  // ShowGuesser,
} from "react-admin";

import dataProvider from "./dataProvider";

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="games" list={ListGuesser} />
      <Resource name="reviews" list={ListGuesser} />
    </Admin>
  );
}

export default App;
