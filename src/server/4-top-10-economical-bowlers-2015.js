import matchesData from "../data/matchesData.json" assert {type:"json"};
import deliveriesData from "../data/deliveriesData.json" assert {type:"json"};
import * as fs from "fs";

function topTenEcoBowler(matchesData){

	const matchIds2015 = matchesData.filter(match=>match.season==="2015").map(match=>match.id);

	const deliveriesByBowler = deliveriesData.reduce((accumulator,delivery)=>{

		if(matchIds2015.includes(delivery.match_id)){

			const bowler = delivery.bowler;
			const runsGiven = delivery.total_runs

			if(!accumulator[bowler]){

				accumulator[bowler]={
					runsGiven:0,
					ballsBowled:0,
					economyRate:0
				};

			}

			accumulator[bowler].runsGiven += parseInt(runsGiven);
			

			if (delivery.wide_runs === "0" && delivery.noball_runs === "0"){
				accumulator[bowler].ballsBowled++; 
				accumulator[bowler].economyRate = accumulator[bowler].runsGiven/accumulator[bowler].ballsBowled*6;
			}


		}

		return accumulator;

	},{})

	const bowlersArray = Object.entries(deliveriesByBowler);

	const sortedBowlers = bowlersArray.sort((a,b)=>a[1].economyRate-b[1].economyRate);

	const topTenEcoBowler = sortedBowlers.slice(0,10);

	const result = Object.fromEntries(topTenEcoBowler);

	return result;
}


const dataFromFunction = topTenEcoBowler(matchesData);

const dataToString = JSON.stringify(dataFromFunction);

fs.writeFileSync("../public/output/4-top-economical-bowlers-2105.json",dataToString)
