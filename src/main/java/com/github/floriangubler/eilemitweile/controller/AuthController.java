package com.github.floriangubler.eilemitweile.controller;

import com.github.floriangubler.eilemitweile.entity.MemberDTO;
import com.github.floriangubler.eilemitweile.exception.UserAlreadyExistsException;
import com.github.floriangubler.eilemitweile.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import com.github.floriangubler.eilemitweile.entity.MemberEntity;
import com.github.floriangubler.eilemitweile.entity.TokenResponse;
import com.github.floriangubler.eilemitweile.repository.MemberRepository;
import com.github.floriangubler.eilemitweile.security.JwtServiceHMAC;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.UUID;

@RestController
@CrossOrigin()
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtServiceHMAC jwtService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    MemberService memberService;

    @Operation(
            summary = "Get new token",
            operationId = "getToken",
            tags = {"Authorization"}
    )
    @PostMapping(value = "/login", produces = "application/json")
    public TokenResponse getToken(
            @Parameter(description = "If password is selected as grant type this field is needed", required = false)
            @RequestParam(name = "email", required = false)
            String email,
            @Parameter(description = "If password is selected as grant type this field is needed", required = false)
            @RequestParam(name = "password", required = false)
            String password) throws GeneralSecurityException, IOException {
        val optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isEmpty()) {
            throw new IllegalArgumentException("Username or password wrong");
        }

        if (!BCrypt.checkpw(password, optionalMember.get().getPasswordHash())) {
            throw new IllegalArgumentException("Username or password wrong");
        }

        val member = optionalMember.get();

        val id = UUID.randomUUID().toString();
        val scopes = new ArrayList<String>();

        val newAccessToken = jwtService.createNewJWT(id, member.getId().toString(), member.getEmail(), scopes);

        return new TokenResponse(newAccessToken, "Bearer");
    }

    @Operation(
            summary = "Register user",
            operationId = "register",
            tags = {"Authorization"}
    )
    @PostMapping(value = "/register", produces = "application/json")
    public ResponseEntity<TokenResponse> register(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Member", required = true)
            @RequestBody(required = true)
            MemberDTO registerdto
    ) throws GeneralSecurityException, IOException {
        String passwordHash = BCrypt.hashpw(registerdto.getPassword(), BCrypt.gensalt());
        try{
            memberService.create(new MemberEntity(UUID.randomUUID(), registerdto.getEmail(), registerdto.getFirstname(), registerdto.getLastname(), passwordHash));
        } catch(UserAlreadyExistsException e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(getToken(registerdto.getEmail(), registerdto.getPassword()), HttpStatus.OK);
    }
}
