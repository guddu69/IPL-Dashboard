import React,{ useState, useEffect } from "react";
import {Link } from "react-router-dom";
import "../styling/seasonPage.css"

function SeasonTile(props){
    
    const [year, setYear] = useState('');

    useEffect(
        () => {
          const fetchYear = async () => {
            const response = await fetch(`${process.env.REACT_APP_Backend_URL}/dashboard/allSeasons`);
            const data = await response.json();
            setYear(data);
          }
    
        fetchYear();
    
        }, []
      );

      if(!year){return null}
    
    return(
        <div className="seasonTile">

            <h2>Seasons</h2>

            {year.map(y => <p className={props.selectedYear === y ? "para selected" : "para"}><Link to = {`/season/${y}`}>{y}</Link></p>)}

        </div>
    );
}
export default SeasonTile;