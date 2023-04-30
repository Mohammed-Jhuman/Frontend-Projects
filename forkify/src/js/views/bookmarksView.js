import view from './view.js';
class BookmarksView extends view{
  _parentElement=document.querySelector('.bookmarks__list');
  _error='You do not have any bookmark yet!';
  _message='';
  _generateMarkup(){
      console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join('');
    
  }
  _generateMarkupPreview(results){
    const hash=window.location.hash.slice(1);
    return`
    <li class="preview">
            <a class="preview__link ${results.id===hash ? 'preview__link--active':''}" href="#${results.id}">
              <figure class="preview__fig">
                <img src="${results.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${results.title}</h4>
                <p class="preview__publisher">${results.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="src/img/icons.svg#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
    `
  };
}
export default new BookmarksView();