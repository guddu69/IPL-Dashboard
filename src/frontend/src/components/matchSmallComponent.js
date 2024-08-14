import {Link} from 'react-router-dom';
import "../styling/matchSmallComponent.css"

function matchSmallComponent(props) {

  if(!props.match){return null} // important

  const isMatchWon = props.teamName === props.match.winningTeam;
  const otherTeam = props.match.team1 === props.teamName ? props.match.team2 : props.match.team1;

    return (
      <div className = { isMatchWon ? "matchSmallComponent won-card" : "matchSmallComponent lost-card"}>

        <p>VS</p>
        <h2><Link to = {`/team/${otherTeam}`}> {otherTeam}</Link></h2>
        <h3>{props.match.winningTeam} won by {props.match.margin} runs</h3>
        <h4>Date</h4>
        <p>{props.match.date}</p>
        <h4>City</h4>
        <p>{props.match.city}</p>
        
      </div>
    );
  }
  
  export default matchSmallComponent;
  