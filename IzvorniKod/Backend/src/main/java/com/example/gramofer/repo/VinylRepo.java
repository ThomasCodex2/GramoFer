package com.example.gramofer.repo;

import com.example.gramofer.model.UserAccount;
import com.example.gramofer.model.Vinyl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VinylRepo extends JpaRepository<Vinyl,Integer> {
    List<Vinyl> findByUser(UserAccount user);

    @Query("SELECT v FROM Vinyl v " +
            "JOIN v.editionLabel e " +
            "JOIN e.belongsToGenreGenres g " +
            "WHERE g.genreName = :genreName AND e.releaseDate = :releaseDate")
    List<Vinyl> findAllByGenreNameAndReleaseDate(@Param("genreName") String genreName,
                                                 @Param("releaseDate") Integer releaseDate);
}
