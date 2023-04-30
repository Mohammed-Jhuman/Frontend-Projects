import view from './view.js';
class Pagination extends view{
    _parentElement=document.querySelector('.pagination');
    addPaginationClick(handler){
        this._parentElement.addEventListener('click',function(e){
            const btn=e.target.closest('.btn--inline');
             if(!btn)return;
            const goTo=+btn.dataset.goto;
            
            handler(goTo);
        })
    }
    _generateMarkup(){
        const curPage=this._data.page;
        const pageNum=Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log(pageNum);
        if(curPage===1 && pageNum>1){
            return`
            <button data-goto="${curPage+1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage+1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>
            `
        }
        if(curPage===pageNum && pageNum >1 ){
            return `
            <button data-goto="${curPage-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage-1}</span>
          </button>
            `
        }
        if(curPage < pageNum){
           return`
           <button data-goto="${curPage-1}" class="btn--inline pagination__btn--prev">
           <svg class="search__icon">
             <use href="src/img/icons.svg#icon-arrow-left"></use>
           </svg>
           <span>Page ${curPage-1}</span>
         </button>
         <button data-goto="${curPage+1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage+1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>
           `
        }
        if(curPage===pageNum){
            return ''
        }
    }

};
export default new Pagination();