package com.github.floriangubler.eilemitweile.repository;

import com.github.floriangubler.eilemitweile.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MemberRepository extends JpaRepository<MemberEntity, UUID> {
    List<MemberEntity> findAll();

    Optional<MemberEntity> findByEmail(String email);

    void deleteById(UUID memberid);

    @Query("UPDATE MEMBER u SET u.failedAttempt = ?1 WHERE u.id = ?2")
    @Modifying
    void updateFailedAttempts(int failAttempts, UUID id);
}
