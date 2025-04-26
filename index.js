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
            '#FFDAB9'   // Peach
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