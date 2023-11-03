class Game {
    constructor() {
        this.currJerryTile = null;
        this.currTomTile = null;
        this.score = 0;
        this.gameOver = false;
    }

    setGame() {
        for (let i = 0; i < 9; i++) {
            let tile = document.createElement("div");
            tile.id = i.toString();
            tile.addEventListener("click", this.selectTile.bind(this));
            document.getElementById("board").appendChild(tile);
        }
        setInterval(this.setJerry.bind(this), 1000);
        setInterval(this.setTom.bind(this), 1250);
    }

    getRandomTile() {
        let num = Math.floor(Math.random() * 9);
        return num.toString();
    }
// JERRY
    setJerry() {
        if (this.gameOver || this.score >= 50) {
            return;
        }
        if (this.currJerryTile) {
            this.currJerryTile.innerHTML = "";
        }
        let jerry = document.createElement("img");
        jerry.src = "./Images/jerry_1.png";

        let num = this.getRandomTile();
        if (this.currTomTile && this.currTomTile.id == num) {
            return;
        }
        this.currJerryTile = document.getElementById(num);
        this.currJerryTile.appendChild(jerry);
    }
// TOM
    setTom() {
        if (this.gameOver || this.score >= 50) {
            return;
        }
        if (this.currTomTile) {
            this.currTomTile.innerHTML = "";
        }
        let tom = document.createElement("img");
        tom.src = "./Images/tom.png";
        
        let num = this.getRandomTile();
        if (this.currJerryTile && this.currJerryTile.id == num) {
            return;
        }
        
        this.currTomTile = document.getElementById(num);
        this.currTomTile.appendChild(tom);
    }

    selectTile(event) {
        if (this.gameOver) {
            return;
        }
        
        if (event.target == this.currTomTile.firstChild) {
            this.score += 10;
            
            if (this.score >= 50) {
                scoreReached();
            }

            document.getElementById("score").innerText = this.score.toString();
            function scoreReached() {
                let boardDivs = document.querySelectorAll("#board div");
                let boardImgs = document.querySelectorAll("#board div img");
            
                boardDivs.forEach(function(div) {
                    div.style.backgroundImage = "none";
                });
            
                boardImgs.forEach(function(img) {
                    img.style.width = "0";
                    img.style.height = "0";
                });
            
                document.getElementById("board").style.backgroundImage = "url('./Images/tom_magnifico.gif')";
                
                setTimeout(function() {
                    window.location.href = "index.html";
                }, 5000);

            }

            
        } else if (event.target == this.currJerryTile.firstChild) {
            document.getElementById("score").innerText = "GAME OVER: " + this.score.toString();
            this.gameOver = true;

            function gameOver() {
                let boardDivs = document.querySelectorAll("#board div");
                let boardImgs = document.querySelectorAll("#board div img");

             boardDivs.forEach(function(div) {
             div.style.backgroundImage = "none";
    });

            boardImgs.forEach(function(img) {
            img.style.width = "0";
            img.style.height = "0";
    });
                document.getElementById("board").style.backgroundImage = "url('./Images/jerry_splash.gif')";
                
                setTimeout(function() {
                    window.location.href = "index.html";
                }, 5000);
            }


            gameOver();
            
        }
    }
}

window.onload = function() {
    let game = new Game();
    game.setGame();
}
