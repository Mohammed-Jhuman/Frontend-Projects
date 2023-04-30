import view from './view.js';
class AddRecipeView extends view{
    _parentElement=document.querySelector('.upload');
    _window=document.querySelector('.add-recipe-window');
    _overlay=document.querySelector('.overlay');
    _btnClose=document.querySelector('.btn--close-modal');
    _btnOpen=document.querySelector('.nav__btn--add-recipe');
    _message='Recipe upload succeded!'
    
    constructor(){
        super();
        this.addModalHandler();
    }
    modalEvent(){
        this._window.classList.toggle('hidden');
        this._overlay.classList.toggle('hidden');
    }
    addModalHandler(){
        this._btnOpen.addEventListener('click',this.modalEvent.bind(this))
        this._btnClose.addEventListener('click',this.addCloseModal.bind(this));
        this._overlay.addEventListener('click',this.addCloseModal.bind(this))
    }
    addCloseModal(){
        this._window.classList.toggle('hidden');
        this._overlay.classList.toggle('hidden');
    }
    uploadFunction(handler){
        this._parentElement.addEventListener('submit',function(e){
            e.preventDefault();
            const dataArr=[...new FormData(this)];//to get data from the form
            const data=Object.fromEntries(dataArr);//to create object from entries
            handler(data);
        })
    }
    _generateMarkup(){}
    
};
export default new AddRecipeView();