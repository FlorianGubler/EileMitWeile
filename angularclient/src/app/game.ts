import {User} from "./user";
import {GameRank} from "./game-rank";
import {Rank} from "./rank";

export class Game {
  public id: String | null;
  public memberrankmap: Rank[];
  public startdate: Date;
  public enddate: Date;

  constructor(id: String | null, memberrankmap: Rank[], startdate: Date, enddate: Date) {
    this.id = id;
    this.memberrankmap = memberrankmap;
    this.startdate = startdate;
    this.enddate = enddate;
  }
}
