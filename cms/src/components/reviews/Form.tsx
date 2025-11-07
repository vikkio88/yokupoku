import { useForm } from "react-hook-form";
import type { Review } from "yokupoku-shared";
import UploadImage from "../shared/UploadImage";
import s from "./styles/edit.module.css";
import { reviewValidators } from "./validators/review";

type Props = {
  review: Partial<Review>;
  onSubmit: (data: Review) => void;
};

export default function Form({ review, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<Review>();
  const imageUrl = watch("image");

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className="row spb">
        <label>
          Id:
          <input
            {...register("id", reviewValidators.id)}
            type="text"
            defaultValue={review.id}
            placeholder="This will be generated on creation"
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
            placeholder="This will be generated on creation"
          />
          {errors.slug && <span className="error">{errors.slug.message}</span>}
        </label>
      </div>
      <label>
        Product Id:
        <input
          {...register("productId", reviewValidators.productId)}
          aria-invalid={errors.productId ? "true" : "false"}
          type="text"
          defaultValue={review.productId || ""}
          readOnly
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
        <UploadImage onSuccess={(url) => setValue("image", url)} />
        {errors.image && <span className="error">{errors.image.message}</span>}
      </label>
      <img src={imageUrl} alt="Missing Image" style={{ width: "200px" }} />

      <label>Content:</label>
      <textarea
        {...register("content", reviewValidators.content)}
        aria-invalid={errors.content ? "true" : "false"}
        defaultValue={review.content}
      />
      {errors.content && (
        <span className="error">{errors.content.message}</span>
      )}
      <div className="row spb">
        <label>
          Pros:
          <input
            {...register("pros", reviewValidators.pros)}
            type="text"
            aria-invalid={errors.pros ? "true" : "false"}
            defaultValue={review.pros || ""}
          />
          {errors.pros && <span className="error">{errors.pros.message}</span>}
        </label>

        <label>
          Cons:
          <input
            {...register("cons", reviewValidators.cons)}
            type="text"
            aria-invalid={errors.cons ? "true" : "false"}
            defaultValue={review.cons || ""}
          />
          {errors.cons && <span className="error">{errors.cons.message}</span>}
        </label>
      </div>

      <div className="row">
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
            step="1"
            min="0"
            max="100"
            defaultValue={review.bsi ?? ""}
          />
          {errors.bsi && <span className="error">{errors.bsi.message}</span>}
        </label>
      </div>
      <div className="row spb">
        <label>
          Suggested:
          <input
            {...register("suggested")}
            type="checkbox"
            style={{ transform: "scale(2)" }}
            defaultChecked={review.suggested}
          />
        </label>
        <label>
          Published:
          <input
            {...register("published")}
            type="checkbox"
            style={{ transform: "scale(3)" }}
            defaultChecked={review.published}
          />
        </label>
      </div>
      <div className="row spb">
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
          Has Spoilers:
          <input
            {...register("spoiler")}
            type="checkbox"
            defaultChecked={review.spoiler}
          />
        </label>
      </div>
      <div className="row spb">
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
      </div>

      <div className="f rc">
        <button type="submit" className="big">
          Save
        </button>
      </div>
    </form>
  );
}
