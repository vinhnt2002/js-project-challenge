
// declare to get ID
const mealsEl = document.getElementById('meal');
const favoriteContainer = document.getElementById("fav-meals");

const searchTerm = document.getElementById('search-term');
const searchBTN = document.getElementById('search');


const mealPopup = document.getElementById('meal-popup');
const popupCloseBTN = document.getElementById('close-popup');
const mealInfoEl = document.getElementById('meal-info');

getRandomMeal();
fetchFavMeals();

// CALL API

async function getRandomMeal() {

    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    // console.log(randomMeal);


    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
    const respData = await resp.json();

    const meal = respData.meals[0];
    // console.log(meal)
    return meal;
}

async function getMealBySearch(term) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);

    const respData = await resp.json();

    const meals = respData.meals;
    return meals;

}


// TO DO
function addMeal(mealData, random = false) {
    console.log(mealData)

    const meals = document.createElement('div');
    meals.classList.add('meals');

    meals.innerHTML = `
    <div class="meals-header">
        ${random ? ` <span class="random">Random Recipe</span>` : ''}
        
        <img src="${mealData.strMealThumb}"
        alt = "${mealData.strMeal}"
        />
    </div>

    <div class="meals-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn "><i class="fa fa-heart"></i></button>
    </div>
`;

    //Click button method
    const btn = meals.querySelector(".meals-body .fav-btn");
    btn.addEventListener("click", () => {
        if (btn.classList.contains("active")) {
            removeMealsLS(mealData.idMeal);
            btn.classList.remove("active");
            // location.reload()
        } else {
            addMealLS(mealData.idMeal);
            btn.classList.add("active")
            // location.reload()
        }
        fetchFavMeals();
    });


    //creat by apendChild
    mealsEl.appendChild(meals)
}



// get meals from localStorage 
function getMealsLS() {
    const mealIDs = JSON.parse(localStorage.getItem("mealIDs"));

    return mealIDs === null ? [] : mealIDs;
}


// add the new mealID to the mealIDs in the localStorage
function addMealLS(mealID) {
    const mealIDs = getMealsLS();

    localStorage.setItem("mealIDs", JSON.stringify([...mealIDs, mealID]));
}

// remove
function removeMealsLS(mealID) {
    const mealIDs = getMealsLS();

    localStorage.setItem("mealIDs", JSON.stringify(mealIDs.filter((id) => id !== mealID)));
}

// To show 
async function fetchFavMeals() {

    // clear the fav
    favoriteContainer.innerHTML = "";

    const mealIDs = getMealsLS();
    for (let i = 0; i < mealIDs.length; i++) {
        const mealID = mealIDs[i];
        console.log(mealID)   // is show the id in local storage 
        const meal = await getMealById(mealID);
        addMealFav(meal);
        // meals.push(meal);
    }
    // add them to the screen
}

// add to the meal favorite
function addMealFav(mealData) {

    const favMeal = document.createElement("li");

    favMeal.innerHTML = `
    <img src="${mealData.strMealThumb}" 
         alt="${mealData.strMeal}"
    /><span>${mealData.strMeal}</span>
    <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    const btn = favMeal.querySelector('.clear');
    btn.addEventListener('click', () => {
        removeMealsLS(mealData.idMeal);

        fetchFavMeals();
    });

    favoriteContainer.appendChild(favMeal);
}


searchBTN.addEventListener("click", async () => {

    // clean container
    mealsEl.innerHTML = "";

    const search = searchTerm.value;
    const meals = await getMealBySearch(search);

    if (meals) {
        meals.forEach((meal) => {
            addMeal(meal);
        });
    }
});


// dont need
// popupCloseBTN.addEventListener("click", () => {
//     mealPopup.classList.add('hidden');
// });