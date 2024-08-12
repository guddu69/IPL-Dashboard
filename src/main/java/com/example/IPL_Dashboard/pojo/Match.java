package com.example.IPL_Dashboard.pojo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name="matchinfo")
public class Match {

    @Id
    int ID;

    String City;
    LocalDate Date;
    String Season;
    String MatchNumber;
    String Team1;
    String Team2;
    String Venue;
    String TossWinner;
    String TossDecision;
    String SuperOver;
    String WinningTeam;
    String WonBy;
    String Margin;
    String method;
    String Player_of_Match;
    String[] Team1Players;
    String[] Team2Players;
    String Umpire1;
    String Umpire2;

}
