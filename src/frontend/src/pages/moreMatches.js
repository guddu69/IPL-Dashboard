
import React, {useState, useEffect} from "react";
import "../styling/matchPage.css";
import {useParams, Link} from "react-router-dom";
import MatchDetailComponent from "../components/matchDetailComponent";

function MoreMatch() {

  const {team} = useParams();

  const [match, setMatch] = useState('');

  useEffect(
    () => {
      const fetchMatch = async () => {
        const response = await fetch(`${process.env.REACT_APP_Backend_URL}/dashboard/allMatchesTeam/${team}`);
        const data = await response.json();
        setMatch(data);
      }

    fetchMatch();

    }, [team]
  );

  if(!match || !match[0]){return "Data Not Fetched"}

    return (
      <div className="morePage">

        <h2 className="diffLinkCol">
            All Matches of 
            <Link to = {`/team/${team}`}> {team}</Link>
        </h2>
        <p>ⓘ Recent on Top.</p>

        {
          match.map( (m) => <MatchDetailComponent teamName={team} match={m}/>)
        }

      </div>
    );
  }
  
  export default MoreMatch;