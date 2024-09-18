import matchesData from "../data/matchesData.json" assert {type : "json"}
import * as fs from "fs"

function matchesPerYear(matchesData) {
    const matchesPerYear = matchesData.reduce((acc, match) => {
        const season = match.season;

        if (!acc[season]) {
            acc[season] = 0;
        }
        acc[season]++;
        return acc;
    }, {});

    return matchesPerYear; 
}

const matchCountBySeason = matchesPerYear(matchesData);

const matchDataToString = JSON.stringify(matchCountBySeason)

fs.writeFileSync(
    "../public/output/1-matches-per-year.json",
    matchDataToString
);
