package com.example.IPL_Dashboard.controller;

import com.example.IPL_Dashboard.Repo.MatchRepo;
import com.example.IPL_Dashboard.Repo.TeamRepo;
import com.example.IPL_Dashboard.Util.readCSV;
import com.example.IPL_Dashboard.pojo.Match;
import com.example.IPL_Dashboard.pojo.Team;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/read")
public class ReadCSVController {

    @Autowired
    public readCSV read;
    @Autowired
    public MatchRepo matchRepo;
    @Autowired
    public TeamRepo teamRepo;

    @Value("${csvPath}")
    public String path;

    @GetMapping("/csvToMatches")
    public List<Match> readMatches(){
        return read.matchFunc(path);
    }

    @GetMapping("/csvToTeams")
    public List<Team> readTeams(){
        return read.teamFunc(path);
    }

    @GetMapping("/saveMatches")
    public String saveMatches(){

        List<Match> matches = read.matchFunc(path);

        for (Match m : matches)
            matchRepo.save(m); // save from crud

        log.info("Match Data saved to Database");

        return "Matches Saved";
    }

    @GetMapping("/saveTeams")
    public String saveTeams(){

        List<Team> teams = read.teamFunc(path);

        for (Team t : teams)
            teamRepo.save(t);

        log.info("Team data is saved to Database");

        return "Teams Saved";

    }

//    to make an update in database
    public void update(){

        List<String> s1 = new ArrayList<>();
        List<String> s2 = new ArrayList<>();

        s1.add("2008");
        s1.add("2010");
        s1.add("2020");

        s2.add("2007/08");
        s2.add("2009/10");
        s2.add("2020/21");

        for (int i=0; i<s1.size(); i++)
            matchRepo.updateSeasons(s1.get(i), s2.get(i));

        log.info("Seasons updated");

    }

    // performs the function when application is ready for the service
    @EventListener(ApplicationReadyEvent.class)
    public void doSomethingAfterStartup() {
        log.info("Event Listener functions:- ");
        saveMatches();
        saveTeams();
        update();
    }

}
