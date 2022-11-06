import {GameRank} from "./game-rank";

export class Rank {
  constructor(playerName: String, gameRank: GameRank) {
    this.playerName = playerName;
    this.gameRank = gameRank;
  }
  public playerName: String;
  public gameRank: GameRank;

}
