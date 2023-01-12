package com.github.floriangubler.eilemitweile.controller;

import com.github.floriangubler.eilemitweile.entity.LoginDTO;
import com.github.floriangubler.eilemitweile.entity.MemberDTO;
import com.github.floriangubler.eilemitweile.exception.UserAlreadyExistsException;
import com.github.floriangubler.eilemitweile.exception.UsernamePasswordException;
import com.github.floriangubler.eilemitweile.service.MemberService;
import de.taimos.totp.TOTP;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import com.github.floriangubler.eilemitweile.entity.MemberEntity;
import com.github.floriangubler.eilemitweile.entity.TokenResponse;
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

        Path path = Paths.get("src/main/resources/10000pw.txt");

        List<String> lines = Files.readAllLines(path);

        if (lines.contains(registerdto.getPassword())){
            throw new IllegalArgumentException("Password is too weak");
        }

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

    // QDWSM3OYBPGTEVSPB5FKVDM3CSNCWHVK
    public static String generateSecretKey() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[20];
        random.nextBytes(bytes);
        Base32 base32 = new Base32();
        return base32.encodeToString(bytes);
    }


    public static String getTOTPCode(String secretKey) {
        Base32 base32 = new Base32();
        byte[] bytes = base32.decode(secretKey);
        String hexKey = Hex.encodeHexString(bytes);
        return de.taimos.totp.TOTP.getOTP(hexKey);
    }
}
