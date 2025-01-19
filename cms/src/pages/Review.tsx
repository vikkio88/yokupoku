import { useParams } from "react-router";

export default function Review() {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <h2>Review</h2>
      <h1>{id}</h1>
    </>
  );
}
