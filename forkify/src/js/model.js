import { API_URL,RES_PER_PAGE,KEY } from "./config.js";
import { getJSON,sendJSON } from './helpers.js';
export const state={
    recipe:{},
    search:{
      query:'',
      results:[],
      page:1,
      resultsPerPage:RES_PER_PAGE
    },
    bookmark:[]
};
const createRecipeObject=function(data){
   let {recipe}=data.data;
   return {
      id:recipe.id,
      image:recipe.image_url,
      sourceUrl:recipe.source_url,
      ingredients:recipe.ingredients,
      time:recipe.cooking_time,
      publisher:recipe.publisher,
      title:recipe.title,
      servings:recipe.servings,
      ...(recipe.key && {key:recipe.key})
    }
}
export const loadRecipe=async function(id){
   try{
    const data=await getJSON(`${API_URL}${id}?key=${KEY}`);
    /**
     * await because of an async function calling an async function
     */
  
    
    state.recipe=createRecipeObject(data);
   if(state.bookmark.some(bookmark=>bookmark.id===id)){
      state.recipe.bookmarked=true;
   }else{
      state.recipe.bookmarked=false
   }

   }catch(err){
      throw err;
   }
};

export const searchQuery=async function(query){
   try{
      state.search.query=query;
      const data=await getJSON(`${API_URL}?search=${query}&key=${KEY}`);
      state.search.results=data.data.recipes.map(res=>{
      return {
         id:res.id,
         image:res.image_url,
        publisher:res.publisher,
       title:res.title,
       ...(res.key && {key:res.key})
      }
   });
   // console.log(state.search.results)
}catch(err){
   throw err;
}
};

export const getSearchResultsPage=function(page=state.search.page){
   state.search.page=page;
    const start=(page-1)*state.search.resultsPerPage;
    const end=page*state.search.resultsPerPage;
   return state.search.results.slice(start,end);
};
export const updateServings=function(newServings){
  state.recipe.ingredients.forEach((ing)=>{
   ing.quantity=ing.quantity*newServings/state.recipe.servings;
  })
  state.recipe.servings=newServings;
};
const saveBookmark=function(){
   localStorage.setItem('bookmark',JSON.stringify(state.bookmark));
}
export const addBookmark=function(recipe){
   state.bookmark.push(recipe);
   if(recipe.id===state.recipe.id){
      state.recipe.bookmarked=true;
   }
   saveBookmark();
};
export const deleteBookmark=function(id){
   const index=state.bookmark.findIndex(ide=>ide.id);
   state.bookmark.splice(index,1);
   if(id===state.recipe.id){
      state.recipe.bookmarked=false;
   }
   saveBookmark();
};
const getBookmark=function(){
   const storage=localStorage.getItem('bookmark');
   if(storage){
      state.bookmark=JSON.parse(storage)
   }
};
getBookmark();
const clearBookmarks=function(){
   localStorage.clear('bookmark')
}
export const uploadRecipe=async function(newRecipe){
   try{
      const ingredients=Object.entries(newRecipe).filter(ing=>ing[0].startsWith('ingredient') && ing[1] !== '').map(ing=>{
         const ingAll=ing[1].replaceAll(' ','').split(',');
         if(ingAll.length !== 3){
            throw new Error('Please type the recipe in correct format!')
         }
         const [quantity,unit,description]=ingAll;
         return {quantity,unit,description}
      });
      const recipe={
         title:newRecipe.title,
         image_url:newRecipe.image,
         source_url:newRecipe.sourceUrl,
         cooking_time:newRecipe.cookingTime,
         publisher:newRecipe.publisher,
         servings:newRecipe.servings,
         ingredients
      }
      const data=await sendJSON(`${API_URL}?key=${KEY}`,recipe);
      state.recipe=createRecipeObject(data);
      addBookmark(state.recipe);
   }catch(err){
      throw err;
      
   }
}
