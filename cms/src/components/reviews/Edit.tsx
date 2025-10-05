import { Review } from "yokupoku-shared";

type Props = {
  review: Review;
  onFinished: () => void;
};
export default function Edit({ review }: Props) {
  return <h3>{review.title}</h3>;
}
