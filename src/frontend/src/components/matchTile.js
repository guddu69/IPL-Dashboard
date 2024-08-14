import "../styling/matchTile.css";
import React, { useState } from "react";

function MatchTile(props) {

  const teams = props.teams;
  const [selectedTeam1, setSelectedTeam1] = useState(" ");
  const [selectedTeam2, setSelectedTeam2] = useState(" ");

  if (!teams) {
    return "Data Not Fetched";
  }

  const handleButton = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const teamLink = `/#/match/${selectedTeam1}/${selectedTeam2}`; // # -> HashRouter
    window.location.href = teamLink;
  };

  return (
    <div className="matchTile">

        <label for="team1" className="space">Choose team 1: </label>

        <select className="space" name="team1" id="team1" onChange={(event) => setSelectedTeam1(event.target.value)} >
          <option >select</option>
          {teams.map((team) => (
            <option key={team.teamName} value={team.teamName}>{team.teamName}</option>
          ))}
        </select>

        <label for="team2" className="space">Choose team 2: </label>

        <select className="space" name="team2"  id="team2" onChange={(event) => setSelectedTeam2(event.target.value)} >
          <option>select</option>
          {teams.filter((team) => team.teamName !== selectedTeam1).map((team) => (
              <option key={team.teamName} value={team.teamName}>{team.teamName}</option>
            ))}
        </select>

        <button type="submit" onClick={handleButton} className="space">Submit</button>

    </div>
  );
}

export default MatchTile;
