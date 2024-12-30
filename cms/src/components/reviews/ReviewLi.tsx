import { ReviewLi as ListItem } from "yokupoku-shared";
import s from "./styles/reviewLi.module.css";
import { useNavigate } from "react-router";

type Props = {
  review: ListItem;
};
export default function ReviewLi({ review }: Props) {
  const navigate = useNavigate();
  return (
    <li className={`${s.li} f r spb ic`}>
      <p className="f c">
        <h3>{review.title}</h3>
        <span>{review.product.name}</span>
      </p>
      <span>
        <button
          className="small"
          onClick={() => navigate(`/reviews/${review.id}`)}
        >
          🔎
        </button>
      </span>
    </li>
  );
}
