package com.example.gramofer.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.gramofer.model.UserAccount;
import com.example.gramofer.model.Wish;
import com.example.gramofer.repo.WishRepo;
import com.example.gramofer.dtos.WishDto;
import com.example.gramofer.responses.WishResponse;

@Service
public class WishService {
    private final WishRepo wishrepo;


    public WishService(WishRepo wishrepo) {
        this.wishrepo = wishrepo;
    }

    public List<WishResponse> getWishesByUser(UserAccount user) {
    List<Wish> wishes = wishrepo.findWByUser(user);
    return wishes.stream()
        .map(wish -> {
            WishResponse wdto = new WishResponse();
            wdto.setWishid(wish.getWishId());
            wdto.setAlbumName(wish.getAlbumName());
            wdto.setArtistName(wish.getArtistName());
            return wdto;
        })
        .collect(Collectors.toList());
    }
    
    public String newWish(WishDto input, UserAccount user){
        Wish wish = new Wish();
        wish.setAlbumName(input.getAlbumName());
        wish.setArtistName(input.getArtistName());
        wish.setUser(user);
        wishrepo.save(wish);
        return "uspjeh";
    }
    
    public ResponseEntity<?> deleteWishById(Integer id) {
        if (!wishrepo.existsById(id)) {
            return ResponseEntity.status(404).body("Wish not found");
        }

        wishrepo.deleteById(id);
        return ResponseEntity.ok("Wish deleted successfully");
    }
}
