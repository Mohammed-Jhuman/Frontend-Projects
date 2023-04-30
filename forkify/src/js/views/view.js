export default class View{
    _data;
    render=function(data){
        if(!data || (Array.isArray(data) && data.length===0)) return this.renderError();
        this._data=data;
        const markUp=this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markUp);
    }
    _clear=function(){
        this._parentElement.innerHTML='';
    }
    spinner=function(){
        const markUp=`
        <div class="spinner">
                <svg>
                  <use href="src/img/icons.svg#icon-loader"></use>
                </svg>
              </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markUp);
      }
      update(data){
        
        this._data=data;
        const newMarkUp=this._generateMarkup();
        const newDOM=document.createRange().createContextualFragment(newMarkUp);
        /**this is same as the elements in the dom but it is a virtual dom */
        const newElements=Array.from(newDOM.querySelectorAll('*'));
        const curElement=Array.from(this._parentElement.querySelectorAll('*'));
        newElements.forEach((newEl,i)=>{
          const curEl=curElement[i];
          if(!newEl.isEqualNode(curEl) && newEl.firstChild.nodeValue.trim() !== ''){
            curEl.textContent=newEl.textContent;
          }
          if(!newEl.isEqualNode(curEl)){
            Array.from(newEl.attributes).forEach(attr=>{
              curEl.setAttribute(attr.name,attr.value)
            })
          }
        })
        
      }
      renderError(message=this._error){
        const markUp=`
        <div class="error">
              <div>
                <svg>
                  <use href="src/img/icons.svg#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markUp);
      }
      renderSuccess(message=this._message){
        const markUp=`
        <div class="message">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markUp);
      }

}