import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if(module.hot) {
//   module.hot.accept();
// }


const controlRecipes = async function() {
  try {
    
    const id = window.location.hash.slice(1);

    if(!id) return;
    recipeView.renderSpinner();

    await model.loadRecipe(id);
    
    // 2) Rendering Recipe
    recipeView.render(model.state.recipe);

  } catch(err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if(!query) return;
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage());
  } catch(err) {
    console.error(err);
  }
}

const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}
init();