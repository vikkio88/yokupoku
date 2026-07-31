import path from "path";

export const imageUploader = async (filePath: string) => {
  try {
    const file = Bun.file(filePath);
    const fileName = path.basename(filePath);

    if (!(await file.exists())) {
      console.error(`Error: File not found at ${filePath}`);
      return null;
    }

    const formData = new FormData();
    formData.append("reqtype", "fileupload");
    formData.append("fileToUpload", file, fileName);

    const resp = await fetch("https://catbox.moe/user/api.php", {
      method: "POST",
      body: formData,
    });

    if (resp.ok) {
      const url = await resp.text();
      console.log("Upload result: ", url);
      return url.trim();
    }

    console.error(`Error uploading to Catbox. HTTP Status: ${resp.status}`);
    return null;
  } catch (error) {
    console.error(`Error while uploading image: ${error}`);
    return null;
  }
};

if (import.meta.main) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error(`Usage: bun ${process.argv[1]} <path-to-image>`);
    process.exit(1);
  }

  const imagePath = args[0];

  imageUploader(imagePath).then((url) => {
    if (url) {
      console.log(`Upload successful! Image URL: ${url}`);
    } else {
      console.log("Upload failed.");
      process.exit(1);
    }
  });
}
