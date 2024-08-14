import MatchDetailComponent from "../components/matchDetailComponent";
import MatchSmallComponent from "../components/matchSmallComponent";
import "../styling/teamPage.css";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Team() {

  const {teamName} = useParams(); // {} is important otherwise it will go as [object object]

  const [team, setTeam] = useState({recentMatches:[]});

  useEffect(() => {
    const fetchTeam = async () => {
      const response = await fetch(`${process.env.REACT_APP_Backend_URL}/dashboard/team?team=${teamName}`);
      const data = await response.json();
      setTeam(data);
    };

    fetchTeam();
  }, [teamName]);

  if(!team || !team.recentMatches){return "Data Not Fetched"}

  const winPer = (team.totalWins/team.totalMatches * 100).toFixed(2);
  const more50 = winPer > 50;
  

  return (
    <div className="teamPage">

      <div className="name-section">
        <h2 className="name">{team.teamName}</h2>
      </div>

      <div className="teamDetail-section">
      
        <h4 className = { more50 ? "won-card" : "lost-card"}>Win percentage: { winPer }%</h4>
        <h4>Wins : {team.totalWins}</h4>
        <h4>Losses: {team.totalMatches - team.totalWins}</h4>
        <h4>Matches: {team.totalMatches}</h4>
        
      
      </div>

      <div className="MDC-section">
        <h3>Latest Matches:</h3>
        <MatchDetailComponent teamName = {team.teamName} match = {team.recentMatches[0]}/>
      </div>

      {team.recentMatches.slice(1).map( (m) => <MatchSmallComponent teamName = {team.teamName} match={m}/>)}

      <div className="more-section">
        <h2><Link to = {`/match/${teamName}`}>more »</Link></h2>
      </div>

    </div>
  );
}

export default Team;
