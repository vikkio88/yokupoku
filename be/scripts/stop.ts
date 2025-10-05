import { LOCAL_API_URL } from "yokupoku-shared/config";

await fetch(`${LOCAL_API_URL}/stop`, {
  method: "POST",
  body: JSON.stringify({}),
})
  .then((res) => res.text())
  .then((body) => console.log(body))
  .catch(() => {
    console.log("sent kill switch to BE server");
  });
