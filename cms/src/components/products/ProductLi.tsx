import { useNavigate } from "react-router";
import { Product } from "yokupoku-shared";
import s from "./styles/product.module.css";

type Props = {
  product: Product;
};

export default function ProductLi({ product }: Props) {
  const navigate = useNavigate();
  return (
    <li className={`${s.li} f r spb ic aic`}>
      <img
        src={product.image || ""}
        alt={product.name}
        style={{ height: "100px" }}
      />
      <span>{product.name}</span>
      <span>
        <button
          className="small n-btn"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          🔎
        </button>
      </span>
    </li>
  );
}
