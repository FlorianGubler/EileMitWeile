package com.github.floriangubler.eilemitweile.entity;

import com.github.floriangubler.eilemitweile.entity.enumeration.GameRank;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
public class GameDTO {

    UUID id;

    @NotNull
    private Rank[] memberrankmap;

    @NotNull
    Date startdate;

    @NotNull
    Date enddate;

    UUID user_id;
}
