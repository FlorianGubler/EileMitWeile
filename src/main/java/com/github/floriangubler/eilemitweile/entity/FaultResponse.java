package com.github.floriangubler.eilemitweile.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FaultResponse {

    @JsonProperty("message")
    String message;
}
