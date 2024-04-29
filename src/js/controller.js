import * as module from './module.js';
//import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views.js/recipeView.js';
import searchView from './views.js/searchView.js';
import SearchResults from './views.js/searchResults.js';
import PaginationView from './views.js/paginationView.js';
import bookmarksView from './views.js/bookmarkView.js';
// import addRecipeView from './views.js/addRecipeView.js';
 import commonView from './views.js/commonView.js';
 
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import { getSearchResultPerPage } from './module.js';
import { async } from 'regenerator-runtime';
import searchResults from './views.js/searchResults.js';
//  import paginationView from './views.js/paginationView.js';



const recipeContainer = document.querySelector('.recipe');

if(module.hot){
  module.hot.accept()
}




// https://forkify-api.herokuapp.com/v2


///////////////////////////////////////
// const loadSpinner = function(parentEL){
  

 
// parentEL.insertAdjacentHTML('afterbegin', spinnerTemp)
//  };
const controlRecipe = async function(){
  try{
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return
    
    recipeView.renderSpinner();
    
    

     //render loadspinner
     await module.loadRecipe(id);
    //  const {recipe} = module.state
   

     //rendring the recipe
     
     recipeView.render(module.state.recipe);

     SearchResults.update(module.getSearchResultPerPage());

     bookmarksView.update(module.state.bookmarks)

  }catch(err){
    // alert(err);
    recipeView.renderError()
  }
 
};
     

// controlRecipe();

const controlSearchResults = async function(){
  try{
     SearchResults.renderSpinner();
    
    const query = searchView.getQuery()
    if(!query) return
    await module.loadSearchResults(query)
    
    
    SearchResults.render(module.getSearchResultPerPage(3))

    //rendering pagination view
    PaginationView.render(module.state.search)


  }catch(err){
     SearchResults.renderError();
    
  }

}

const controlPagination = function(gotoPage){
  //rendering the search results
  SearchResults.render(module.getSearchResultPerPage(gotoPage))

  //rendering pagination view
  PaginationView.render(module.state.search)

}

const controlServings = function(newServings){
  //update the servings
 
  module.updateServings(newServings);
  

//rendering the recipe view updated

 recipeView.update(module.state.recipe)


}

const controlAddBookmark = function(){
  // add or delete bookmark
  if(!module.state.recipe.bookmarked) {
    module.addBookmarks(module.state.recipe)
  }else {
    module.deleteBookmark(module.state.recipe.id)}

    // updating the bookmark
  recipeView.update(module.state.recipe);

  //rendering the bookmark
  bookmarksView.render(module.state.bookmarks)

}

const controlBookmarks = function () {
  bookmarksView.render(module.state.bookmarks);
};

// const controlAddRecipe = async function(newRecipe){
//   try{

//     addRecipeView.renderSpinner()

//     await module.uploadRecipe(newRecipe)
//     console.log(module.state.recipe)
//     recipeView(module.state.recipe)
//     addRecipeView.renderMessage()

//     bookmarksView.render(module.state.recipe)

//     setTimeout(function(){

//     },MODAL_CLOSE_SEC * 1000)

//     window.history.pushState(null, '', `${module.state.recipe.id}`)

    
//     addRecipeView._toggleWindow()
//   }catch(err){
//     console.error('💥', err);
//     console.log(err);

//   }
  
// }

const init = function(){
  recipeView.addhandlerRender(controlRecipe)
  recipeView.addHandlerRecipeUpdate(controlServings)
  searchView.addHandlerSearch(controlSearchResults)
  PaginationView.addHandlerClick(controlPagination)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  bookmarksView.addHandlerRender(controlBookmarks)
  // addRecipeView.addHandlerUpload(controlAddRecipe)
  
  
}
init()