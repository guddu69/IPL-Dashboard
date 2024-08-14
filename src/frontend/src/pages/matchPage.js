
import React, {useState, useEffect} from "react";
import "../styling/matchPage.css";
import {useParams, Link} from "react-router-dom";
import MatchDetailComponent from "../components/matchDetailComponent";

function Match() {

  const {team1, team2} = useParams();

  const [match, setMatch] = useState('');

  useEffect(
    () => {
      const fetchMatch = async () => {
        const response = await fetch(`${process.env.REACT_APP_Backend_URL}/dashboard/matchBetween/${team1}/${team2}`);
        const data = await response.json();
        setMatch(data);
      }

    fetchMatch();

    }, [team1, team2]
  );

  if(!match || !match[0]){return "Data Not Fetched"}

    let wonT1 = 0;
    match.map( m => wonT1 = team1===m.winningTeam ? wonT1+1 : wonT1)
    let wonT2 = match.length - wonT1;
    const wonTeam = wonT1 > wonT2 ? team1 : team2;

    return (
      <div className="matchPage">

        <h2 className="diffLinkCol">
          <Link to = {`/team/${team1}`}>{team1} </Link>
          VS
          <Link to = {`/team/${team2}`}> {team2}</Link>
        </h2>

        <h3 className={wonT1 > wonT2 ? "won-card" : "lost-card"}>{team1} won {wonT1} matches.</h3>
        <h3 className={wonT1 < wonT2 ? "won-card" : "lost-card"}>{team2} won {wonT2} matches.</h3>
        <h3>Total Matches: {match.length}</h3>

        {
          match.map( (m) => <MatchDetailComponent teamName = {wonTeam} match={m} show={true}/>)
        }

      </div>
    );
  }
  
  export default Match;
