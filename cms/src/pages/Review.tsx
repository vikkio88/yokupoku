import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Edit as ReviewEdit, View as ReviewView } from "../components/reviews";
import Spinner from "../components/shared/spinner";
import { reviewsApi } from "../libs/api";

export default function Review() {
  const [isInViewMode, setIsInViewMode] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["review", id],
    queryFn: async () => reviewsApi.find(id!),
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteReview = useMutation({
    mutationFn: () => reviewsApi.delete(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      navigate("/reviews");
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="row spb">
        <button className="small" onClick={() => setIsInViewMode((t) => !t)}>
          {isInViewMode ? "Edit" : "View"}
        </button>
        <div>
          <button
            className="small"
            onClick={() => deleteReview.mutate()}
            disabled={deleteReview.isPending}
          >
            {deleteReview.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

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
