/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    games.forEach((game) => {
        
        console.log(`Game goal: ${game.goal}, Title: ${game.name}, Image: ${game.img}`);
        const gameCardDiv = document.createElement('div');
        gameCardDiv.classList.add('game-card');
        gameCardDiv.innerHTML = `
        <h3>${game.name}</h3>
        <img src="${game.img}" alt="${game.title}" class="game-img">
        <p>Description: ${game.description}</p>
        <p>Pledged: ${game.pledged}</p>
        <!-- Add more attributes as needed -->
        `;
        gamesContainer.appendChild(gameCardDiv);
    });
      

}

addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");


const totalContributions = GAMES_JSON.reduce((sum, game) => sum + game.backers, 0);

contributionsCard.textContent = `Total Contributions: ${totalContributions}`;


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalPledged = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);

raisedCard.textContent = `Total Pledged: $${totalPledged}`;

// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalgames = GAMES_JSON.length;

gamesCard.textContent = `Total Games: ${totalgames}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => {
    
        return game.pledged < game.goal; 
    });

    // Display the filtered games
    addGamesToPage(unfundedGames);

    
    

}










// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => {
        // Add your condition to filter unfunded games
        return game.pledged >= game.goal; // Example condition
    });

    // Display the filtered games
    addGamesToPage(fundedGames);
}




// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter(game => {
    
    return game.pledged < game.goal; 
});




// create a string that explains the number of unfunded games using the ternary operator
const unfundedgamesString = `Number of unfunded games: ${unfundedGames.length > 0 ? unfundedGames.length : 'No'} unfunded games.`;



// create a new DOM element containing the template string and append it to the description container
const newParagraph = document.createElement('p');

// Set the text content of the new paragraph with the template string
newParagraph.textContent = unfundedgamesString;

// Append the new paragraph to the description container
descriptionContainer.appendChild(newParagraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [game1,game2, ...restofgames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstWordOfMostFundedGame = game1.name.split(' ')[0];
console.log('First word of the most funded game:', firstWordOfMostFundedGame);


const game1element = document.createElement('div');
game1element.textContent = `${game1.name}`;
firstGameContainer.appendChild(game1element);





// do the same for the runner up item
const secondWordOfMostFundedGame = game2.name.split(' ')[0];
console.log('second word of the most funded game:', secondWordOfMostFundedGame);

const game2element = document.createElement('div');
game2element.textContent = `${game2.name}`;
secondGameContainer.appendChild(game2element);


