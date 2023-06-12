import express from "express";
import fs from "fs";

const app = express();
const PORT = 3001;

let visitorCount = 0;

app.get("/visit", (req, res) => {
  visitorCount++;
  res.send("Besucher gezählt!");
});

app.get("/visited", (req, res) => {
  res.send(`Bisher haben uns ${visitorCount} Besucher besucht!`);
});

// Level 2
//Lesen der Besucherzahlen beim Serverstart

fs.readFile("visitorCount.txt", "utf8", (err, data) => {
  if (!err && data) {
    visitorCount = parseInt(data);
  }
});

// Speichern der Besucherzaheln beim Serverstopp
process.on("SIGINT", () => {
  fs.writeFile("visitorCount.txt", visitorCount.toString(), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
    process.exit();
  });
});

// Level 3
app.get("/api/visited", (req, res) => {
  const data = {
    visitors: visitorCount,
  };
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server ist am laufen auf Port ${PORT}`);
});
