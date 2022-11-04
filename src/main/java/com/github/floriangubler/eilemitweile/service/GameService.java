package com.github.floriangubler.eilemitweile.service;

import com.github.floriangubler.eilemitweile.entity.GameEntity;
import com.github.floriangubler.eilemitweile.entity.MemberEntity;
import com.github.floriangubler.eilemitweile.exception.GameNotFoundException;
import com.github.floriangubler.eilemitweile.exception.UserAlreadyExistsException;
import com.github.floriangubler.eilemitweile.exception.UserNotFoundException;
import com.github.floriangubler.eilemitweile.repository.GameRepository;
import com.github.floriangubler.eilemitweile.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class GameService {

    private final GameRepository repository;

    private final MemberRepository memberRepository;

    GameService(GameRepository repository, MemberRepository memberRepository) {
        this.repository = repository;
        this.memberRepository = memberRepository;
    }

    public List<GameEntity> getUserGames(UUID userid){
        log.info("Executing find Games of member ...");
        return repository.findGameEntitiesByUserId(userid);
    }

    public GameEntity create(GameEntity game){
        log.info("Executing create game with id " + game.getId() + " ..., For User: " + game.getUser().getId());
        log.info("Map: {}", game.getMemberrankmap());
        return repository.save(game);
    }

    @Transactional
    public void delete(UUID gameid){
        if(repository.findById(gameid).isPresent()){
            log.info("Executing delete game with id " + gameid + " ...");
            repository.deleteById(gameid);
        } else{
            throw new GameNotFoundException("Game with given id not found");
        }
    }

}
