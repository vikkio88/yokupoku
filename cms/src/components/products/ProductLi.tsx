import { Product } from "yokupoku-shared";
import s from "./styles/product.module.css";
import { useNavigate } from "react-router";

type Props = {
  product: Product;
};

export default function ProductLi({ product }: Props) {
  const navigate = useNavigate();
  return (
    <li className={`${s.li} f r spb ic`}>
      <span>{product.name}</span>
      <span>
        <button
          className="small"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          🔎
        </button>
      </span>
    </li>
  );
}
