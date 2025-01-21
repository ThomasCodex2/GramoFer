package com.example.gramofer.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.gramofer.dtos.VinylDto;
import com.example.gramofer.dtos.WishDto;
import com.example.gramofer.model.Edition;
import com.example.gramofer.model.UserAccount;
import com.example.gramofer.model.Vinyl;
import com.example.gramofer.model.Wish;
import com.example.gramofer.repo.EditionRepo;
import com.example.gramofer.repo.GenreRepo;
import com.example.gramofer.repo.UserRepo;
import com.example.gramofer.repo.VinylRepo;
import com.example.gramofer.repo.WishRepo;
import com.example.gramofer.responses.VinylResponseDTO;

@Service
public class WishService {
    private final WishRepo wishrepo;


    public WishService(WishRepo wishrepo) {
        this.wishrepo = wishrepo;
    }


    public List<WishDto> getWishesByUser(UserAccount user) {
    List<Wish> wishes = wishrepo.findWByUser(user);
    return wishes.stream()
        .map(wish -> {
            WishDto wdto = new WishDto();
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
    
}
