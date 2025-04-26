const navbar = document.getElementById("navbar");
const navbarItem = document.getElementById("navbar-item");

// Function to make the navbar change backdrop filter when scrolled for certain offset
const changeNavbarOnScroll = () => {
  const scrollOffset = window.scrollY;
  if (scrollOffset > 100) {
    navbar.classList.remove('backdrop-blur-base');
    navbar.classList.remove('bg-white/20');

    navbar.classList.add('bg-white');
    navbarItem.classList.add('border-b-2');
  } else {
    
    navbar.classList.add('backdrop-blur-base');
    navbar.classList.add('bg-white/20');

    navbar.classList.remove('bg-white');
    navbarItem.classList.remove('border-b-2');
  }
}

document.addEventListener("scroll", changeNavbarOnScroll);