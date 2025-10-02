await fetch("http://localhost:3001/stop", {
  method: "POST",
  body: JSON.stringify({}),
})
  .then((res) => res.text())
  .then((body) => console.log(body))
  .catch(() => {
    console.log("sent kill switch to BE server");
  });
