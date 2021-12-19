const delayPreloader = setTimeout(Preloader, 2500);

function Preloader() {
    var loader = document.querySelector('.loaderbody');
    loader.style.display = "none";
}
function stopPreloader() {
  clearTimeout(Preloader);
}

//ADDING LOG OUT FUNCTIONALITY
const logOut = () => {
  sessionStorage.clear();
  window.location.href="./login.html";
}