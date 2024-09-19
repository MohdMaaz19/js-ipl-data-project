import deliveriesData from "../data/deliveriesData.json" assert {type:"json"};
import * as fs from "fs"

function bestBowlerBySuperOver(deliveriesData) {
  const bowlerStats = deliveriesData
    .filter(({ is_super_over }) => is_super_over === "1")
    .reduce((result, { bowler, noball_runs, wide_runs, total_runs }) => {
      if (!result[bowler]) {
        result[bowler] = { balls: 0, runs: 0 }
      }

      if (noball_runs === "0" && wide_runs === "0") {
        result[bowler].balls += 1
      }

      result[bowler].runs += Number(total_runs)

      return result
    }, {})

  const bestBowlerStats = Object.entries(bowlerStats)
    .map(([bowler, { balls, runs }]) => ({
      bowler,
      economyRate: runs / (balls / 6),
    }))
    .sort((a, b) => a.economyRate - b.economyRate)

  return bestBowlerStats[0]
}

const dataFromFunction = bestBowlerBySuperOver(deliveriesData);
const dataToString = JSON.stringify(dataFromFunction);
fs.writeFileSync("../public/output/9-best-economy-in-super-overs.json",dataToString);
