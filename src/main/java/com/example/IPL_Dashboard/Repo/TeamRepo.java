package com.example.IPL_Dashboard.Repo;

import com.example.IPL_Dashboard.pojo.Team;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepo extends CrudRepository<Team, Integer> {

    @Query(value = "SELECT* FROM teaminfo WHERE team_name = :team",nativeQuery = true)
    Team findTeamStats(String team);

}
