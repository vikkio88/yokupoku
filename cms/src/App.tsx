import { BrowserRouter, Route, Routes } from "react-router";
import Nav from "./components/layout/Nav";
import { NotFound, Product, Products, Review, Reviews } from "./pages";
import NewReview from "./pages/NewReview";

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
            <Route
              path="/products/:productId/reviews/new"
              element={<NewReview />}
            />
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
