import { useForm } from "react-hook-form";
import type { Review } from "yokupoku-shared";
import s from "./styles/edit.module.css";
import { reviewValidators } from "./validators/review";

type Props = {
  review: Review;
  onSubmit: (data: Review) => void;
};

export default function Form({ review, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Review>();

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <label>
        Id:
        <input
          {...register("id", reviewValidators.id)}
          type="text"
          defaultValue={review.id}
          readOnly
        />
      </label>

      <label>
        Slug:
        <input
          {...register("slug", reviewValidators.slug)}
          aria-invalid={errors.slug ? "true" : "false"}
          type="text"
          defaultValue={review.slug}
        />
        {errors.slug && <span className="error">{errors.slug.message}</span>}
      </label>

      <label>
        Product Id:
        <input
          {...register("productId", reviewValidators.productId)}
          aria-invalid={errors.productId ? "true" : "false"}
          type="text"
          defaultValue={review.productId || ""}
        />
        {errors.productId && (
          <span className="error">{errors.productId.message}</span>
        )}
      </label>

      <label>
        Device Id:
        <input
          {...register("deviceId", reviewValidators.deviceId)}
          aria-invalid={errors.deviceId ? "true" : "false"}
          type="text"
          defaultValue={review.deviceId || ""}
        />
        {errors.deviceId && (
          <span className="error">{errors.deviceId.message}</span>
        )}
      </label>

      <label>
        Title:
        <input
          {...register("title", reviewValidators.title)}
          aria-invalid={errors.title ? "true" : "false"}
          type="text"
          defaultValue={review.title}
        />
        {errors.title && <span className="error">{errors.title.message}</span>}
      </label>

      <label>
        Subtitle:
        <input
          {...register("subtitle", reviewValidators.subtitle)}
          aria-invalid={errors.subtitle ? "true" : "false"}
          type="text"
          defaultValue={review.subtitle}
        />
        {errors.subtitle && (
          <span className="error">{errors.subtitle.message}</span>
        )}
      </label>

      <label>
        Image:
        <input
          {...register("image", reviewValidators.image)}
          aria-invalid={errors.image ? "true" : "false"}
          type="text"
          defaultValue={review.image}
        />
        {errors.image && <span className="error">{errors.image.message}</span>}
      </label>

      <label>
        Content:
        <textarea
          {...register("content", reviewValidators.content)}
          aria-invalid={errors.content ? "true" : "false"}
          defaultValue={review.content}
        />
        {errors.content && (
          <span className="error">{errors.content.message}</span>
        )}
      </label>

      <label>
        Pros:
        <textarea
          {...register("pros", reviewValidators.pros)}
          aria-invalid={errors.pros ? "true" : "false"}
          defaultValue={review.pros || ""}
        />
        {errors.pros && <span className="error">{errors.pros.message}</span>}
      </label>

      <label>
        Cons:
        <textarea
          {...register("cons", reviewValidators.cons)}
          aria-invalid={errors.cons ? "true" : "false"}
          defaultValue={review.cons || ""}
        />
        {errors.cons && <span className="error">{errors.cons.message}</span>}
      </label>

      <label>
        Tags:
        <input
          {...register("tags", reviewValidators.tags)}
          aria-invalid={errors.tags ? "true" : "false"}
          type="text"
          defaultValue={review.tags || ""}
        />
        {errors.tags && <span className="error">{errors.tags.message}</span>}
      </label>

      <label>
        Rating:
        <input
          {...register("rating", reviewValidators.rating)}
          aria-invalid={errors.rating ? "true" : "false"}
          type="number"
          step="1"
          min="0"
          max="100"
          defaultValue={review.rating ?? ""}
        />
        {errors.rating && (
          <span className="error">{errors.rating.message}</span>
        )}
      </label>

      <label>
        BSI:
        <input
          {...register("bsi", reviewValidators.bsi)}
          aria-invalid={errors.bsi ? "true" : "false"}
          type="number"
          step="0.1"
          defaultValue={review.bsi ?? ""}
        />
        {errors.bsi && <span className="error">{errors.bsi.message}</span>}
      </label>

      <label>
        Suggested:
        <input
          {...register("suggested")}
          type="checkbox"
          defaultChecked={review.suggested}
        />
      </label>

      <label>
        Spoiler:
        <input
          {...register("spoiler")}
          type="checkbox"
          defaultChecked={review.spoiler}
        />
      </label>

      <label>
        Published:
        <input
          {...register("published")}
          type="checkbox"
          defaultChecked={review.published}
        />
      </label>

      <label>
        Created At:
        <input
          {...register("createdAt")}
          type="text"
          defaultValue={
            review.createdAt
              ? new Date(review.createdAt).toLocaleDateString()
              : ""
          }
          readOnly
        />
      </label>

      <label>
        Updated At:
        <input
          {...register("updatedAt")}
          type="text"
          defaultValue={
            review.updatedAt
              ? new Date(review.updatedAt).toLocaleDateString()
              : ""
          }
          readOnly
        />
      </label>

      <div className="f rc">
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
