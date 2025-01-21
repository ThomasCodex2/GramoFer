package com.example.gramofer.contoller;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.example.gramofer.dtos.OAuthDto;
import com.example.gramofer.model.UserAccount;
import com.example.gramofer.service.AuthenticationService;
import com.example.gramofer.service.JWTService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class OauthController {
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String googleRedirectUri;

    private final JWTService jwtService;

    private final AuthenticationService authenticationService;

    public OauthController(JWTService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @GetMapping("/auth/google")
    public ModelAndView google() {
        String googleURL = "http://accounts.google.com/o/oauth2/v2/auth?client_id=" + googleClientId + "&redirect_uri="
                + googleRedirectUri
                + "&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code";
        return new ModelAndView("redirect:" + googleURL);
    }

    @GetMapping("/auth/google/code")
    public ModelAndView google_code(@RequestParam String code, @RequestParam(required = false) String error) {
        if (error != null) {
            return new ModelAndView("redirect:/login?error=".concat(error));
        }
        try {
            CloseableHttpClient httpclient = HttpClients.createDefault();
            HttpPost httppost = new HttpPost("https://oauth2.googleapis.com/token");

            List<NameValuePair> params = new ArrayList<NameValuePair>(5);
            params.add(new BasicNameValuePair("code", code));
            params.add(new BasicNameValuePair("client_id", googleClientId));
            params.add(new BasicNameValuePair("client_secret", googleClientSecret));
            params.add(new BasicNameValuePair("redirect_uri", googleRedirectUri));
            params.add(new BasicNameValuePair("grant_type", "authorization_code"));

            httppost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));

            CloseableHttpResponse response;
            response = httpclient.execute(httppost);

            HttpEntity entity = response.getEntity();

            String token = null;
            if (entity != null) {
                try (InputStream instream = entity.getContent()) {
                    String jsonResponse = new String(instream.readAllBytes(), StandardCharsets.UTF_8);
                    ObjectMapper mapper = new ObjectMapper();
                    JsonNode nodeResponse;
                    try {
                        nodeResponse = mapper.readTree(jsonResponse);
                    } catch (JsonProcessingException e) {
                        e.printStackTrace();
                        return new ModelAndView("redirect:/login?error=".concat(e.getMessage()));
                    }
                    token = nodeResponse.get("access_token").asText();
                } catch (IOException e1) {
                    e1.printStackTrace();
                    return new ModelAndView("redirect:/login?error=".concat(e1.getMessage()));
                } finally {
                    try {
                        response.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }

            CloseableHttpResponse getResponse;
            URIBuilder builder = new URIBuilder();
            builder.setScheme("https").setHost("www.googleapis.com").setPath("/userinfo/v2/me")
                    .setParameter("access_token", token);
            URI uri = builder.build();
            HttpGet getConnecton = new HttpGet(uri);
            getResponse = httpclient.execute(getConnecton);

            HttpEntity getrEntity = getResponse.getEntity();

            OAuthDto user = new OAuthDto();
            try (InputStream instream = getrEntity.getContent()) {
                String jsonResponse = new String(instream.readAllBytes(), StandardCharsets.UTF_8);
                ObjectMapper mapper = new ObjectMapper();
                JsonNode nodeResponse;
                try {
                    nodeResponse = mapper.readTree(jsonResponse);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                    return new ModelAndView("redirect:/login?error=".concat(e.getMessage()));
                }
                user.setEmail(nodeResponse.get("email").asText());
                user.setGoogleId(nodeResponse.get("id").asText());
                String firstName;
                try {
                    firstName = nodeResponse.get("given_name").asText();
                } catch (Exception e) {
                    firstName = "N/A";
                }
                String lastName;
                try {
                    lastName = nodeResponse.get("family_name").asText();
                } catch (Exception e) {
                    lastName = "N/A";
                }
                user.setFirstname(firstName);
                user.setLastname(lastName);
            } finally {
                getResponse.close();
            }

            UserAccount authenticatedUser = authenticationService.getOauthUserAccount(user);

            String jwtToken = jwtService.generateToken(authenticatedUser);

            httpclient.close();

            return new ModelAndView("redirect:/?token=" + jwtToken);
        } catch (Exception e) {
            return new ModelAndView("redirect:/?error=" + e.getMessage().replace(" ", "+"));
        }
    }
}