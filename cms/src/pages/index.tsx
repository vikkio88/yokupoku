export { default as Products } from "./Products";
export { default as Product } from "./Product";
export { default as Reviews } from "./Reviews";
export { default as Review } from "./Review";

export const NotFound = () => (
  <div className="f cc ic pd">
    <h1>Page Not found</h1>
    <a href="/">
      <h3>Back home</h3>
    </a>
  </div>
);
