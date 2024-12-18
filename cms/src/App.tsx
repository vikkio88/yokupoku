import { BrowserRouter, Route, Routes } from "react-router";
import { Products, Reviews } from "./pages";
import Nav from "./components/layout/Nav";

function App() {
  return (
    <>
      <h1>Stuff</h1>
      <Nav />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
