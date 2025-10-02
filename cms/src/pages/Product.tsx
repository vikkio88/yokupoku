import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Spinner from "../components/shared/spinner";
import { productsApi } from "../libs/api";
import { useState } from "react";
import {
  Edit as ProductEdit,
  View as ProductView,
} from "../components/products";

export default function Product() {
  const [isInViewMode, setIsInViewMode] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => productsApi.find(id!),
  });

  if (isLoading) {
    <Spinner />;
  }

  return (
    <>
      <button className="small" onClick={() => setIsInViewMode((t) => !t)}>
        {isInViewMode ? "Edit" : "View"}
      </button>
      {isInViewMode && data && <ProductView product={data?.result} />}
      {!isInViewMode && data && (
        <ProductEdit
          product={data?.result}
          onFinished={() => {
            setIsInViewMode(true);
            refetch();
          }}
        />
      )}
    </>
  );
}
