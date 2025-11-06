import { marked } from "marked";
import { Review } from "yokupoku-shared";
import Tags from "../shared/Tags";
import styles from "./styles/view.module.css";

type Props = {
  review: Review;
};

export default function View({ review }: Props) {
  const pros = review.pros || "";
  const cons = review.cons || "";

  return (
    <div className={styles.view}>
      <h1>{review.product?.name}</h1>
      <h2>{review.title}</h2>
      <h3>{review.subtitle}</h3>

      <div className={styles.img}>
        <img src={review.image} alt={`Review Screenshot`} />
      </div>

      <article dangerouslySetInnerHTML={{ __html: marked(review.content) }} />

      <div className={styles.proscons}>
        <div className="pros">
          <h1>Pros 😍</h1>
          <ul>
            {pros.split(",").map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="cons">
          <h1>Cons 🤮</h1>
          <ul>
            {cons.split(",").map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.scores}>
        <div title="BSI 🥱">
          <h3>BSI</h3>
          <h1>{review.bsi}</h1>
        </div>

        <div title="Rating out of 100">
          <h3>Rating 🧐</h3>
          <h1>{review.rating}</h1>
        </div>

        <div title={`${review.suggested ? "YES!" : "NOPE!"}`}>
          <h3>Suggested</h3>
          <h1>{review.suggested ? "👍" : "👎"}</h1>
        </div>
      </div>

      <div className={styles.tags}>
        <Tags tagStrings={review.tags || ""} />
      </div>
    </div>
  );
}
