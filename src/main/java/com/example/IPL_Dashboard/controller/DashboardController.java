package com.example.IPL_Dashboard.controller;

import com.example.IPL_Dashboard.Repo.MatchRepo;
import com.example.IPL_Dashboard.Repo.TeamRepo;
import com.example.IPL_Dashboard.pojo.Match;
import com.example.IPL_Dashboard.pojo.Team;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/dashboard")
@CrossOrigin // for node server to interact with spring server
public class DashboardController {

    @Autowired
    public MatchRepo matchRepo;
    @Autowired
    public TeamRepo teamRepo;

    @GetMapping("/tossWinners")
    public List<Object[]> getTossWinners(){
        return matchRepo.getTossWinners();
    }

    @GetMapping("/seasonWinner")
    public List<Object[]> seasonWinner(){
        return matchRepo.getSeasonWinner();
    }

    @GetMapping("/allSeasons")
    public List<String> allSeasons(){
        return matchRepo.getAllSeasons();
    }

    @GetMapping("/allMatchesTeam/{team}")
    public List<Match> allMatchesOfTeam(@PathVariable String team){
        return matchRepo.getAllMatchesOTeam(team);
    }

    @GetMapping("/allTeams")
    public Iterable<Team> allTeams(){
        return teamRepo.findAll();
    }

    @GetMapping("/latestMatchTeam")
    public Match latestMatchOfTeam(@RequestParam("team") String team){
        return matchRepo.getLatestMatchTeam(team);
    }

    @GetMapping("/matchBetween/{team1}/{team2}")
    public List<Match> matchesByTeams(@PathVariable String team1, @PathVariable String team2){

        List<String> teams = new ArrayList<>();
        teams.add(team1);
        teams.add(team2);

        return matchRepo.getMatchesByTeam(teams);
    }

    @GetMapping("/matchBySeason/{year}")
    public List<Match> matchesBySeason(@PathVariable String year){

        String d1 = "-01-01";
        String d2 = "-12-31";

        d1 = year + d1;
        d2 = year + d2;

        return matchRepo.getMatchBySeason(d1,d2);
    }

//    @GetMapping("/test")
//    public List<Match> findBySeason(@RequestParam("team") String team){
//        return matchRepo.findByTeam1(team);
//    }


    @GetMapping("/team")
    public Team getTeamStats(@RequestParam("team") String team){

        Team t = teamRepo.findTeamStats(team);
        t.setRecentMatches(matchRepo.getMatches4(team));

        return t;
    }

}
