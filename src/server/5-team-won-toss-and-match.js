import matchesData from "../data/matchesData.json" assert {type:"json"};
import * as fs from "fs"

function teamWonTossAndMatch(matchesData){
	const teamWonTossAndMatch = matchesData.filter(match=>match.toss_winner===match.winner).reduce((acc,{winner})=>{

		if(!acc[winner]){
			acc[winner]=0
		}
		acc[winner]++;

		return acc;
	},{})
	return teamWonTossAndMatch;
}

const dataFromFunction = teamWonTossAndMatch(matchesData);
const dataToString = JSON.stringify(dataFromFunction);

fs.writeFileSync("../public/output/5-team-won-toss-and-match.js",dataToString);


