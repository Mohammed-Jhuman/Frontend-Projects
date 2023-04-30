import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';


// const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

//https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886

//https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
///////////////////////////////////////

const controlRecipe=async function(){
 
  try{
    const id=window.location.hash.slice(1);
    // console.log(id)

   if(!id)return;

   resultsView.update(model.getSearchResultsPage());
   bookmarksView.render(model.state.bookmark)
   //3)show spinner
   recipeView.spinner(); 

  
  //1)loadrecipe
  await model.loadRecipe(id);
  //2)render to recipe to domm
  recipeView.render(model.state.recipe);
  console.log(model.state.recipe);
  
 
  
}catch(err){
  recipeView.renderError();
  console.error(err)
}
};

const loadSearchResult=async function(){
  try{
    resultsView.spinner();
    const query=searchView.getQuery();
    if(!query)return;
    await model.searchQuery(query);
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  }catch(err){
    console.error(err)
  }
};
const paginationBtn=function(goTo){
  resultsView.render(model.getSearchResultsPage(goTo));
    paginationView.render(model.state.search);
}
const controlServings=function(updateTo){
  model.updateServings(updateTo);
  recipeView.update(model.state.recipe);
};
const controlBookmark=function(){
  if(!model.state.recipe.bookmarked){
    model.addBookmark(model.state.recipe);
  }
  else{
    model.deleteBookmark(model.state.recipe.id)
  }
  recipeView.render(model.state.recipe);
  bookmarksView.render(model.state.bookmark);
}
const uploadHandler=async function(newRecipe){
  try{
    addRecipeView.spinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    addRecipeView.render(model.state.recipe);
    addRecipeView.renderSuccess();
    bookmarksView.render(model.state.bookmark);
    window.history.pushState(null,'',`#${model.state.recipe.id}`)
    setTimeout(()=>{
      addRecipeView.modalEvent()
    },2500)
  }catch(err){
    addRecipeView.renderError(err);
    console.error(err)
  }
}
const init=function(){
  recipeView.addRenderHandler(controlRecipe);
  recipeView.addUpdateServingsHandler(controlServings);
  recipeView.addBookmarkHandler(controlBookmark);
  searchView.addSearchHandler(loadSearchResult);
  paginationView.addPaginationClick(paginationBtn);
  addRecipeView.uploadFunction(uploadHandler);
}
init();

// window.addEventListener('hashchange',controlRecipe);
// window.addEventListener('load',controlRecipe);

