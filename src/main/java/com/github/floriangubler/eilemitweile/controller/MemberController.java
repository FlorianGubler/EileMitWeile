package com.github.floriangubler.eilemitweile.controller;

import com.github.floriangubler.eilemitweile.entity.MemberEntity;
import com.github.floriangubler.eilemitweile.entity.MemberDTO;
import com.github.floriangubler.eilemitweile.exception.UserAlreadyExistsException;
import com.github.floriangubler.eilemitweile.service.MemberService;
import com.github.floriangubler.eilemitweile.exception.UserNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/members")
@Tag(name = "Members", description = "EileMitWeile Members management endpoints")
public class MemberController {

    private final MemberService memberService;

    MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @Operation(
            summary = "Get current Member",
            description = "Get logged in User Data",
            security = {@SecurityRequirement(name = "JWT Auth")}
    )
    @GetMapping("/")
    ResponseEntity<MemberEntity> getmember (Authentication authentication) {
        try{
            return new ResponseEntity<>(memberService.getMember(UUID.fromString(authentication.getName())), HttpStatus.OK);
        } catch(UserNotFoundException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(
            summary = "Delete logged-in Member",
            description = "Delete current Member",
            security = {@SecurityRequirement(name = "JWT Auth")}
    )
    @DeleteMapping("/")
    ResponseEntity<Void> deletemember(Authentication authentication) {
            try{
                memberService.delete(UUID.fromString(authentication.getName()));
                return new ResponseEntity<>(HttpStatus.OK);
            } catch(UserNotFoundException e){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
    }
}
