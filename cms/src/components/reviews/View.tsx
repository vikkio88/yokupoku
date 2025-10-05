import { Review } from "yokupoku-shared";

type Props = {
  review: Review;
};
export default function View({ review }: Props) {
  return <h3>{review.title}</h3>;
}
