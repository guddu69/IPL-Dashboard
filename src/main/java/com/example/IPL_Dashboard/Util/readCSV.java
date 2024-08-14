package com.example.IPL_Dashboard.Util;

import com.example.IPL_Dashboard.Repo.MatchRepo;
import com.example.IPL_Dashboard.pojo.Match;
import com.example.IPL_Dashboard.pojo.Team;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Field;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j // for logs
@Service // for bean
public class readCSV {

    public List<Team> teamFunc(String path){

        Map<String, Team> teamMap = new HashMap<>();
        String[] data;

        try(CSVReader reader = new CSVReader(new FileReader(path))){

            String[] header = reader.readNext();

            while ( (data = reader.readNext())!= null ){

                Match match = new Match();

//                read each line
                for (int i=0; i<header.length; i++){

                    String fieldName = header[i];
                    String fieldData = data[i];

                    Field field = Match.class.getDeclaredField(fieldName); //csv header should be same as pojo
                    field.setAccessible(true);

                    if (field.getType() == int.class){
                        field.setInt(match, Integer.parseInt(fieldData));
                    }
                    else if(field.getType() == LocalDate.class){
                        match.setDate(LocalDate.parse(fieldData));
                    }
                    else if(field.getType() == String[].class){
                        fieldData = fieldData.replace("'", "");
                        fieldData = fieldData.substring(1, fieldData.length()-1);
                        field.set(match, fieldData.split(","));
                    }
                    else {
                        field.set(match, fieldData);
                    }

                }

                if (!teamMap.containsKey(match.getTeam1())){
                    Team team = new Team();
                    team.setTeamName(match.getTeam1());
                    teamMap.put(match.getTeam1(), team);
                }
                if (!teamMap.containsKey(match.getTeam2())){
                    Team team = new Team();
                    team.setTeamName(match.getTeam2());
                    teamMap.put(match.getTeam2(), team);
                }

                int a = teamMap.get(match.getTeam1()).getTotalMatches();
                teamMap.get(match.getTeam1()).setTotalMatches(a+1);

                int b = teamMap.get(match.getTeam2()).getTotalMatches();
                teamMap.get(match.getTeam2()).setTotalMatches(b+1);

                if ( match.getWinningTeam().equals(match.getTeam1()) ){
                    int x = teamMap.get(match.getTeam1()).getTotalWins();
                    teamMap.get(match.getTeam1()).setTotalWins(x+1);
                }
                if ( match.getWinningTeam().equals(match.getTeam2()) ){
                    int x = teamMap.get(match.getTeam2()).getTotalWins();
                    teamMap.get(match.getTeam2()).setTotalWins(x+1);
                }

            }

            log.info("The file is read successfully for Teams");

        } catch (NoSuchFieldException | IllegalAccessException | CsvValidationException | IOException e) {
            throw new RuntimeException(e);
        }

        List<Team> teams = new ArrayList<>();
        for (Team t : teamMap.values())
            teams.add(t);

        return teams;

    }

    public List<Match> matchFunc(String path){

        List<Match> matches = new ArrayList<>();
        String[] data;

        try(CSVReader reader = new CSVReader(new FileReader(path))){

            String[] header = reader.readNext();

            while ( (data = reader.readNext())!= null ){

                Match match = new Match();

//                read each line
                for (int i=0; i<header.length; i++){

                    String fieldName = header[i];
                    String fieldData = data[i];

                    Field field = Match.class.getDeclaredField(fieldName); //csv header should be same as pojo
                    field.setAccessible(true);

                    if (field.getType() == int.class){
                        field.setInt(match, Integer.parseInt(fieldData));
                    }
                    else if(field.getType() == LocalDate.class){
                        match.setDate(LocalDate.parse(fieldData));
                    }
                    else if(field.getType() == String[].class){
                        fieldData = fieldData.replace("'", "");
                        fieldData = fieldData.substring(1, fieldData.length()-1);
                        field.set(match, fieldData.split(","));
                    }
                    else {
                        field.set(match, fieldData);
                    }

                }

                matches.add(match);

            }

            log.info("The file is read successfully for Matches");

        } catch (NoSuchFieldException | IllegalAccessException | CsvValidationException | IOException e) {
            throw new RuntimeException(e);
        }


        return matches;

    }

}
