import { ReviewLi as ListItem } from "yokupoku-shared";
import s from "./styles/reviewLi.module.css";

type Props = {
  review: ListItem;
};
export default function ReviewLi({ review }: Props) {
  return <li className={s.li}>{review.title}</li>;
}
