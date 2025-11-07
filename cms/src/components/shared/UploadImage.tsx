import { useMutation } from "@tanstack/react-query";
import { uploader } from "../../libs/api";

type Props = {
  onSuccess: (url: string) => void;
};

export default function UploadImage({ onSuccess }: Props) {
  const mutation = useMutation<
    { url: string }, // TData
    Error, // TError
    File // TVariables
  >({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploader.upload(formData);
      if (!res.ok) throw new Error("Upload failed");
      return (await res.json()) as { url: string };
    },
    onSuccess: (data) => {
      onSuccess(data.url);
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "*/*";

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      mutation.mutate(file);
    };

    input.click();
  };

  return (
    <button onClick={handleClick} disabled={mutation.status === "pending"}>
      {mutation.status === "pending" ? "Uploading..." : "Upload Image"}
    </button>
  );
}
