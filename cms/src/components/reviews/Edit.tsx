import { Review } from "yokupoku-shared";

import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { reviewsApi } from "../../libs/api";
import Spinner from "../shared/spinner";
import Form from "./Form";

type Props = {
  review: Review;
  onFinished: () => void;
};
export default function Edit({ review, onFinished }: Props) {
  const [isUpdating, setIsUpdating] = useState(false);

  const onSubmit: SubmitHandler<Review> = async (data) => {
    setIsUpdating(true);
    await reviewsApi.update(data.id, data);
    console.log({ data });
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

  return <Form review={review} onSubmit={onSubmit} />;
}
