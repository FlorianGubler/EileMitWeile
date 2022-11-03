package com.github.floriangubler.eilemitweile.controller;

import com.github.floriangubler.eilemitweile.entity.GameDTO;
import com.github.floriangubler.eilemitweile.entity.GameEntity;
import com.github.floriangubler.eilemitweile.entity.MemberDTO;
import com.github.floriangubler.eilemitweile.entity.MemberEntity;
import com.github.floriangubler.eilemitweile.entity.enumeration.GameRank;
import com.github.floriangubler.eilemitweile.exception.UserAlreadyExistsException;
import com.github.floriangubler.eilemitweile.exception.UserNotFoundException;
import com.github.floriangubler.eilemitweile.service.GameService;
import com.github.floriangubler.eilemitweile.service.MemberService;
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

import java.util.*;

@RestController
@RequestMapping("/api/games")
@Tag(name = "Games", description = "EileMitWeile Games management endpoints")
public class GameController {

    private final GameService gameService;
    private final MemberService memberService;

    GameController(GameService gameService, MemberService memberService) {
        this.gameService = gameService;
        this.memberService = memberService;
    }

    @Operation(
            summary = "Get user Games",
            description = "Get all games of User",
            security = {@SecurityRequirement(name = "JWT Auth")}
    )
    @GetMapping
    List<GameEntity> loadUserGames(Authentication authentication) {
        return gameService.getUserGames(UUID.fromString(authentication.getName()));
    }

    @Operation(
            summary = "Store a Game",
            description = "Store a Game",
            security = {@SecurityRequirement(name = "JWT Auth")}
    )
    @PutMapping("/{memberid}")
    ResponseEntity<Void> creategame (
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Create Game", required = true)
            @RequestBody(required = true)
            GameDTO gameDTO) {
        Map<MemberEntity, GameRank> memberrankmap = new HashMap<>();
        for(Map.Entry<UUID, GameRank> entry : gameDTO.getMemberrank().entrySet()){
            memberrankmap.put(memberService.getMember(entry.getKey()), entry.getValue());
        }
        gameService.create(new GameEntity(UUID.randomUUID(), memberrankmap, gameDTO.getStartdate(), gameDTO.getEnddate()));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(
            summary = "Delete a Game",
            description = "Delete a Game",
            security = {@SecurityRequirement(name = "JWT Auth")}
    )
    @DeleteMapping("/{memberid}")
    ResponseEntity<Void> deletegame(
            @Parameter(description = "GameID", required = true)
            @PathVariable(name = "gameid", required = true)
            UUID gameid) {
            try{
                gameService.delete(gameid);
                return new ResponseEntity<>(HttpStatus.OK);
            } catch(UserNotFoundException e){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
    }
}
