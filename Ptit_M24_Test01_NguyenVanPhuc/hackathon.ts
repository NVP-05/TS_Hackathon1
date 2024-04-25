interface IPlayer{
    id: number;
	name: string;
	score: number;
}
class Player{
    player: IPlayer[]
    constructor(){
        let data:string|null = localStorage.getItem("players");
        if(data){
            this.player = JSON.parse(data);
        }else{
            this.player = [];
        }
    }
    renderPlayer():void{
        let data:string|null = localStorage.getItem("players");
        if(data){
            this.player = JSON.parse(data);
        }else{
            this.player = [];
        }

        let text = ``;
        let body = (<HTMLInputElement>document.getElementById("body"));
        for(let i = 0; i < this.player.length; i++){
            text += `
            <tr>
                <td style="width: 60px;"><i onclick="deletePlayer(${this.player[i].id})" class="fa-solid fa-xmark"></i></td>
                <td style="width: 60px;"><i class="fa-solid fa-crown"></i></td>
                <td colspan="5">${this.player[i].name}</td>
                <td><button onclick="reducePoint(${this.player[i].id})">-</button></td>
                <td>${this.player[i].score}</td>
                <td><button onclick="addPoint(${this.player[i].id})">+</button></td>
            </tr>
            `;
         
        }
        body.innerHTML = text;
        displayPlayers();
        displayTotolPoints();
        
    }

    createPlayer():void{
        let name:string = (<HTMLInputElement>document.getElementById("input")).value;
        if((<HTMLInputElement>document.getElementById("input")).value == ""){
            alert("Không được để trống tên.");
        }else{
            let score:number = 0;
            let id:number = Math.floor(Math.random()*9999999999999);
            let newPlayer = {
                name:name,
                score:score,
                id:id,
            }
            this.player.push(newPlayer);
            (<HTMLInputElement>document.getElementById("input")).value = "";
            localStorage.setItem("players", JSON.stringify(this.player));
            displayPlayers();
        }

    }

    
    updatePlayer(id:number, check:string):void{
        if(check == "add"){
            for(let i = 0; i < this.player.length; i++){
                if(id == this.player[i].id){
                    this.player[i].score++;
                    console.log(this.player[i].score);
                }
            }
            localStorage.setItem("players", JSON.stringify(this.player));
            this.renderPlayer();
        }else{
            for(let i = 0; i < this.player.length; i++){
                if(id == this.player[i].id && this.player[i].score > 0){
                    this.player[i].score--;
                    console.log(this.player[i].score);
                }
            }
            localStorage.setItem("players", JSON.stringify(this.player));
            this.renderPlayer();
        }
    }

    deletePlayer(id:number):void{
        for(let i = 0; i < this.player.length; i++){
            if(id == this.player[i].id){
                this.player.splice(i, 1);
            }
        }
        localStorage.setItem("players", JSON.stringify(this.player));
        this.renderPlayer();
    }
}


let playerss = new Player();
playerss.player =[
    {
        id: Math.floor(Math.random()*9999999999999),
        name:"NGuyễn Văn Phúc",
        score:4,
    }
];
playerss.renderPlayer();



// Hàm xóa người chơi
function deletePlayer(id:number){
    playerss.deletePlayer(id);
}

// Hàm thêm người chơi
function createPlayer(){
    playerss.createPlayer();
    playerss.renderPlayer();
}

// Hàm tăng điểm
function addPoint(id:number){
    let check = "add";
    playerss.updatePlayer(id, check);
    playerss.renderPlayer();
}


// Hàm giảm điểm
function reducePoint(id:number){
    let check = "reduce";
    playerss.updatePlayer(id, check);
    playerss.renderPlayer();
}

// Hàm hiển thị số players
function displayPlayers(){
    let data = localStorage.getItem("players");
    if(data){
        let playerList = JSON.parse(data);
        (<HTMLInputElement>document.getElementById("displayPlayers")).innerHTML = playerList.length;
    }else{
        (<HTMLInputElement>document.getElementById("displayPlayers")).innerHTML = `0`;
    }
}
displayPlayers();

// Hiển thị số tổng điểm 
function displayTotolPoints(){
    let data = localStorage.getItem("players");
    if(data){
        let playerList = JSON.parse(data);
        let sum = 0;
        for(let i = 0; i < playerList.length; i++){
            sum += playerList[i].score;
        }
        (<HTMLInputElement>document.getElementById("displayTotolPoints")).innerHTML = `${sum}`;
    }
}
displayTotolPoints();