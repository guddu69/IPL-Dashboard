import "../styling/teamTile.css";
import React, { useState } from "react";

function TeamTile(props) {
  const teams = props.teams;
  const [selectedTeam, setSelectedTeam] = useState(null);

  if (!teams) {
    return "Data Not Fetched";
  }

  const handleButton = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const teamLink = `/#/team/${selectedTeam}/`; // # (HashRouter) so that it go on react server and not on backend api call
    window.location.href = teamLink;
  };

  return (
    <div className="teamTile">

        <label for="team" className="space">Choose team: </label>

        <select className="space" name="team" id="team" onChange={(event) => setSelectedTeam(event.target.value)}>
            <option>select</option>

            {teams.map((team) => (
            <option key={team.teamName} value={team.teamName}>
                {team.teamName}
            </option>
            ))}
        </select>

        <button type="submit" onClick={handleButton} className="space">Submit</button>

    </div>
  );
}

export default TeamTile;
