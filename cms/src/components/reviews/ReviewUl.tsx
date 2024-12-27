import { ReviewLi } from "yokupoku-shared";
import s from "./styles/reviewLi.module.css";
import Li  from "./ReviewLi";

type Props = {
  reviews: ReviewLi[];
};
export default function ReviewUl({ reviews }: Props) {
  return (
    <ul className={s.ul}>
      {reviews.map((r) => (
        <Li key={r.id} review={r} />
      ))}
    </ul>
  );
}
