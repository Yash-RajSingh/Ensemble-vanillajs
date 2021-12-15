const delayPreloader = setTimeout(Preloader, 2500);

function Preloader() {
    var loader = document.querySelector('.loaderbody');
    loader.style.display = "none";
}
function stopPreloader() {
  clearTimeout(Preloader);
}
