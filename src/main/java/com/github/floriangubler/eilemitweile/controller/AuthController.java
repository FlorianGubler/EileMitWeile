package com.github.floriangubler.eilemitweile.controller;

import com.github.floriangubler.eilemitweile.entity.*;
import com.github.floriangubler.eilemitweile.exception.UserAlreadyExistsException;
import com.github.floriangubler.eilemitweile.exception.UsernamePasswordException;
import com.github.floriangubler.eilemitweile.service.MemberService;
import de.taimos.totp.TOTP;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import com.github.floriangubler.eilemitweile.repository.MemberRepository;
import com.github.floriangubler.eilemitweile.security.JwtServiceHMAC;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apache.commons.codec.binary.Base32;
import org.apache.commons.codec.binary.Hex;
import org.passay.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.logging.LogLevel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
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
    public ResponseEntity<?> login(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Member", required = true)
            @RequestBody(required = true)
            LoginDTO logindto) throws UsernamePasswordException {
        TokenResponse res;
        try{
            res = getToken(logindto.getEmail(), logindto.getPassword());
        } catch (UsernamePasswordException e){
            return new ResponseEntity<>(new FaultResponse(e.getMessage()), HttpStatus.UNAUTHORIZED);
        } catch(LockedException e1){
            return new ResponseEntity<>(new FaultResponse(e1.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @Operation(
            summary = "Register user",
            operationId = "register",
            tags = {"Authorization"}
    )
    @PostMapping(value = "/register", produces = "application/json")
    public ResponseEntity<?> register(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Member", required = true)
            @RequestBody(required = true)
            MemberDTO registerdto
    ) throws GeneralSecurityException, IOException {

        Path path = Paths.get("src/main/resources/10000pw.txt");

        List<String> lines = Files.readAllLines(path);

        if (lines.contains(registerdto.getPassword())) {
            return new ResponseEntity<>(new FaultResponse("Password is too weak"), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        String passwordHash = BCrypt.hashpw(registerdto.getPassword(), BCrypt.gensalt());
        try {
            memberService.create(new MemberEntity(UUID.randomUUID(), registerdto.getEmail(), registerdto.getFirstname(), registerdto.getLastname(), passwordHash, true, 0, null));
        } catch (UserAlreadyExistsException e) {
            return new ResponseEntity<>(new FaultResponse("This E-Mail address is already in use"), HttpStatus.CONFLICT);
        }
        TokenResponse res;
        try {
            res = getToken(registerdto.getEmail(), registerdto.getPassword());
        } catch (UsernamePasswordException e) {
            return new ResponseEntity<>(new FaultResponse(e.getMessage()), HttpStatus.UNAUTHORIZED);
        } catch (LockedException e1) {
            return new ResponseEntity<>(new FaultResponse(e1.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    public TokenResponse getToken(String email, String password) throws UsernamePasswordException {
        val optionalMember = memberRepository.findByEmail(email);
        if (optionalMember.isEmpty()) {
            System.out.println("email");
            throw new UsernamePasswordException();
        }

        val member = optionalMember.get();

        //When account is locked and unlock didn't work
        if(!member.getAccountNonLocked() && !memberService.unlockWhenTimeExpired(member)){
            throw new LockedException("Account is locked");
        }

        if (!BCrypt.checkpw(password, member.getPasswordHash())) {
            System.out.println("pass");
            if (member.getFailedAttempt() < MemberService.MAX_FAILED_ATTEMPTS - 1) {
                 memberService.increaseFailedAttempts(member);
            } else {
                memberService.lock(member);
                throw new LockedException("Your account has been locked due to 3 failed attempts. It will be unlocked after 24 hours.");
            }
            throw new UsernamePasswordException();
        }

        val id = UUID.randomUUID().toString();
        val scopes = new ArrayList<String>();

        val newAccessToken = jwtService.createNewJWT(id, member.getId().toString(), member.getEmail(), scopes);

        return new TokenResponse(newAccessToken, "Bearer");
    }
}
