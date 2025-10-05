import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Spinner from "../components/shared/spinner";
import { reviewsApi } from "../libs/api";
import {
  Edit as ReviewEdit,
  View as ReviewView,
} from "../components/reviews";

export default function Review() {
  const [isInViewMode, setIsInViewMode] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["review", id],
    queryFn: async () => reviewsApi.find(id!),
  });

  if (isLoading) return <Spinner />;

  return (
    <>
      <button className="small" onClick={() => setIsInViewMode((t) => !t)}>
        {isInViewMode ? "Edit" : "View"}
      </button>

      {isInViewMode && data && <ReviewView review={data?.result} />}
      {!isInViewMode && data && (
        <ReviewEdit
          review={data?.result}
          onFinished={() => {
            setIsInViewMode(true);
            refetch();
          }}
        />
      )}
    </>
  );
}
