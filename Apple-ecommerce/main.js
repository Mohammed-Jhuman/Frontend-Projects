const cube=document.querySelector('.cube');


let i=0;

const rotateCube=function(){
    i++;
    cube.style.transform=`rotateY(${i++}deg)`;
}
setInterval(rotateCube,100);


const headerImgs=document.querySelectorAll('.header__img');


let j=0;

const slideShow=function(){
    j++;
    const headerImgActive=document.querySelector('.header__img.show');
    headerImgActive.classList.remove('show');
    if(j > headerImgs.length-1){
        j=0;
    }
    headerImgs[j].classList.add('show');
}
setInterval(slideShow,5000);

const mobileBtnOpen=document.querySelector('.mobile-btn--open');
const sidebar=document.querySelector('.nav__items.sidebar');
const mobileBtnContainer=document.querySelector('.mobile-btn');
const mobileBtnClose=document.querySelector('.mobile-btn--close');

mobileBtnOpen.addEventListener('click',function(){
    sidebar.style.transform=`translateX(0%)`;
    mobileBtnContainer.style.transform=`rotate(142deg)`;
});

mobileBtnClose.addEventListener('click',function(){
    sidebar.style.transform=`translateX(-100%)`;
    mobileBtnContainer.style.transform=`rotate(0)`;
});


const iphoneContainer=document.querySelector('.iphone-container');
const iphoneShow=function(){
    iphoneContainer.classList.toggle('show2');
};
iphoneContainer.addEventListener('mouseenter',iphoneShow);
iphoneContainer.addEventListener('mouseleave',iphoneShow);


const macbookSection=document.querySelector('.macbook-section');

const openMac=function(entries,observer){
    const [entry]=entries;
    if(!entry.isIntersecting) return;
    const container=entry.target.querySelector('.macbook-container');
    container.classList.add('change');
    observer.unobserve(entry.target);
};
const sectionObserver=new IntersectionObserver(openMac,{
    root:null,
    threshold:0.3
});
sectionObserver.observe(macbookSection);



const sliderContainer=document.querySelector('.horizontal-slider');
const sliderContainerVertical=document.querySelector('.vertical-slider');
const sliderContent=document.querySelectorAll('.horizontal-slide');
const rightBtn=document.querySelector('.right-arrow');
const leftBtn=document.querySelector('.left-arrow');
const downBtn=document.querySelector('.down-arrow');
const upBtn=document.querySelector('.up-arrow');

let currTransformHori=12.5;
let currTransformVer=0;

const horizontalSlide=function(){
    if(currTransformHori === 112.5){
        rightBtn.classList.add('hidebtn');
    }else {
        rightBtn.classList.remove('hidebtn');
    }
    if(currTransformHori === -112.5){
        leftBtn.classList.add('hidebtn');
    }else{
        leftBtn.classList.remove('hidebtn')
    }
};
const verticalSlide=function(){
    if(currTransformVer === -75){
        upBtn.classList.add('hidebtn');
    }else{
        upBtn.classList.remove('hidebtn');
    }
    if(currTransformVer === 150){
        downBtn.classList.add('hidebtn');
    }else{
        downBtn.classList.remove('hidebtn');
    }
}
rightBtn.addEventListener('click',function(){
    sliderContainer.style.transform=`translateX(${currTransformHori += 25}rem)`;//25
    horizontalSlide();
});

leftBtn.addEventListener('click',function(){
    sliderContainer.style.transform=`translateX(${currTransformHori -= 25}rem)`;
    horizontalSlide();
});

upBtn.addEventListener('click',function(){
    sliderContainerVertical.style.transform=`translateY(${currTransformVer -= 25}rem)`;
    verticalSlide();
});
downBtn.addEventListener('click',function(){
    sliderContainerVertical.style.transform=`translateY(${currTransformVer += 25}rem)`;
    verticalSlide();
});


const topTopBtn=document.querySelector('.to-top--btn');


topTopBtn.addEventListener('click',function(e){
    e.preventDefault();
    const id=this.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
});
