const navBtn=document.querySelector('.nav__btn');
const nav=document.querySelector('.nav');
const headingFirst=document.querySelectorAll('.header__titles span');


navBtn.addEventListener('click',function(){
    nav.classList.toggle('change');
});

let i=0;

const showHeading=function(){
    i++;
    const headingCurr=document.querySelector('.show');
    headingCurr.classList.remove('show');
    if(i > headingFirst.length - 1){
        i=0;
    }
    headingFirst[i].classList.add('show');
}
setInterval(showHeading,4000);

const video=document.querySelector('.about__video');
const videoBar=document.querySelector('.video__bar');
const playBtn=document.querySelector('.play');

const playPause=function(){
    if(video.paused){
        video.play();
        const iconPause=`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z"/></svg>
        `;
        playBtn.innerHTML=iconPause;
        video.style.opacity=0.7;
        
    }else{
        video.pause();
        const iconPlay=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"/></svg>
`;
playBtn.innerHTML=iconPlay;
video.style.opacity=0.3;
    }
};
playBtn.addEventListener('click',playPause);

video.addEventListener('timeupdate',()=>{
    // console.log(video.currentTime,video.duration)
    barWidth=video.currentTime/video.duration;
    videoBar.style.width=`${barWidth*100}%`;
    if(video.ended){
        const iconPlay=`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"/></svg>
`;
playBtn.innerHTML=iconPlay;
video.style.opacity=0.3;
    }
});
