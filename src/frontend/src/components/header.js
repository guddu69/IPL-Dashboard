import "../styling/header.css"
import { Link } from "react-router-dom";

function Header(){

    return (

        <div className="header">

            <div className="heading">
                <h1>IPL Dashboard</h1>    
            </div>

            <div>
                <h3><Link to = {'/'}>Home</Link></h3>
            </div>

            <div>
                <h3><Link to = {'/season/2022'}>Seasons</Link></h3>
            </div>
        
        </div>
    );

}

export default Header;