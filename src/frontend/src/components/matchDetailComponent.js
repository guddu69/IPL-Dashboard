import {Link} from 'react-router-dom';
import "../styling/matchDetailComponent.css";

function matchDetailComponent(props) {

  if(!props.match){return null} // important

  if(props.show){
    // match detail card in match page
    const isMatchWon = props.teamName === props.match.winningTeam;

    return (
      <div className = { isMatchWon ? "matchDetailComponent won-card" : "matchDetailComponent lost-card"} >

        <div className='leftDetails'>
          <h3>{props.match.winningTeam} won by {props.match.margin} runs</h3>
          <h4>Date</h4>
          <p>{props.match.date}</p>
          <h4>Venue</h4>
          <p>{props.match.venue}</p>
          <h4>Player Of the Match</h4>
          <p>{props.match.player_of_Match}</p>
        </div>

        <div className='rightDetails'>
          <h4>Match Number</h4>
          <p>#{props.match.matchNumber}</p>
          <h4>Toss Winner</h4>
          <p>{props.match.tossWinner}</p>
          <h4>Decision</h4>
          <p>{props.match.tossDecision}</p>
          <h4>Umpires</h4>
          <p>{props.match.umpire1}, {props.match.umpire2}</p>
        </div>

      </div>
    );
  }

  if(!props.year){
    // match detail card in more page and team page
    const isMatchWon = props.teamName === props.match.winningTeam;
    const otherTeam = props.match.team1 === props.teamName ? props.match.team2 : props.match.team1;

    return (
      <div className = { isMatchWon ? "matchDetailComponent won-card" : "matchDetailComponent lost-card"} >

        <div className='leftDetails'>
          <p>VS</p>
          <h2><Link to = {`/team/${otherTeam}`}> {otherTeam}</Link></h2>
          <h3>{props.match.winningTeam} won by {props.match.margin} runs</h3>
          <h4>Date</h4>
          <p>{props.match.date}</p>
          <h4>Venue</h4>
          <p>{props.match.venue}</p>
          <h4>Player Of the Match</h4>
          <p>{props.match.player_of_Match}</p>
        </div>

        <div className='rightDetails'>
          <h4>Match Number</h4>
          <p>#{props.match.matchNumber}</p>
          <h4>Toss Winner</h4>
          <p>{props.match.tossWinner}</p>
          <h4>Decision</h4>
          <p>{props.match.tossDecision}</p>
          <h4>Umpires</h4>
          <p>{props.match.umpire1}, {props.match.umpire2}</p>
        </div>

      </div>
    );
  }

  // match season card
    return(
      <div className = "matchComponent ">

        <div className='leftDetails'>
          <h2><Link to = {`/team/${props.match.team1}`}>{props.match.team1} </Link>
          VS
          <Link to = {`/team/${props.match.team2}`}> {props.match.team2}</Link></h2>
          <h3>{props.match.winningTeam} won by {props.match.margin} runs</h3>
          <h4>Date</h4>
          <p>{props.match.date}</p>
          <h4>Venue</h4>
          <p>{props.match.venue}</p>
          <h4>Player Of the Match</h4>
          <p>{props.match.player_of_Match}</p>
        </div>

        <div className='rightDetails'>
          <h4>Match Number</h4>
          <p>#{props.match.matchNumber}</p>
          <h4>Toss Winner</h4>
          <p>{props.match.tossWinner}</p>
          <h4>Decision</h4>
          <p>{props.match.tossDecision}</p>
          <h4>Umpires</h4>
          <p>{props.match.umpire1}, {props.match.umpire2}</p>
        </div>

      </div>
    );

  }
  
  export default matchDetailComponent;
