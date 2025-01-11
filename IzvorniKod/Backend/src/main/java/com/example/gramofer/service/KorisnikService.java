/*package com.example.gramofer.service;

import com.example.gramofer.model.UserAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class KorisnikService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    //Repozitorij koji nam je potreban za vezu za bazom podataka
    @Autowired
    private UserService korisnikService;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        //Prvo nam treba objekt klase koji ce nam dati odgovor koji sadrzi podatke koje nam Google vraca kada smo se prijavili
        //DefaultOAuth2UserService klasa sadrzi vec svu logiku za primanje korisnickih podataka nakon sto je Google potvrdio prijavu
        //a userRequest je objekt koji sadrzi Access token koji nam je jako bitan za autorizaciju
        OAuth2UserService<OAuth2UserRequest, OAuth2User> dohvatiPodatke = new DefaultOAuth2UserService();
        OAuth2User korisnik = dohvatiPodatke.loadUser(userRequest);

        //Sada kada smo dobili podatke izvlacimo ih iz odgovora
        Map<String, Object> atributi = korisnik.getAttributes();

        //Trebaju nam podaci kao sto su: ime, prezime, mail, id korisnika(od strane Googla)
        String ime = (String)atributi.get("given_name");
        String prezime = (String)atributi.get("family_name");
        String email = (String)atributi.get("email");
        String googleId = (String)atributi.get("sub");

        //Sada moramo provjeriti da li mi imamo vec ovog korisnika u bazi podataka
        //Koristim googleId koji nam je Google dao kako bih to provjerili
        UserAccount korisnikApl = korisnikService.findKorisnikByGoogleId(googleId);

        if(korisnikApl == null){
            korisnikApl = new UserAccount();
            korisnikApl.setGoogleId(googleId);
        }
        korisnikApl.setIme(ime);
        korisnikApl.setPrezime(prezime);
        korisnikApl.setEmail(email);

        System.out.println("OVO JE PROBA");
        System.out.println("Korisnik se uspješno prijavio: " + googleId + " - " + email);


        //Sada spremamo korisnika u bazu tj. azuriramo mu podatke ako vec u bazi postoji
        korisnikService.saveKorisnik(korisnikApl);

        return new DefaultOAuth2User(korisnik.getAuthorities(), atributi, "sub");
    }
}
*/