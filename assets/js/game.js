var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// Alert players that they are starting the round
// window.alert("Welcome to Robot Gladiators!");


var fight = function(enemyName) {

    // repeat and execute as long as the enemy-robot is alive
    while( enemyHealth > 0 && playerHealth > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm the player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            //if yes leave fight and penalize $2
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip the fight. Goodbye!");                
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }
// Attacking enemy Section

        // Subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update  the value in the 'enemyHealth' variable.
        enemyHealth = enemyHealth - playerAttack;

        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
// Attacking player Section

        // Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the 'playerHealth' variable.
        playerHealth = playerHealth - enemyAttack;
        
        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );

        //check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
}

var startGame = function() {
    //reset player stats for restart
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            var pickedEnemyName = enemyNames[i];

            enemyHealth = 50;
            
            fight(pickedEnemyName);        
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
            }

    }
    // Play again
    endGame();
}

var endGame = function() {
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    } else {
        window.alert("You've lost your robot battle.")
    }

    window.alert("The game has now ended. Let's see how you did!");

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back again soon!");
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

    // Shoddy replay confirmation
    // if (playerHealth <= 0 || i == enemyNames.length -1) {
    //     var replayConfirm = window.confirm("Would you like to play again?");
    //     if (replayConfirm) {
    //         i = -1;
    //         playerHealth = 100;
    //     } else {
    //         window.alert("See you next time!");
    //     }
    // }