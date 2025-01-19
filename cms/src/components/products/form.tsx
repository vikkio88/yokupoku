import { useForm } from "react-hook-form";
import type { Product, MetaProduct } from "yokupoku-shared";
import s from "./styles/edit.module.css";
import { productValidators } from "./validators/product";
type Props = {
  product: Product;
  onSubmit: (data: MetaProduct) => void;
};

export default function Form({ product, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MetaProduct>();
  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <label>
        Id:
        <input
          {...register("id", product.id ? productValidators.id : {})}
          type="text"
          name="id"
          defaultValue={product.id}
          readOnly
        />
      </label>
      <label>
        Type:
        <input
          {...register("type", productValidators.type)}
          aria-invalid={errors.type ? "true" : "false"}
          type="text"
          name="type"
          defaultValue={product.type}
        />
      </label>
      {errors.type && <span className="error">{errors.type.message}</span>}
      <label>
        Meta:
        <textarea
          {...register("meta", productValidators.meta)}
          aria-invalid={errors.meta ? "true" : "false"}
          name="meta"
          defaultValue={JSON.stringify(product.meta, null, 2)}
        />
      </label>
      {errors.meta && <span className="error">{errors.meta.message}</span>}
      <label>
        Name:
        <input
          {...register("name", productValidators.name)}
          aria-invalid={errors.name ? "true" : "false"}
          type="text"
          name="name"
          defaultValue={product.name}
        />
      </label>
      {errors.name && <span className="error">{errors.name.message}</span>}
      <label>
        Genre:
        <input
          {...register("genre", productValidators.genre)}
          aria-invalid={errors.genre ? "true" : "false"}
          type="text"
          name="genre"
          defaultValue={product.genre || ""}
        />
        {errors.genre && <span className="error">{errors.genre.message}</span>}
      </label>
      <label>
        Tags:
        <input
          {...register("tags", productValidators.tags)}
          aria-invalid={errors.tags ? "true" : "false"}
          type="text"
          name="tags"
          defaultValue={product.tags || ""}
        />
      </label>
      {errors.tags && <span className="error">{errors.tags.message}</span>}
      <label>
        Links:
        <input
          {...register("links", productValidators.links)}
          aria-invalid={errors.links ? "true" : "false"}
          type="text"
          name="links"
          defaultValue={product.links || ""}
        />
      </label>
      {errors.links && <span className="error">{errors.links.message}</span>}
      <label>
        Slug:
        <input
          {...register("slug", productValidators.slug)}
          aria-invalid={errors.slug ? "true" : "false"}
          type="text"
          name="slug"
          defaultValue={product.slug}
        />
        {errors.slug && <span className="error">{errors.slug.message}</span>}
      </label>
      <label>
        Image:
        <input
          {...register("image", productValidators.image)}
          aria-invalid={errors.image ? "true" : "false"}
          type="text"
          name="image"
          defaultValue={product.image || ""}
        />
        {errors.image && <span className="error">{errors.image.message}</span>}
      </label>
      <label>
        Released:
        <input
          {...register("released")}
          aria-invalid={errors.released ? "true" : "false"}
          type="date"
          name="released"
          defaultValue={
            product.released
              ? new Date(product.released).toLocaleDateString()
              : ""
          }
        />
      </label>
      <label>
        Consumed:
        <input
          {...register("consumed")}
          aria-invalid={errors.consumed ? "true" : "false"}
          type="date"
          name="consumed"
          defaultValue={
            product.consumed
              ? new Date(product.consumed).toLocaleDateString()
              : ""
          }
        />
      </label>
      <label>
        Created At:
        <input
          {...register("createdAt")}
          aria-invalid={errors.createdAt ? "true" : "false"}
          type="text"
          name="createdAt"
          defaultValue={
            product.createdAt
              ? new Date(product.createdAt).toLocaleDateString()
              : ""
          }
          readOnly
        />
      </label>
      <label>
        Updated At:
        <input
          {...register("updatedAt")}
          aria-invalid={errors.updatedAt ? "true" : "false"}
          type="text"
          name="updatedAt"
          defaultValue={
            product.updatedAt
              ? new Date(product.updatedAt).toLocaleDateString()
              : ""
          }
          readOnly
        />
      </label>
      <label>
        Notes:
        <textarea
          {...register("notes")}
          aria-invalid={errors.notes ? "true" : "false"}
          name="notes"
          defaultValue={product.notes || ""}
        />
      </label>
      <div className="f rc">
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
