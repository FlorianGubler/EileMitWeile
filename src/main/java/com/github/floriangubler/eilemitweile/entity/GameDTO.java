package com.github.floriangubler.eilemitweile.entity;

import com.github.floriangubler.eilemitweile.entity.enumeration.GameRank;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
    @NotNull
    Map<UUID, GameRank> memberrank;

    @NotNull
    Date startdate;

    @NotNull
    Date enddate;
}
