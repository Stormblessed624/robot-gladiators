var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}
var getPlayerName = function(){
    var name = "";
    while (name === "" || name === null) {
        name = window.prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
}
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    killCount: 0,
    reset: function() {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 30;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!")
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!")
        }


    }
};

var enemyInfo = [
    {
        name: "Roberto",
        attack: randomNumber(7, 10)
    },
    {
        name: "Amy Android",
        attack: randomNumber(8, 12)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    },
    {
        name: "Error Eater",
        attack: randomNumber(11, 15)
    },
    {
        name: "Destroyinator",
        attack: randomNumber(12, 16)
    },
    {
        name: "Evil Robo-Cop",
        attack: randomNumber(14, 18)
    },
];

// Alert players that they are starting the round
// window.alert("Welcome to Robot Gladiators!");

var fightOrSkip = function() {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    var promptFight = promptFight.toLowerCase();

    if (promptFight === "" || promptFight === null) {
        window.alert("You need to enter a valid answer! Please try again.");
        return fightOrSkip();
    }

    if (promptFight === "skip") {

        // confirm the player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        
        //if yes leave fight and penalize $10
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip the fight. Goodbye!");
            // subtract money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            return true;
        }
    }
    return false;
}
var fight = function(enemy) {


    var isPlayerTurn = true;
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    // repeat and execute as long as the enemy-robot is alive
    while( enemy.health > 0 && playerInfo.health > 0) {

        if (isPlayerTurn) {
            if(fightOrSkip()) {
            break;
            }

            // Subtract the value of 'playerInfo.attack' from the value of 'enemy.health' and use that result to update  the value in the 'enemy.health' variable.
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack)

            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name + 
                " attacked " + 
                enemy.name + 
                " with " + 
                damage + 
                " damage. " + 
                enemy.name + 
                " now has " + 
                enemy.health + 
                " health remaining."
            );

            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                playerInfo.killCount += 1;
                playerInfo.money += 3;
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
// Attacking player Section
        } else {
            // Subtract the value of 'enemy.attack' from the value of 'playerInfo.health' and use that result to update the value in the 'playerInfo.health' variable.
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                enemy.name + 
                " attacked " + 
                playerInfo.name + 
                " with " + 
                damage + 
                " damage. " + 
                playerInfo.name + 
                " now has " + 
                playerInfo.health + 
                " health remaining."
            );

            //check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        isPlayerTurn = !isPlayerTurn;
    }
}

var startGame = function() {
    //reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            var pickedEnemyObj = enemyInfo[i];

            pickedEnemyObj.health = randomNumber(40, 60);
            
            fight(pickedEnemyObj);   
            
            if (i < enemyInfo.length - 1 && playerInfo.health > 0) {
                //confirm the player wants to shop
                var storeConfirm = window.confirm("The fight is over, you have " + playerInfo.money + " dollars. visit the store before the next round?");

                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }

        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
            }

    }
    // Play again
    endGame();
}

var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");

    var highScore = localStorage.getItem("highScore")
    highScore = highScore || 0;

    //if player has more money than the high score, player has new high score.
    if (playerInfo.killCount > highScore) {
        localStorage.setItem("highScore", playerInfo.killCount);
        localStorage.setItem("name", playerInfo.name);

        alert("Congratulations! " + 
        playerInfo.name + 
        " now has the high score of " + 
        playerInfo.killCount + 
        " kills!");
    } else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + " kills. Maybe next time!");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back again soon!");
    }
}

var shop = function() {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE to make a choice."
        );

        shopOptionPrompt = parseInt(shopOptionPrompt);

    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;

        case 2:    
            playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert("Leaving the store.");
            // do nothing, so function will end
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
}

startGame();

// Game StatesPHI
// "Win" - Player robot has defeated all enemy-robots
//     * Fight all enemy-robots
//     * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less
//"REPLAY" - if player wins or loses offer to play again
//"SHOP" - between fights player enters shop
//      * Buy health
//      * Buy attack upgrade
//      * Leave shop