import { Product } from "yokupoku-shared/types";
// import s from "./styles/view.module.css";

type Props = {
  product: Product;
};
export default function View({ product }: Props) {
  return <h3>{product.name}</h3>;
}
