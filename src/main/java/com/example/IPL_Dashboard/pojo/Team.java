package com.example.IPL_Dashboard.pojo;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "teaminfo")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    String teamName;
    int totalWins;
    int totalMatches;

    @Transient // not present in DB table
    List<Match> recentMatches;

}
