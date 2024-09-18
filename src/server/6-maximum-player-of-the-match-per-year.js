import matchesData from "../data/matchesData.json" assert {type:"json"};
import * as fs from "fs";

function playerOfTheMatchListYearwise(matchesData){
	const playerOfTheMatchListYearwise = matchesData.reduce((acc,{player_of_match,season})=>{

		if(!acc[season]){
			acc[season]={};
		}

		if(!acc[season][player_of_match]){
			acc[season][player_of_match] = 0;
		}

		acc[season][player_of_match]++;

		return acc;
	},{})

	// return playerOfTheMatchListYearwise

	const maxPlayerOfTheMatchYearwise = Object.keys(playerOfTheMatchListYearwise).reduce((acc,season)=>{

		const players = playerOfTheMatchListYearwise[season];

		let playerName = "";
		let awardsCount = 0;

		for(const player in players){
			if(players[player]>awardsCount){
				playerName = player;
				awardsCount = players[player];
			}
		}

		acc[season] = {player: playerName, awardsWon: awardsCount}

		return acc

	},{});

	return maxPlayerOfTheMatchYearwise
}

const dataFromFunction =  playerOfTheMatchListYearwise(matchesData);
const dataToString = JSON.stringify(dataFromFunction);

fs.writeFileSync("../public/output/6-maximum-player-of-the-match-per-year.js",dataToString)

 