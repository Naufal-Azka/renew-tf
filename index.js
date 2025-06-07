const navbar = document.getElementById("navbar");
const navbarItem = document.getElementById("navbar-item");
let isNavOpen = false;


// Function to make the navbar change backdrop filter when scrolled for certain offset
const changeNavbarOnScroll = () => {
    const scrollOffset = window.scrollY;
    if (scrollOffset > 100) {
        navbar.classList.remove('text-white');

        navbar.classList.add('bg-white');
        navbarList.classList.remove('lg:text-white')
        navbarItem.classList.add('border-b-2');
    } else {
        navbar.classList.remove('bg-white');
        navbarItem.classList.remove('border-b-2');

        navbar.classList.add('text-white')
    }
}

document.addEventListener("scroll", changeNavbarOnScroll);

const navbarList = document.getElementById("navbar-list");

// Function to handle navbarList visibility based on screen size
const handleNavbarListVisibility = () => {
    if (window.innerWidth <= 768) { // Small devices
        navbarList.classList.add('navbar-list');
    } else { // Larger devices
        navbarList.classList.remove('navbar-list');
        navbarList.classList.remove('active'); 
        document.body.classList.remove('overflow-hidden'); 
        isNavOpen = false;
    }
};
handleNavbarListVisibility();

window.addEventListener('resize', handleNavbarListVisibility);

// Toggle navbar list
navbarItem.addEventListener('click', () => {
    isNavOpen = !isNavOpen;
    if (isNavOpen) {
        navbarList.classList.add('active');
        document.body.classList.add('overflow-hidden');
    } else {
        navbarList.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
    }
});

// Close navbar when clicking outside
document.addEventListener('click', (e) => {
    if (!navbarList.contains(e.target) && !navbarItem.contains(e.target)) {
        navbarList.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
        isNavOpen = false;
    }
});

// Function to handle active section highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Adjust offset as needed
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', highlightNavigation);

// Add smooth scrolling for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (isNavOpen) {
                navbarList.classList.remove('active');
                document.body.classList.remove('overflow-hidden');
                isNavOpen = false;
            }
        }
    });
});

const data = {
    datasets: [{
        data: [15, 21, 14, 8, 12, 18, 12],
        backgroundColor: [
            '#4169E1',  // Blue
            '#FFE4B5',  // Light yellow
            '#FFD1DC',  // Light pink
            '#98FB98',  // Light green
            '#D8BFD8',  // Light purple
            '#ADD8E6',  // Light blue
            '#FFDAB9',
            '#ff0000'   // Peach
        ],
        borderWidth: 0,
        cutout: '70%'  // This makes it a donut chart
    }]
};

// Chart configuration
const config = {
    type: 'doughnut',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false  // Hide the legend
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const value = context.raw;
                        const total = context.dataset.data.reduce((acc, current) => acc + current, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${context.label}: ${percentage}%`;
                    }
                }
            }
        }
    }
};

// Create chart
const myChart = new Chart(
    document.getElementById('donutChart'),
    config
);

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const closeBtn = lightbox.querySelector('.close-lightbox');
const galleryImages = document.querySelectorAll('#gallery img');

// Open lightbox
galleryImages.forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
});

// Close lightbox when clicking close button
closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
});

// Close lightbox with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
});