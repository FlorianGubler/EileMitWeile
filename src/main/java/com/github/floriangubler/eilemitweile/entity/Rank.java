package com.github.floriangubler.eilemitweile.entity;

import com.github.floriangubler.eilemitweile.entity.enumeration.GameRank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Rank {
    private String playerName;
    private GameRank gameRank;
}
