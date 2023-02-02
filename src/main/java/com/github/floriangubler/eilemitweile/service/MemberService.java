package com.github.floriangubler.eilemitweile.service;

import com.github.floriangubler.eilemitweile.exception.UserAlreadyExistsException;
import com.github.floriangubler.eilemitweile.exception.UserNotFoundException;
import com.github.floriangubler.eilemitweile.entity.MemberEntity;
import com.github.floriangubler.eilemitweile.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class MemberService {

    public static final int MAX_FAILED_ATTEMPTS = 3;

    private static final long LOCK_TIME_DURATION = 24 * 60 * 60 * 1000; // 24 hours

    private final MemberRepository repository;

    MemberService(MemberRepository repository) {
        this.repository = repository;
    }

    public List<MemberEntity> getMembers(){
        log.info("Executing find all Members ...");
        return repository.findAll();
    }

    public MemberEntity getMember(UUID memberid){
        log.info("Executing find member with id " + memberid + " ...");
        Optional<MemberEntity> member = repository.findById(memberid);
        if(member.isEmpty()){
            throw new UserNotFoundException("User with id " + memberid + " not found...");
        } else{
            return member.get();
        }
    }

    public MemberEntity create(MemberEntity member){
        if(repository.findByEmail(member.getEmail()).isEmpty()){
            log.info("Executing create user with id " + member.getId() + " ..." + member.getEmail());
            return repository.save(member);
        } else{
            throw new UserAlreadyExistsException("Member with email '" + member.getEmail() + "' already exists");
        }
    }
    public MemberEntity update(MemberEntity member, UUID memberid){
        if(repository.findById(memberid).isPresent()){
            if(repository.findByEmail(member.getEmail()).isEmpty()){
                log.info("Executing update user with id " + memberid + " ...");
                member.setId(memberid);
                return repository.save(member);
            } else{
                throw new UserAlreadyExistsException("Member with email '" + member.getEmail() + "' already exists");
            }

        } else{
            throw new UserNotFoundException("Member with given id not found");
        }
    }

    @Transactional
    public void delete(UUID memberid){
        if(repository.findById(memberid).isPresent()){
            log.info("Executing delete user with id " + memberid + " ...");
            repository.deleteById(memberid);
        } else{
            throw new UserNotFoundException("Member with given id not found");
        }
    }

    @Transactional
    public void increaseFailedAttempts(MemberEntity user) {
        int newFailAttempts = user.getFailedAttempt() + 1;
        repository.updateFailedAttempts(newFailAttempts, user.getId());
    }

    public void lock(MemberEntity user) {
        user.setAccountNonLocked(false);
        user.setLockTime(new Date());

        repository.save(user);
    }

    public boolean unlockWhenTimeExpired(MemberEntity user) {
        long lockTimeInMillis = user.getLockTime().getTime();
        long currentTimeInMillis = System.currentTimeMillis();

        if (lockTimeInMillis + LOCK_TIME_DURATION < currentTimeInMillis) {
            user.setAccountNonLocked(true);
            user.setLockTime(null);
            user.setFailedAttempt(0);

            repository.save(user);

            return true;
        }

        return false;
    }

}
