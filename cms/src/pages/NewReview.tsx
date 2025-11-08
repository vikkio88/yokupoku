import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import Form from "../components/reviews/Form";
import Spinner from "../components/shared/spinner";
import { productsApi, reviewsApi } from "../libs/api";

export default function NewReview() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => productsApi.find(productId!),
  });
  if (isLoading) {
    <Spinner />;
  }

  if (data) {
    return (
      <>
        <div className="ta-c">
          <strong>New Review</strong>
          <h3>{data.result.name}</h3>
        </div>
        <Form
          review={{ productId: productId! }}
          onSubmit={async (data) => {
            try {
              const { result } = (await reviewsApi.create(data)) as unknown as {
                result: {
                  id: string;
                };
              };
              navigate(`/reviews/${result.id}`);
            } catch (err) {
              console.error(err);
            }
          }}
        />
      </>
    );
  }
}
