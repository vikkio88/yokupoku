import { Review } from "yokupoku-shared";

import Spinner from "../shared/spinner";
import Form from "./Form";
import { SubmitHandler } from "react-hook-form";
import { useState } from "react";

type Props = {
  review: Review;
  onFinished: () => void;
};
export default function Edit({ review, onFinished }: Props) {
  const [isUpdating, setIsUpdating] = useState(false);

  const onSubmit: SubmitHandler<Review> = async (data) => {
    setIsUpdating(true);
    // const res = await reviewsApi.update(data);
    // console.log(res);
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
