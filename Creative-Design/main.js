const bg=document.querySelector('.nav__bg');
const navBtn=document.querySelector('.nav__btn');
const line=document.querySelector('.btn__line');
const nav=document.querySelector('.nav');

const storyBtn=document.querySelectorAll('.story__btn');


navBtn.addEventListener('click',function(){
    bg.classList.toggle('shownav');
    line.classList.toggle('shownav');
    nav.classList.toggle('shownav')
});

storyBtn.forEach(btn=>{
    btn.addEventListener('click',function(){
    this.classList.toggle('change');
})});
