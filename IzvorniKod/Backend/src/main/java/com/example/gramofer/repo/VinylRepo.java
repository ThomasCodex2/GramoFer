package com.example.gramofer.repo;

import com.example.gramofer.model.UserAccount;
import com.example.gramofer.model.Vinyl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VinylRepo extends JpaRepository<Vinyl,Integer> {
    List<Vinyl> findByUser(UserAccount user);
    
    Optional<Vinyl> findById(Integer id);

    @Query("SELECT v FROM Vinyl v WHERE v.available = :available")
    List<Vinyl> findAllByAvailable(@Param("available") int available);
  
    @Query("SELECT v FROM Vinyl v " +
            "JOIN v.editionLabel e " +
            "JOIN e.belongsToGenreGenres g " +
            "WHERE g.genreName = :genreName AND e.releaseDate = :releaseDate")
    List<Vinyl> findAllByGenreNameAndReleaseDate(@Param("genreName") String genreName,
                                                 @Param("releaseDate") Integer releaseDate);

    @Query("SELECT v FROM Vinyl v " +
            "JOIN v.editionLabel e " +
            "JOIN e.belongsToGenreGenres g " +
            "WHERE g.genreName = :genreName " +
            "AND (LOWER(v.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "OR LOWER(v.vinylCondition) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "OR LOWER(v.coverCondition) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "OR LOWER(e.albumName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
            "OR LOWER(e.artistName) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Vinyl> findAllVinylsBySearchAndByGenre(@Param("searchTerm") String searchTerm, @Param("genreName") String genreName);

    @Query("SELECT v FROM Vinyl v " +
            "JOIN v.editionLabel e " +
            "WHERE LOWER(e.albumName) = LOWER(:searchTerm) " +
            "OR LOWER(e.artistName) = LOWER(:searchTerm)")
    List<Vinyl> findAllVinylBySearchTerm(@Param("searchTerm") String searchTerm);
}
