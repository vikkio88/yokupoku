import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Edit as ProductEdit,
  View as ProductView,
} from "../components/products";
import Spinner from "../components/shared/spinner";
import { productsApi } from "../libs/api";

export default function Product() {
  const navigate = useNavigate();
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
      <div className="row">
        <button onClick={() => setIsInViewMode((t) => !t)}>
          {isInViewMode ? "Edit" : "View"}
        </button>
        <button onClick={() => navigate(`/products/${id}/reviews/new`)}>
          New Review
        </button>
      </div>
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
