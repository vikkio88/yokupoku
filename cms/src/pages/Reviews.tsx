import { useQuery } from "@tanstack/react-query";
import { reviewsApi } from "../libs/api";
import { ReviewUl } from "../components/reviews";
import Spinner from "../components/shared/spinner";

export default function Reviews() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"], //page, perPage, searchValue],
    queryFn: async () => reviewsApi.getAll(),
  });

  return (
    <>
      <div className="f r cc">
        <h1>Reviews</h1>
      </div>
      {isLoading && <Spinner />}
      {!isLoading && data && <ReviewUl reviews={data.result} />}
    </>
  );
}
