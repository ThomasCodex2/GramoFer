package com.example.gramofer.responses;

import java.util.List;
import java.util.Set;



import lombok.Data;

@Data
public class ExchangeResponse {
    private Integer exchangeid;

    private String username;
    
    private String albumname;

    private List<String> isoffering;
}
