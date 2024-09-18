import csvParser from "csv-parser";
import * as fs from "fs";

const results = [];

//Convert matches.csv to JSON format
fs.createReadStream("./src/data/matches.csv")
  .pipe(csvParser())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    // Once all data has been parsed, write to file
    fs.writeFileSync("./src/data/matchesData.json", JSON.stringify(results, null, 2));
    console.log("CSV file successfully converted to JSON!");
  })
  .on("error", (err) => {
    console.error("Error reading or writing file:", err);
  });


//Convert deliveries.csv to JSON format
fs.createReadStream("./src/data/deliveries.csv")
    .pipe(csvParser())
    .on("data", (data) => results.push(data))
    .on("end", () => {
    // Once all data has been parsed, write to file
    fs.writeFileSync("./src/data/deliveriesData.json", JSON.stringify(results, null, 2));
    console.log("CSV file successfully converted to JSON!");
    })
    .on("error", (err) => {
    console.error("Error reading or writing file:", err);
    });