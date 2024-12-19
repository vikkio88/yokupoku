import { BrowserRouter, Route, Routes } from "react-router";
import { Products, Reviews, NotFound, Product, Review } from "./pages";
import Nav from "./components/layout/Nav";

function App() {
  return (
    <>
      <h1>Yokupoku CMS</h1>
      <Nav />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/reviews/:id" element={<Review />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
