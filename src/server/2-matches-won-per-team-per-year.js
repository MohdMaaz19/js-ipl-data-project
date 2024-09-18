import matchesData from "../data/matchesData.json" assert {type:"json"};

import * as fs from "fs";

function yearwiseMatchesWonPerTeam(matchesData){
	const yearwiseMatchesWonPerTeam = matchesData.reduce((acc,{season,winner})=>{
      
      if(!acc[season]){
          acc[season] = {};
      }
      
      if(!acc[season][winner]){
          acc[season][winner]=1
      }else{
          acc[season][winner]++
      }
      return acc;
	},{})
	return yearwiseMatchesWonPerTeam;
}

const dataFromFunction = yearwiseMatchesWonPerTeam(matchesData);
const dataToString = JSON.stringify(dataFromFunction);

fs.writeFileSync("../public/output/2-matches-won-per-team.json",dataToString);