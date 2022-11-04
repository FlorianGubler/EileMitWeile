import {User} from "./user";
import {GameRank} from "./game-rank";

export class Game {
  public id: String | null;
  public memberrankmap: Map<String, GameRank>;
  public startdate: Date;
  public enddate: Date;

  constructor(id: String | null, memberrankmap: Map<String, GameRank>, startdate: Date, enddate: Date) {
    this.id = id;
    this.memberrankmap = memberrankmap;
    this.startdate = startdate;
    this.enddate = enddate;
  }
}
