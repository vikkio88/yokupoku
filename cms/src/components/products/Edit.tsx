import type { Meta, MetaProduct, Product } from "yokupoku-shared";

import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { productsApi } from "../../libs/api";
import Spinner from "../shared/spinner";
import Form from "./Form";

type Props = {
  product: Product;
  onFinished: () => void;
};

export default function Edit({ product, onFinished }: Props) {
  const [isUpdating, setIsUpdating] = useState(false);

  const onSubmit: SubmitHandler<MetaProduct> = async (data) => {
    const product: Product = { ...data, meta: JSON.parse(data.meta) as Meta };
    setIsUpdating(true);
    const res = await productsApi.update(product);
    console.log(res);
    setIsUpdating(false);
    onFinished();
  };
  if (isUpdating) {
    return (
      <div className="f cc aic">
        <Spinner />
      </div>
    );
  }

  return <Form product={product} onSubmit={onSubmit} />;
}
