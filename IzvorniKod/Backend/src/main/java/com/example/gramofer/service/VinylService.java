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
import com.example.gramofer.responses.VinylResponseDTO;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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

    public List<Vinyl> fetchVinyls() {
        return repoVinyl.findAll();
    }

    public List<Edition> fetchEditions() {
        return editionrepo.findAll();
    }

    //public List<Vinyl> getVinylByUser(UserAccount user) {
    //    return repoVinyl.findByUser(user);
    //}

    public List<VinylResponseDTO> getVinylByUser(UserAccount user) {
        List<Vinyl> vinyls = repoVinyl.findByUser(user);
        return vinyls.stream()
            .map(vinyl -> {
                VinylResponseDTO dto = new VinylResponseDTO();
                dto.setVinylId(vinyl.getVinylId());
                dto.setVinylCondition(vinyl.getVinylCondition());
                dto.setCoverCondition(vinyl.getCoverCondition());
                dto.setDescription(vinyl.getDescription());
                dto.setVinylImagePath1(vinyl.getVinylImagePath1());
                dto.setVinylImagePath2(vinyl.getVinylImagePath2());
                dto.setCoverImagePath1(vinyl.getCoverImagePath1());
                dto.setCoverImagePath2(vinyl.getCoverImagePath2());
                dto.setAvailable(vinyl.getAvailable());
                dto.setOnLocation(vinyl.getOnLocation());
                dto.setEditionLabel(vinyl.getEditionLabel());
                return dto;
            })
            .collect(Collectors.toList());
    }

    private Genre newGenre (String input) {
        Genre genre = new Genre();
        genre.setGenreName(input);
        return genreRepo.save(genre);
    }

    private Edition newEdition (EditionDto inputEdition) {
        Optional <Edition> otpedition = editionrepo.findById(inputEdition.getEditionLabel());
        if (otpedition.isPresent()) {
            return null;
        }
        else {
        Edition edition = new Edition();
        edition.setEditionLabel(inputEdition.getEditionLabel());
        edition.setAlbumName(inputEdition.getAlbumName());
        edition.setArtistName(inputEdition.getArtistName());
        Set<String> inputGenre = inputEdition.getGenres();
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

    }

    public String newVinyl(VinylDto input, UserAccount user){
        Vinyl vinyl = new Vinyl();
        Edition edition = newEdition(input.getEdition());
        if (edition == null) {
            return "Edition vec postoji";
        }
        else {
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
        return "uspjeh";
        }
    }

    public List<VinylResponseDTO> getAllVinyls() {
    List<Vinyl> vinyls = repoVinyl.findAll();
    return vinyls.stream()
        .map(vinyl -> {
            VinylResponseDTO dto = new VinylResponseDTO();
            dto.setVinylId(vinyl.getVinylId());
            dto.setVinylCondition(vinyl.getVinylCondition());
            dto.setCoverCondition(vinyl.getCoverCondition());
            dto.setDescription(vinyl.getDescription());
            dto.setVinylImagePath1(vinyl.getVinylImagePath1());
            dto.setVinylImagePath2(vinyl.getVinylImagePath2());
            dto.setCoverImagePath1(vinyl.getCoverImagePath1());
            dto.setCoverImagePath2(vinyl.getCoverImagePath2());
            dto.setAvailable(vinyl.getAvailable());
            dto.setOnLocation(vinyl.getOnLocation());
            dto.setEditionLabel(vinyl.getEditionLabel());
            return dto;
        })
        .collect(Collectors.toList());
    }

    public void updateVinyl(Vinyl vinyl) {
        repoVinyl.save(vinyl);
    }

    public String deleteEdition(String editionLabel) {
        if(!editionrepo.existsById(editionLabel)) {
            return "Greska";
        }
        editionrepo.deleteById(editionLabel);
        return "Uspjesno";
    }

    public ResponseEntity<?> deleteVinylById(Integer id) {
        if (!repoVinyl.existsById(id)) {
            return ResponseEntity.status(404).body("Vinyl not found");
        }

        repoVinyl.deleteById(id);
        return ResponseEntity.ok("Vinyl deleted successfully");
    }

    public String updateV(Integer id, UserAccount user, VinylDto input){
        Optional<Vinyl> optvinyl = repoVinyl.findById(id); //ploca u bazi

        if (optvinyl.isPresent()){ //ispitivanje je li ploca u bazi
            Vinyl vinyl = optvinyl.get(); //ploca u bazi
            String editionTBD = vinyl.getEditionLabel().getEditionLabel();
            Edition edition = null;
            Edition sEdition = vinyl.getEditionLabel(); // edition ploce u bazi
            String sEditionId = vinyl.getEditionLabel().getEditionLabel();
            String nEditionId = input.getEdition().getEditionLabel();
            Optional <Edition> optnEdition = editionrepo.findById(nEditionId);
            Optional <Edition> optedition = editionrepo.findById(sEdition.getEditionLabel()); //edition ploce u bazi
            if (optnEdition.isPresent()) { //ispitivanje je li edition nove ploce postoji u bazi
                if (vinyl.getEditionLabel().getEditionLabel().equals(input.getEdition().getEditionLabel())) {//ispitivanje jesu li 
                //novi edition i stari edition isti, ako jesu, nema potrebe za stvaranjem novog
                edition = optedition.get();
                Set<String> inputGenre = input.getEdition().getGenres();
                for(String oneGenre: inputGenre){
                    Genre genre = newGenre(oneGenre);
                    Set<Genre> genres = edition.getBelongsToGenreGenres();
                    if (genres == null) genres = new HashSet<Genre>();
                    if(!genres.contains(genre))
                        genres.add(genre);
                    edition.setBelongsToGenreGenres(genres);
                }
                edition.setAlbumName(input.getEdition().getAlbumName());
                edition.setArtistName(input.getEdition().getArtistName());
                edition.setReleaseDate(Integer.parseInt(input.getEdition().getReleaseDate()));
                edition.setCountryOfOrigin(input.getEdition().getCountryOfOrigin());
                vinyl.setEditionLabel(edition);
                }
                else {
                    return "Greska2";
                }
            }
            else { //ako edition jos uvijek ne postoji u bazi (nije ga problem dodati)
                edition = newEdition(input.getEdition());
                vinyl.setEditionLabel(edition);
                editionrepo.save(edition);
                deleteEdition(editionTBD);
            }
        vinyl.setDescription(input.getDescription());
        vinyl.setVinylCondition(input.getVinylCondition());
        vinyl.setCoverCondition(input.getCoverCondition());
        vinyl.setVinylImagePath1(input.getVinylImagePath1());
        vinyl.setVinylImagePath2(input.getVinylImagePath2());
        vinyl.setCoverImagePath1(input.getCoverImagePath1());
        vinyl.setCoverImagePath2(input.getCoverImagePath2());
        vinyl.setUser(user);
        vinyl.setOnLocation(input.getOnLocation());
        repoVinyl.save(vinyl);
        
        return "Bravo";
        }
        else { //ako ni Vinyl ne postoji u bazi
            return "Greska1";
        }
    }

}
