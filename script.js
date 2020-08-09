//selectors
const submitButton = document.querySelector(".submit-button");
const searchText = document.getElementById("search-text");
const ingredientSearch = document.querySelector(".ingredient-search")
const form = document.getElementById("form");
const display = document.querySelector("#drinks-display");
const luckyButton = document.querySelector(".lucky");

const myHeaders = new Headers();
myHeaders.append(
  "Cookie",
  "__cfduid=d4eacef850d8be8a7955a15dccbd102a31596984531"
);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

function getDrinkNames() {
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText.value}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => DisplayResults(result));
  searchText.value = "";
  display.innerHTML = "";
}


function returnRandom(result) {
  const drinkNames = result.drinks;
  drinkNames.forEach(element => {
    let { thumbnail, div, drink, instructions } = declareVar();
    thumbnail.classList = "drink-thumbnail card-img-top";
    div.classList = "col-sm-4 mt-3 card";
    thumbnail.src = element.strDrinkThumb;
    drink.innerText = element.strDrink;
    instructions.innerText = element.strInstructions;

    div.appendChild(thumbnail);
    div.appendChild(drink);
    div.appendChild(instructions);

    display.appendChild(div)
  })
  function declareVar() {
    let drink = document.createElement("h3");
    let thumbnail = document.createElement("img");
    let div = document.createElement("div");
    let instructions = document.createElement("p");
    return { thumbnail, div, drink, instructions };
  }
}


function DisplayResults(result) {
  const drinkNames = result.drinks;
  if (result.drinks == null) {
    // alert("bummer");
    display.innerHTML = "<h2 style='color: white'> No Drinks :( </h2>";
    return;
  }
  drinkNames.forEach((element) => {
    let { thumbnail, div, drink, instructions } = declareVar();
    //thumbnail from API
    thumbnail.classList = "drink-thumbnail card-img-top";
    thumbnail.src = element.strDrinkThumb;
    div.appendChild(thumbnail);

    //drink title
    drink.innerText = element.strDrink;
    div.appendChild(drink);

    //drink instructions in p element
    instructions.innerText = element.strInstructions;
    div.appendChild(instructions);
    div.classList = "col-sm-4 mt-3 card";
    display.appendChild(div);
  });


  function declareVar() {
    let drink = document.createElement("h3");
    let thumbnail = document.createElement("img");
    let div = document.createElement("div");
    let instructions = document.createElement("p");
    return { thumbnail, div, drink, instructions };
  }
}


function randomize() {
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/random.php`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => returnRandom(result));
  searchText.value = "";
  display.innerHTML = "";
}

document.addEventListener("keydown", function (event) {
  if (event.keyCode == 13) {
    getDrinkNames();
  }
});

//listeners
submitButton.addEventListener("click", getDrinkNames);
luckyButton.addEventListener("click", randomize);
