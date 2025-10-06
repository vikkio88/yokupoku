import { ReviewLi } from "yokupoku-shared";
import Li  from "./ReviewLi";

type Props = {
  reviews: ReviewLi[];
};
export default function ReviewUl({ reviews }: Props) {
  return (
    <ul>
      {reviews.map((r) => (
        <Li key={r.id} review={r} />
      ))}
    </ul>
  );
}
