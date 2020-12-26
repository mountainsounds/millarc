// @ts-check
// Main Navbar Overlay
const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const navItems = document.querySelectorAll("nav ul li");
// Painting Primary & Alternate Heading Selectors
const h3s = document.querySelectorAll('.ptg h3');
const p = document.querySelectorAll('.ptg p');
// 
const portfolio = document.getElementById('portfolio');
const ptgNav = document.getElementById('ptgNav');
// Painting Gallery 
const ptgGalleries = document.querySelectorAll(".gallery");
const ptgNavItems = document.querySelectorAll("#ptgNav a");
// Form
const labels = document.querySelectorAll('.form-control label');

// Control Navigation Animation
function navAnimation(direction1, direction2) {
  navItems.forEach((nav, i) => {
    nav.classList.replace(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`);
  });
}

function toggleNav() {
  // Toggle: Menu Bars Open/Closed
  menuBars.classList.toggle('change');
  // Toggle: Menu Active
  overlay.classList.toggle('overlay-active');
  if (overlay.classList.contains('overlay-active')) {
    // Animate In - Overlay
    overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
    // Animate In - Nav Items
    navAnimation('out', 'in');
  } else {
    // Animate Out - Overlay
    overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
    // Animate Out - Nav Items
    navAnimation('in', 'out');
  }
}

function displayCorrectGallery(ptgGallery) {
  ptgGalleries.forEach(gal => gal.style.display = "none");
  ptgGallery.style.display = "flex";
}

/******** Event Listeners ********************/ 
menuBars.addEventListener('click', toggleNav);
navItems.forEach((nav) => {
  nav.addEventListener('click', toggleNav);
});

// Switches the Painting Heading on Hover
h3s.forEach((h3, i) => {
  h3.addEventListener("mouseover", (event) => {
    let heading = event.path[0];
    let ptg = event.path[1];
    if (event.path.length === 9 ) {
      ptg = event.path[2];
    } 
    // console.log(ptg);
    let ptgName = heading.innerText;
    
    ptg.style.backgroundColor = "black";
    try {
      heading.innerText = p[i].textContent;
    } catch (error) {
      console.log(error);
    }

    h3.addEventListener("mouseout", () => {
      ptg.style.backgroundColor = "#731c2d";
      heading.innerText = ptgName;
    });
  });
});

ptgNavItems.forEach((navItem, i) => {
  navItem.addEventListener('click', (event) => {
    displayCorrectGallery(ptgGalleries[i]);
  });
});
// Creates the Painting Gallery Navbar fade in/fade out effect
window.addEventListener('scroll', (event) => {
  if (window.scrollY >= portfolio.offsetTop) {
    ptgNav.style.backgroundColor = "#731c2d";
  } 
  if (window.scrollY <= portfolio.offsetTop) {
    ptgNav.style.backgroundColor = "#903749";
  }
});

// Creates the wave effect on form labels
labels.forEach(label => {
  label.innerHTML = label.innerText.split('')
      .map((letter, i) => `<span style="transition-delay:${i * 70}ms">${letter}</span>`)
      .join('');
});




