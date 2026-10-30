/* Keep the shirt in the space actually available, including expanded sheets. */
(()=>{
 const app=document.querySelector('#app'),card=document.querySelector('#card');
 const header=app.querySelector('header'),footer=app.querySelector('footer');
 let frame;
 function update(){
  cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
   const h=app.clientHeight,top=header.offsetHeight;
   const end=card.dataset.open==='true'?card.offsetTop:footer.offsetTop;
   app.style.setProperty('--phone-top',`${top}px`);
   app.style.setProperty('--phone-bottom',`${Math.max(0,h-end)+8}px`);
   app.style.setProperty('--phone-room',`${Math.max(60,end-top-8)}px`);
  });
 }
 const ro=new ResizeObserver(update);[app,header,footer,card].forEach(el=>ro.observe(el));
 new MutationObserver(update).observe(card,{attributes:true,attributeFilter:['data-open','data-more','data-view']});
 window.addEventListener('resize',update);window.visualViewport?.addEventListener('resize',update);
 card.addEventListener('transitionend',update);update();
})();
