package com.example.IPL_Dashboard.Repo;

import com.example.IPL_Dashboard.pojo.Match;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepo extends CrudRepository<Match, Integer> {

    @Query(value = "SELECT toss_winner, COUNT(toss_winner) FROM matchinfo GROUP BY toss_winner ORDER BY COUNT(toss_winner) DESC",
            nativeQuery = true)
    List<Object[]> getTossWinners();

    @Query(value = "SELECT DISTINCT season from matchinfo order by season;",
            nativeQuery = true)
    List<String> getAllSeasons();

    @Query(value = "SELECT * FROM matchinfo where team1 in :teams and team2 in :teams ORDER BY date DESC",
            nativeQuery = true)
    List<Match> getMatchesByTeam(@Param("teams") List<String> teams);

    @Query(value = "SELECT * from matchinfo where date BETWEEN :d1 and :d2 ORDER by date DESC",
            nativeQuery = true)
    List<Match> getMatchBySeason(String d1, String d2);

    @Query(value = "SELECT season, winning_team FROM matchinfo WHERE match_number = 'Final'",
            nativeQuery = true)
    List<Object[]> getSeasonWinner();

    @Query(value = "SELECT *FROM matchinfo where team1 = :team or team2 = :team ORDER BY date desc",
            nativeQuery = true)
    List<Match> getAllMatchesOTeam(@Param("team") String team);

    @Query(value = "SELECT * FROM matchinfo WHERE team1 = :team or team2 = :team ORDER BY date desc LIMIT 1;",nativeQuery = true)
    Match getLatestMatchTeam(String team);

//    List<Match> findByTeam1(String Team1); // Team1 -> team1 in pojo

    @Query(value = "SELECT * FROM matchinfo WHERE team1 = :team or team2 = :team ORDER BY date desc LIMIT 4;",nativeQuery = true)
    List<Match> getMatches4(String team);

    @Transactional //update operation to be performed inside a transaction
    @Modifying // extends query to implement update or delete operations
    @Query(value = "UPDATE matchinfo set season = :s1 where season = :s2 ;",
            nativeQuery = true)
    void updateSeasons(String s1, String s2);

}
