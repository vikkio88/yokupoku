import { useState } from "react";
import UploadImage from "../components/shared/UploadImage";

export default function ImageUploader() {
  const [value, setValue] = useState("");
  return (
    <div className="f c g">
      <input
        type="text"
        value={value}
        placeholder="Here there will be the image result url..."
      />
      <UploadImage onSuccess={(img) => setValue(img)} />
    </div>
  );
}
