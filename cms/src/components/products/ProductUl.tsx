import { Product } from "yokupoku-shared";
import ProductLi from "./ProductLi";

type Props = {
  products: Product[];
  onReset?: () => void;
};

export default function ProductUl({ products, onReset }: Props) {
  return (
    <ul>
      {products.map((p) => (
        <ProductLi key={p.id} product={p} />
      ))}
      {products.length < 1 && onReset && (
        <div className="f f1 cc pd g">
          <h2>No products...</h2>
          <button onClick={onReset}>Reset</button>
        </div>
      )}
    </ul>
  );
}
