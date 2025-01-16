package com.example.gramofer.service;

import com.example.gramofer.dtos.EditionDto;
import com.example.gramofer.dtos.VinylDto;
import com.example.gramofer.model.Edition;
import com.example.gramofer.model.Genre;
import com.example.gramofer.model.UserAccount;
import com.example.gramofer.model.Vinyl;
import com.example.gramofer.repo.EditionRepo;
import com.example.gramofer.repo.GenreRepo;
import com.example.gramofer.repo.UserRepo;
import com.example.gramofer.repo.VinylRepo;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class VinylService {

    private final VinylRepo repoVinyl;
    private final UserRepo userRepo;
    private final GenreRepo genreRepo;
    private final EditionRepo editionrepo;


    public VinylService(VinylRepo repoVinyl, UserRepo userRepo, GenreRepo genreRepo, EditionRepo editionrepo) {
        this.repoVinyl = repoVinyl;
        this.userRepo = userRepo;
        this.genreRepo = genreRepo;
        this.editionrepo = editionrepo;

    }

    public List<Vinyl> getAllVinylByUsername(String username) {
        Optional<UserAccount> user = userRepo.findByUsername(username);
        return repoVinyl.findByUser(user.get());
    }

    public List<Vinyl> fetchVinyls() {
        return repoVinyl.findAll();
    }


    private Genre newGenre (String input) {
        Genre genre = new Genre();
        genre.setGenreName(input);
        return genreRepo.save(genre);
    }

    private Edition newEdition (EditionDto inputEdition) {
        Edition edition = new Edition();
        edition.setEditionLabel(inputEdition.getEditionLabel());
        edition.setAlbumName(inputEdition.getAlbumName());
        edition.setArtistName(inputEdition.getArtistName());
        List<String> inputGenre = inputEdition.getGenres();
        for(String oneGenre: inputGenre){
            Genre genre = newGenre(oneGenre);
            Set<Genre> genres = edition.getBelongsToGenreGenres();
            if (genres == null) genres = new HashSet<Genre>();
            if(!genres.contains(genre))
                genres.add(genre);
            edition.setBelongsToGenreGenres(genres);
        }
        edition.setCountryOfOrigin(inputEdition.getCountryOfOrigin());
        edition.setReleaseDate(Integer.parseInt(inputEdition.getReleaseDate()));
        return editionrepo.save(edition);
    }

    @Transactional
    public void newVinyl(VinylDto input, UserAccount user){
        Vinyl vinyl = new Vinyl();
        Edition edition = newEdition(input.getEdition());
        vinyl.setEditionLabel(edition);
        vinyl.setDescription(input.getDescription());
        vinyl.setVinylCondition(input.getVinylCondition());
        vinyl.setCoverCondition(input.getCoverCondition());
        vinyl.setVinylImagePath1(input.getVinylImagePath1());
        vinyl.setVinylImagePath2(input.getVinylImagePath2());
        vinyl.setCoverImagePath1(input.getCoverImagePath1());
        vinyl.setCoverImagePath2(input.getCoverImagePath2());
        vinyl.setUser(user);
        vinyl.setAvailable(0);
        vinyl.setOnLocation(input.getOnLocation());
        repoVinyl.save(vinyl);
    }

    public void updateVinyl(Vinyl vinyl) {
        repoVinyl.save(vinyl);
    }

    public void deleteVinyl(int id) {
        repoVinyl.deleteById(id);
    }


}
