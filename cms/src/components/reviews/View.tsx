import { Link } from "react-router";
import { Review } from "yokupoku-shared";
import { CSV } from "../shared/CSV";

type Props = {
  review: Review;
};
export default function View({ review }: Props) {
  return (
    <>
      <h4>
        <Link to={`/products/${review.product?.id}`}>
          {review.product?.name}
        </Link>
      </h4>
      <h3>{review.title}</h3>
      <h4>{review.subtitle}</h4>
      <div>{review.slug}</div>
      <div>
        <img
          style={{ height: "300px" }}
          src={review.image}
          alt={review.title}
        />
      </div>
      <div>{review.content}</div>
      <div>
        <CSV title="Tags" values={review.tags} />
      </div>
      <div>
        <CSV title="Pros" values={review.pros} />
        <CSV title="Cons" values={review.cons} />
      </div>
      <div className="row">
        <div>{review.rating}</div>
        <div>{review.bsi}</div>
        <div>{review.suggested}</div>
      </div>

      <div className="row">
        <div>{review.spoiler}</div>
        <div>{review.suggested}</div>
        <div>{review.published}</div>
      </div>

      <div className="row">
        <div>{review.createdAt.toLocaleString()}</div>
        <div>{review.updatedAt.toLocaleString()}</div>
      </div>
    </>
  );
}
