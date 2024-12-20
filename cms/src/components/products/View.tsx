import { Product } from "yokupoku-shared";
// import s from "./styles/view.module.css";

type Props = {
  product: Product;
};
export default function View({ product }: Props) {
  return (
    <div>
      <p>
        <h3>Type</h3>
        {product.type}
      </p>
      <h1>{product.name}</h1>
      <h2>genre: {product.genre}</h2>
      <pre>{JSON.stringify(product.meta, null, 2)}</pre>
      <p>
        <h3>Tags</h3>
        {product.tags}
      </p>
      <p>
        <h3>Links</h3>
        {product.links}
      </p>
      <p>
        <h3>Slug</h3>
        {product.slug}
      </p>
      <div>
        <h3>Image</h3>
        {product.image && <img src={product.image} alt={product.name} />}
        {!product.image && <div className="danger">No image</div>}
      </div>
      <p>created at: {product.createdAt.toLocaleString()}</p>
      <p>udpated at: {product.updatedAt.toLocaleString()}</p>
    </div>
  );
}
