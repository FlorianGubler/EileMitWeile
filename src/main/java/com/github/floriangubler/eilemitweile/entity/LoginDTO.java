package com.github.floriangubler.eilemitweile.entity;

import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
public class LoginDTO {

    @NotNull
    String email;

    @NotNull
    String password;
}
