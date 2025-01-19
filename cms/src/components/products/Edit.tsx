import type { Meta, Product, MetaProduct } from "yokupoku-shared";

import { SubmitHandler } from "react-hook-form";
import { productsApi } from "../../libs/api";
import { useState } from "react";
import Spinner from "../shared/spinner";
import Form from "./form";

type Props = {
  product: Product;
};


export default function Edit({ product }: Props) {
  const [isUpdating, setIsUpdating] = useState(false);
  
  const onSubmit: SubmitHandler<MetaProduct> = async (data) => {
    const product: Product = { ...data, meta: JSON.parse(data.meta) as Meta };
    setIsUpdating(true);
    const res = await productsApi.update(product);
    console.log(res);
    setIsUpdating(false);
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
