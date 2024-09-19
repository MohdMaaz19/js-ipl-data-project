import deliveriesData from "../data/deliveriesData.json" assert {type:"json"};
import matchesData from "../data/matchesData.json" assert {type:"json"};
import * as fs from "fs" 

function extrasPerTeamIn2016(matchesData){

	const matchIds2016 = matchesData.filter(match=>match.season==='2016').map(match=>match.id);

	const extraRunsPerTeam = deliveriesData.reduce((accumulator,delivery)=>{

		if(matchIds2016.includes(delivery.match_id)){

			const team  = delivery.bowling_team;
			const extraRuns = parseInt(delivery.extra_runs);

			if(accumulator[team]){
				accumulator[team] +=extraRuns;
			}else{
				accumulator[team] = extraRuns;
			}
		}

		return accumulator;
	},{})

	return extraRunsPerTeam;

}

const dataFromFunction =  extrasPerTeamIn2016(matchesData);

const dataToString = JSON.stringify(dataFromFunction);

fs.writeFileSync("../public/output/3-extras-per-team-in-2016.js",dataToString)

