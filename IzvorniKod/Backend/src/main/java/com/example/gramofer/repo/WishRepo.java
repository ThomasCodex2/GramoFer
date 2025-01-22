package com.example.gramofer.repo;

import com.example.gramofer.model.UserAccount;
import com.example.gramofer.model.Wish;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishRepo extends JpaRepository<Wish,Integer> {
    List<Wish> findWByUser(UserAccount user);

    List<Wish> findByArtistNameAndAlbumName(String artistName, String albumName);
}
