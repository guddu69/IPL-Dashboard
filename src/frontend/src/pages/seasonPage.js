
import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import MatchDetailComponent from "../components/matchDetailComponent";
import "../styling/seasonPage.css"
import SeasonTile from "../components/seasonTile";

function Season() {

  const {year} = useParams();
  const [match, setMatch] = useState('');

  useEffect(
    () => {
      const fetchMatch = async () => {
        const response = await fetch(`${process.env.REACT_APP_Backend_URL}/dashboard/matchBySeason/${year}`);
        const data = await response.json();
        setMatch(data);
      }

    fetchMatch();

    }, [year]
  );

  if(!match || !match[0]){return "Data Not Fetched"}

    return (
      <div>

        <h1>Winner: <Link to = {`/team/${match[0].winningTeam}`}> {match[0].winningTeam}</Link></h1>
        <h2>Season: {year}</h2>

        <div className="seasonPage">

          <div>
            <SeasonTile selectedYear = {year}/>
          </div>

          <div>
            { match.map( (m) => <MatchDetailComponent year={year} match={m}/>) }
          </div>

        </div>

      </div>
    );
  }
  
  export default Season;
