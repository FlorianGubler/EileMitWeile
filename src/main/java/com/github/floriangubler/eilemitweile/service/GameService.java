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

    GameService(GameRepository repository) {
        this.repository = repository;
    }

    public List<GameEntity> getUserGames(UUID gameid){
        log.info("Executing find Games of member ...");
        return repository.findUserGames(gameid);
    }

    public GameEntity create(GameEntity game){
        log.info("Executing update user with id " + game.getId() + " ...");
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
