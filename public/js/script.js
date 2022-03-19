// Navbar scroll
const nav = document.querySelector("nav");
// Nav menu hover
const menus = document.querySelectorAll(".menu");
//Arrow icon
const arrow = document.querySelector(".arrow_icon");
// Preloader
const loader = document.getElementById("preloader");
// Hamburger icon toggle
const ham = document.querySelector('.ham');
// Responsive navbar
const navbar = document.querySelector('.nav_menu');
const button = document.querySelector('#contact_btn');

// Hamburger icon
ham.addEventListener('click', () => {
  navbar.classList.toggle('toggle');
  button.classList.toggle('toggle');
  document.body.classList.toggle('lock_scroll');
});

// Navbar scroll ---------------------------------
window.onscroll = function () {
  let top = window.scrollY;

  if (top >= 100) {
    //navbar scroll
    nav.classList.add("new_nav");
    //arrow icon
    arrow.classList.add("arrow_active");
  } else {
    //navbar scroll
    nav.classList.remove("new_nav");
    //arrow icon
    arrow.classList.remove("arrow_active");
  }
};

// Nav menu hover ---------------------------------
menus.forEach((menu) => {
  menu.addEventListener("click", () => {
    menus.forEach((ele) => ele.classList.remove("active"));
    menu.classList.add("active");
  });
});

// Preloader ---------------------------------
window.addEventListener("load", () => {
  loader.style.display = "none";
});

arrow.addEventListener('click', () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
})

// Contact form -----------------------------
const contactBtn = document.querySelector('.contact_btn');
const fname = document.querySelector('.first_name');
const lname = document.querySelector('.last_name');
const email = document.querySelector('.email');
const msg = document.querySelector('.message');

contactBtn.addEventListener('click', () => {
  if(fname.value.length && lname.value.length && email.value.length && msg.value.length){
    fetch('/mail', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        firstname: fname.value,
        lastname: lname.value,
        email: email.value,
        message: msg.value,
      })
    })
    .then(res => res.json())
    .then(data => alert(data))
    .catch(err => console.log(err))
  }
})