// SWITCHING BETWEEN LOGIN AND SIGNUP CARDS
function toggle() {
    var lcard = document.getElementById("card-login");
    var scard = document.getElementById("card-signup");
    var head = document.querySelector('h1');
    if (scard.style.display === "none") {
        lcard.style.display = "none";
        scard.style.display = "block";
        head.textContent = "Just one last step before you're all set to go!";
      } else {
        lcard.style.display = "block";
        scard.style.display = "none";
        head.textContent = 'Welcome back to Ensemble!';
      }
};


const signup = document.getElementById('signup');
signup.addEventListener('submit', (e) =>{
  e.preventDefault();
  const email = document.getElementById('semail').value;
  const sname = document.getElementById('susername').value;
  const password = document.getElementById('spassword').value;
  const question = document.getElementById('question').value;
  const answer = document.getElementById('answer').value;
  console.log(email, sname,password, question, answer);
  const base = `https://61c0-146-196-33-36.ngrok.io/authentication/register`;
  const req = `?username=${sname}&email=${email}&password=${password}`;
  const query = `${base}${req}`;
  console.log(query);
  const Sign = async () => {
    const response = await fetch(query, {
      method: 'POST'
  });
  const data = await response.json();
  console.log(data);
  } 
  Sign();
})



const login = document.getElementById('login');
login.addEventListener('submit', (e) =>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const base = `https://61c0-146-196-33-36.ngrok.io/authentication/login`;
    const req = `?email=${email}&password=${password}`;
    const query = `${base}${req}`;
    const logy = async () => {
      const response = await fetch(query, {
        method: 'POST'
    });
    const data = await response.json();
    console.log(data.message);

      if(data.status == 200){
        window.location.href = '../boards.html';
      }
    } 
    logy();

})