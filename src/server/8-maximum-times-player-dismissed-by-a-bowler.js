import deliveriesData from "../data/deliveriesData.json" assert{type:"json"};
import * as fs from "fs";

function highestDismissalCount(deliveriesData) {

  const dismissalCounts = deliveriesData.reduce((result, { batsman, bowler, dismissal_kind }) => {
    if (dismissal_kind) {
      if (!result[bowler]) {
        result[bowler] = {};
      }
      
      if (!result[bowler][batsman]) {
        result[bowler][batsman] = 0;
      }
      
      result[bowler][batsman]++;
    }
    
    return result;
  }, {});


  let maxDismissals = 0;
  let mostFrequentDismissal = { bowler: null, batsman: null };

  Object.entries(dismissalCounts).forEach(([bowler, batsmanStats]) => {
    Object.entries(batsmanStats).forEach(([batsman, count]) => {
      if (count > maxDismissals) {
        maxDismissals = count;
        mostFrequentDismissal = { bowler, batsman };
      }
    });
  });

  return { mostFrequentDismissal, maxDismissals };
}


const dataFromFunction = highestDismissalCount(deliveriesData);
const dataToString = JSON.stringify(dataFromFunction);
fs.writeFileSync("../public/output/8-maximum-times-player-dismissed-by-a-bowler.json",dataToString);