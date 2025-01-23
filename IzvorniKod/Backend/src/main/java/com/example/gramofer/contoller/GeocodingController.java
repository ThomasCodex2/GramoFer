package com.example.gramofer.contoller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.gramofer.service.GeocodingService;

import java.io.IOException;

@Controller
public class GeocodingController {

    @Autowired
    private GeocodingService geocodingService;

    @PostMapping("/search")
    public String search(@RequestParam("query") String query, Model model) {
        JSONObject location;
        try {
            location = geocodingService.search(query);
            model.addAttribute("location", location);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "index";
    }
}