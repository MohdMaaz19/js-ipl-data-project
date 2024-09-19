import matchesData from "../data/matchesData.json" assert{type:"json"};
import deliveriesData from "../data/deliveriesData.json" assert {type:"json"};
import * as fs from "fs"

function playerStrikeRatePerYear(matchesData) {
  // Step 1: Create a map to get the season for each match ID
  const matchSeasonMap = new Map(
    matchesData.map(({ id, season }) => [id, season])
  );

  // Step 2: Aggregate deliveries data
  const batsmanStats = deliveriesData.reduce((result, delivery) => {
    const season = matchSeasonMap.get(delivery.match_id);
    if (!season) return result;

    const batsman = delivery.batsman;
    const batsman_runs = Number(delivery.batsman_runs);
    const extra_runs = delivery.extra_runs;

    if (!result[batsman]) {
      result[batsman] = {};
    }
    
    if (!result[batsman][season]) {
      result[batsman][season] = { balls: 0, runs: 0 };
    }
    
    if (extra_runs === "0") result[batsman][season].balls++;
    result[batsman][season].runs += batsman_runs;
    
    return result;
  }, {});

  // Step 3: Calculate strike rates and format output
  const formattedOutput = Object.entries(batsmanStats).reduce((result, [batsman, seasonStats]) => {
    result[batsman] = Object.entries(seasonStats).reduce((accu, [season, { balls, runs }]) => {
      const strikeRate = balls > 0 ? (runs / balls) * 100 : 0;
      // Format to "SR 158.57" for output
      accu[`Year ${season}`] = `SR ${strikeRate.toFixed(2)}`;
      return accu;
    }, {});
    return result;
  }, {});

  // Return the final formatted output
  return formattedOutput;
}


const dataFromFunction =  playerStrikeRatePerYear(matchesData);
const dataToString = JSON.stringify(dataFromFunction);
fs.writeFileSync("../public/output/7-batsman-strike-per-season.json", dataToString);

