import { Product } from "yokupoku-shared/types";
import s from "./styles/edit.module.css";

type Props = {
  product: Product;
};
export default function Edit({ product }: Props) {
  return (
    <form
      className={s.form}
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e);
      }}
    >
      <label>
        Id:
        <input type="text" name="id" defaultValue={product.id} readOnly />
      </label>
      <label>
        Type:
        <input type="text" name="type" defaultValue={product.type} />
      </label>
      <label>
        Meta:
        <textarea
          name="meta"
          defaultValue={JSON.stringify(product.meta, null, 2)}
        />
      </label>
      <label>
        Name:
        <input type="text" name="name" defaultValue={product.name} />
      </label>
      <label>
        Genre:
        <input type="text" name="genre" defaultValue={product.genre || ""} />
      </label>
      <label>
        Tags:
        <input type="text" name="tags" defaultValue={product.tags || ""} />
      </label>
      <label>
        Links:
        <input type="text" name="links" defaultValue={product.links || ""} />
      </label>
      <label>
        Notes:
        <textarea name="notes" defaultValue={product.notes || ""} />
      </label>
      <label>
        Slug:
        <input type="text" name="slug" defaultValue={product.slug} />
      </label>
      <label>
        Image:
        <input type="text" name="image" defaultValue={product.image || ""} />
      </label>
      <label>
        Released:
        <input
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
      <button type="submit">Save</button>
    </form>
  );
}
