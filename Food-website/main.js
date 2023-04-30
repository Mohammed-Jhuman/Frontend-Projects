const navMenu=document.querySelector('.nav');
const navBtn=document.querySelector('.menu__btn');
const icons=document.querySelectorAll('.hero__icons i');


navBtn.addEventListener('click',function(){
    navMenu.classList.toggle('show');
    this.classList.toggle('show');
});

let i=0;
const iconShow=function(){
   i++;
   const icon=document.querySelector('.hero__icons .show__icon');
   icon.classList.remove('show__icon');
   if(i > icons.length-1){
    i=0;
   }
   icons[i].classList.add('show__icon');
}
setInterval(iconShow,2000);
