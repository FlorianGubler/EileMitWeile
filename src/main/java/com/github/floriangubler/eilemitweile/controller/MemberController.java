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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("/api/members")
@Tag(name = "Members", description = "EileMitWeile Members management endpoints")
public class MemberController {

    private final MemberService memberService;

    MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @Operation(
            summary = "Update a Member",
            description = "Admin updates a Member",
            security = {@SecurityRequirement(name = "JWT Auth")}
    )
    @PutMapping("/{memberid}")
    ResponseEntity<Void> updatemember (
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Member Update", required = true)
            @RequestBody(required = true)
            MemberDTO memberDTO,
            @Parameter(description = "MemberID", required = true)
            @PathVariable(name="memberid", required = true)
            UUID memberid,
            Authentication authentication) {
        try{
            if(Objects.equals(UUID.fromString(authentication.getName()), memberid)){
                String passwordHash = BCrypt.hashpw(memberDTO.getPassword(), BCrypt.gensalt());
                memberService.update(new MemberEntity(UUID.randomUUID(), memberDTO.getEmail(), memberDTO.getFirstname(), memberDTO.getLastname(), passwordHash), memberid);
                return new ResponseEntity<>(HttpStatus.OK);
            } else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        } catch(UserNotFoundException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (UserAlreadyExistsException e){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @Operation(
            summary = "Delete a Member",
            description = "Delete a Member (Only Admin)",
            security = {@SecurityRequirement(name = "JWT Auth")}
    )
    @DeleteMapping("/{memberid}")
    ResponseEntity<Void> deletemember(
            @Parameter(description = "MemberID", required = true)
            @PathVariable(name = "memberid", required = true)
            UUID memberid,
            Authentication authentication) {
            try{
                if(Objects.equals(UUID.fromString(authentication.getName()), memberid)){
                    memberService.delete(memberid);
                    return new ResponseEntity<>(HttpStatus.OK);
                } else{
                    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
                }
            } catch(UserNotFoundException e){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
    }
}
