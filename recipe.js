const searchLink = document.getElementById('search-link');
const searchBar = document.getElementById('search-bar');

searchLink.addEventListener('click', function() {
    searchBar.classList.toggle('active');
});

searchLink.addEventListener('mouseenter', function() {
    searchBar.classList.add('active');
});

searchBar.addEventListener('mouseleave', function() {
    searchBar.classList.remove('active');
});




const API_KEY = "74ea9ed0d74247e0831ed083e06ffb69";
const recipeListEl = document.getElementById("recipe-list");

function displayRecipes() {
    recipeListEl.innerHTML = "";
    recipes.forEach((recipe) => {
        const recipeItemEl = document.createElement("li");
        recipeItemEl.classList.add("recipe-item");
       
        recipeImageEl = document.createElement("img");
        recipeImageEl.src = recipe.image;
        recipeImageEl.alt = "recipe image";
        
        recipeTitleEl = document.createElement("h2");
        recipeTitleEl.innerHTML = recipe.title;
        
        recipeIngredientsEl = document.createElement("p");
        recipeIngredientsEl.innerHTML = `<strong>Ingredients:</strong> ${recipe.extendedIngredients.map((ingredient) => ingredient.original).join(", ")}`;
       
        recipeLinkEl = document.createElement("a");
        recipeLinkEl.href = recipe.sourceUrl;
        recipeLinkEl.innerText = "View Recipe";
        
        recipeItemEl.appendChild(recipeImageEl);
        recipeItemEl.appendChild(recipeTitleEl);
        recipeItemEl.appendChild(recipeIngredientsEl);
        recipeItemEl.appendChild(recipeLinkEl);
        recipeListEl.appendChild(recipeItemEl);
    });
}

async function getRecipes() {
    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=15&apiKey=${API_KEY}`);

    const data = await response.json();

    return data.recipes;
}

async function init() {
    recipes = await getRecipes();
    displayRecipes(recipes);
}

init()