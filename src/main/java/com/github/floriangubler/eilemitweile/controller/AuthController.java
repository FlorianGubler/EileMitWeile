package com.github.floriangubler.eilemitweile.controller;

import com.github.floriangubler.eilemitweile.entity.LoginDTO;
import com.github.floriangubler.eilemitweile.entity.MemberDTO;
import com.github.floriangubler.eilemitweile.exception.UserAlreadyExistsException;
import com.github.floriangubler.eilemitweile.exception.UsernamePasswordException;
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
@CrossOrigin
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
    public ResponseEntity<TokenResponse> login(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Member", required = true)
            @RequestBody(required = true)
            LoginDTO logindto) throws UsernamePasswordException {
        TokenResponse res;
        try{
            res = getToken(logindto.getEmail(), logindto.getPassword());
        } catch (UsernamePasswordException e){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
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
        TokenResponse res;
        try{
            res = getToken(registerdto.getEmail(), registerdto.getPassword());
        } catch (UsernamePasswordException e){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    public TokenResponse getToken(String email, String password) throws UsernamePasswordException {
        val optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isEmpty()) {
            throw new UsernamePasswordException();
        }

        if (!BCrypt.checkpw(password, optionalMember.get().getPasswordHash())) {
            throw new UsernamePasswordException();
        }

        val member = optionalMember.get();

        val id = UUID.randomUUID().toString();
        val scopes = new ArrayList<String>();

        val newAccessToken = jwtService.createNewJWT(id, member.getId().toString(), member.getEmail(), scopes);

        return new TokenResponse(newAccessToken, "Bearer");
    }
}
