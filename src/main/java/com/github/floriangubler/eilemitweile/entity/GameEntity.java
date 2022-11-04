package com.github.floriangubler.eilemitweile.entity;

import com.github.floriangubler.eilemitweile.entity.enumeration.GameRank;
import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
@Entity(name = "GAME")
@DynamicUpdate
public class GameEntity implements Serializable {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    @Type(type = "org.hibernate.type.UUIDCharType")
    UUID id;

    @ElementCollection
    @CollectionTable(name = "userrank_mapping",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")})
    @MapKeyColumn(name = "member")
    @Column(name = "rank")
    @Enumerated(EnumType.STRING)
    private Map<String, GameRank> memberrankmap;

    @Column(name = "startdate", nullable = false)
    @CreatedDate
    Date startdate;

    @Column(name = "enddate", nullable = false)
    Date enddate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    MemberEntity user;
}
