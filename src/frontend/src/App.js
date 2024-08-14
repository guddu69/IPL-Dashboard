import "./App.css";
import Header from "./components/header";
import HomePage from "./pages/homePage";
import MatchPage from "./pages/matchPage";
import MoreMatch from "./pages/moreMatches";
import TeamPage from "./pages/teamPage";
import Season from "./pages/seasonPage";
import {HashRouter , Route , Routes} from 'react-router-dom';
// BrowserRouter -> HashRouter (so that it goes on react server and not api call to backend)
function App() {

  return (
    <div className="App">

      <HashRouter>

        <Header/>
        
        <Routes>

            <Route path="/" element={<HomePage />}></Route>
            <Route path="/team/:teamName" element={<TeamPage />}></Route>
            <Route path="/match/:team/" element={<MoreMatch />}></Route>
            <Route path="/match/:team1/:team2" element={<MatchPage />}></Route>
            <Route path="/season/:year" element={<Season />}></Route>

        </Routes>

      </HashRouter>

      
      
    </div>
  );
}

export default App;
