

export class Player {
    playerName = "";
    playerToken = "";
    room = "";
    choosenCharacter = "";

    constructor(playerName, playerToken, room, choosenCharacter){
        this.playerName = playerName;
        this.playerToken = playerToken;
        this.room = room
        this.choosenCharacter = choosenCharacter;
    }
}