import { async } from 'regenerator-runtime';
import {API_URL, RES_PER_PAGE} from './config.js'
// import { getJSON, sendJSON } from './helpers.js';
import { getJSON } from './helpers.js';
// import { searchView } from './views.js/searchView.js';
export const state = {
    recipe: {},
    search: {
        query : '',
        results : [],
        page: 1,
        resultPerPage: RES_PER_PAGE,
    },
    bookmarks : [],
};

const createRecipeObeject = function(url){
    
    const recipe  = url.data.recipe
    return {
     id: recipe.id,
     title: recipe.title,
     publisher: recipe.publisher,
     sourseUrl: recipe.source_url,
     image: recipe.image_url,
     ingredients: recipe.ingredients,
     cookingTime: recipe.cooking_time,
     servings: recipe.servings,
     
    }
}

    

export const loadRecipe = async function (id)  {
    try{
        const url = await getJSON(`${API_URL}${id}`)

         state.recipe = createRecipeObeject(url)

        
        // const res = await fetch(
        //     `${API_URL}/${id}`);
      
        //    const data = await res.json();
           
        //    if(!res.ok) throw new Error(`${data.message}(${res.status})` )
        if(state.bookmarks.some(bookmark => bookmark.id === id))
           state.recipe.bookmarked = true; 
           else state.recipe.bookmarked = false
        

    }catch(err){
        throw err;
    }
    
} 

export const loadSearchResults = async function(query){
       try{
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`)
        //console.log(data)
       state.search.results = data.data.recipes.map(eachRec => {
          return {
            id: eachRec.id,
            title: eachRec.title,
            publisher: eachRec.publisher,
            image: eachRec.image_url,
            
          }   
          
        })
        state.search.page = 1

       }catch(err){
        throw err;
       }

    }

    export const getSearchResultPerPage = function(page = state.search.page){
        state.search.page = page;
        const start = Number((page - 1) * state.search.resultPerPage);
        const end = Number(page * state.search.resultPerPage);


        return state.search.results.slice(start, end)
         
         

         
    };

       export const updateServings = function(newServings){
        if (newServings === null ) return
        state.recipe.ingredients.forEach(ing => {
            ing.quantity = Math.ceil((+ing.quantity * newServings)/state.recipe.servings)
            
        });

         state.recipe.servings = newServings
        
       }
    //    getSearchResultPerPage(2)

     const persistBookmark = function(){
        localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
    }
     
    export const addBookmarks = function(recipe){
        //add bookmarks
        state.bookmarks.push(recipe)
        

        //add curent bookmars
        if(recipe.id === state.recipe.id) state.recipe.bookmarked = true

        persistBookmark()

    }

    export const deleteBookmark = function(id){
        const index = state.bookmarks.findIndex(el => el.id === id)
        state.bookmarks.splice(index, 1)

        //mark current recipe as not bookmark
        if(id === state.recipe.id ) state.recipe.bookmarked = false; 

        persistBookmark()
    }

    const init = function(){
        const storage = localStorage.getItem('bookmarks')
        if(storage) state.bookmarks = JSON.parse(storage)
        
        //console.log(state.bookmarks)
    }
    init();
    console.log(state.bookmarks)

    // export const uploadRecipe = async function(newRecipe){
    //     try{

    //         const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
    //         .map(ing => {
    //             const newArr = ing[1].replaceAll(' ', '').split(',')
    //             // if(newArr !== 3) throw new Error('wrong ingredient format, use the correct format!')
    //             const [quantity, unit, description] = newArr
    //         return{quantity: quantity ? +quantity : null, unit, description};
    //     })

    //     const recipe = {
    //         title: newRecipe.title,
    //         source_url: newRecipe.sourseUrl,
    //         publisher: newRecipe.publisher,
    //         servings: +newRecipe.servings,
    //         image_url: newRecipe.image,
    //         cooking_time: +newRecipe.cookingTime,
    //         ingredients,
    //     }

    //     const data = sendJSON(`${API_URL}?KEY=${KEY}`, recipe)
    //     state.recipe = createRecipeObeject(data)
    //     addBookmarks(state.recipe)
    
    //     console.log(data)
    //     }catch(err){
    //         throw err
    //     }

        
        
        

    

    
       

// loadSearchResults('pizza')###