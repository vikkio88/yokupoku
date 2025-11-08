import { Product } from "yokupoku-shared";

type Props = {
  product: Product;
};

export default function View({ product }: Props) {
  return (
    <div>
      <div>
        <h3>Type</h3>
        {product.type}
      </div>
      <h1>{product.name}</h1>
      <h2>genre: {product.genre}</h2>
      <pre>{JSON.stringify(product.meta, null, 2)}</pre>
      <div>
        <h3>Tags</h3>
        {product.tags}
      </div>
      <div>
        <h3>Links</h3>
        {product.links}
      </div>
      <div>
        <h3>Slug</h3>
        {product.slug}
      </div>
      <div>
        <h3>Image</h3>
        {product.image && <img src={product.image} alt={product.name} />}
        {!product.image && <div className="danger">No image</div>}
      </div>
      <div>created at: {product.createdAt.toLocaleString()}</div>
      <div>udpated at: {product.updatedAt.toLocaleString()}</div>
    </div>
  );
}
