import "../styling/homePage.css";
import MatchTile from "../components/matchTile";
import TeamTile from "../components/teamTile";
import React, { useState, useEffect } from "react";

function HomePage() {

  const [teams, setTeams] = useState();

  useEffect(() => {
    const fetchTeams = async () => {
      const responce = await fetch(`${process.env.REACT_APP_Backend_URL}/dashboard/allTeams`);
      const data = await responce.json();
      setTeams(data);
    };
    fetchTeams();
  }, []);

  if (!teams) {
    return "Data Not Fetched";
  }

  return (
    <div className="homePage">

        <div className="text">
            <h3>Team Details: </h3>
        </div>
        <TeamTile teams = {teams}/>
    
        <div className="text">
            <h3>Find all Matches: </h3>
        </div>
        <MatchTile teams = {teams}/>
        
        <p className="info">ⓘ Choose one or both teams.</p>

    </div>
  );
}

export default HomePage;
