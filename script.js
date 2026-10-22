// ============================================
// TUTORIAL 8: LIBRARY INTEGRATION
// ============================================

import {
    handleAnimationError,
    getRestaurantCoordinates,
    handleMapError,
    handleChartError,
    createRestaurantCards,
    clearExistingMap,
    restaurants,
    clickToLoad
} from './tutorial-support.js';

let myChart = null;
let myMap = null;

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#load-data-button')
        .addEventListener('click', function (event) {
            clickToLoad(event.currentTarget);
        });

    document.querySelector('#chart-button')
        .addEventListener('click', createMyChart);

    document.querySelector('#map-button')
        .addEventListener('click', createMyMap);

    document.querySelector('#animation-button')
        .addEventListener('click', animateMyCards);
});

// ============================================
// EXAMPLE 1: CHART.JS
// ============================================

function createMyChart() {
    if (typeof Chart === 'undefined') {
        handleChartError(new Error('Chart.js did not load.'));
        return;
    }

    if (restaurants.length === 0) {
        alert('Click "Load Restaurant Data" first.');
        return;
    }

    try {
        // Count restaurants for each cuisine.
        const cuisineCounts = {};

        restaurants.forEach(function (restaurant) {
            const cuisine = restaurant.cuisine || 'Unknown';
            cuisineCounts[cuisine] = (cuisineCounts[cuisine] || 0) + 1;
        });

        const chartLabels = Object.keys(cuisineCounts);
        const chartData = Object.values(cuisineCounts);

        const canvas = document.querySelector('#restaurant-chart');

        if (myChart) {
            myChart.destroy();
            myChart = null;
        }

        myChart = new Chart(canvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'Number of Restaurants',
                    data: chartData,
                    backgroundColor: [
                        '#e5989b',
                        '#90b4ce',
                        '#e9c46a',
                        '#84a98c',
                        '#b8a1d9',
                        '#f4a261',
                        '#81b7b0',
                        '#c49a86'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Restaurants by Cuisine'
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Cuisine'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            precision: 0
                        },
                        title: {
                            display: true,
                            text: 'Number of Restaurants'
                        }
                    }
                }
            }
        });

        console.log('Chart created successfully!');
    } catch (error) {
        handleChartError(error);
    }
}

// ============================================
// EXAMPLE 2: LEAFLET
// ============================================

function createMyMap() {
    if (typeof L === 'undefined') {
        handleMapError(new Error('Leaflet did not load.'));
        return;
    }

    if (restaurants.length === 0) {
        alert('Click "Load Restaurant Data" first.');
        return;
    }

    try {
        // Remove the previous map before clearing its container.
        if (myMap) {
            myMap.remove();
            myMap = null;
        }

        clearExistingMap();

        myMap = L.map('restaurant-map')
            .setView([38.9897, -76.9378], 12);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap);

        const markers = [];

        restaurants.forEach(function (restaurant, index) {
            const coords = getRestaurantCoordinates(restaurant, index);

            const popupContent = document.createElement('div');

            const name = document.createElement('strong');
            name.textContent = restaurant.name || 'Unknown Restaurant';

            const details = document.createElement('p');
            details.textContent =
                `${restaurant.cuisine || 'Unknown'} cuisine | ` +
                `Rating: ${restaurant.rating ?? 'N/A'}/5`;

            const neighborhood = document.createElement('p');
            neighborhood.textContent =
                restaurant.neighborhood || 'Unknown neighborhood';

            const note = document.createElement('small');
            note.textContent = 'Simulated location for this tutorial.';

            popupContent.append(name, details, neighborhood, note);

            const marker = L.marker(coords)
                .bindPopup(popupContent)
                .addTo(myMap);

            markers.push(marker);
        });

        if (markers.length > 0) {
            const group = L.featureGroup(markers);

            myMap.fitBounds(group.getBounds(), {
                padding: [30, 30],
                maxZoom: 14
            });
        }

        myMap.invalidateSize();

        console.log('Map created successfully!');
    } catch (error) {
        handleMapError(error);
    }
}

// ============================================
// EXAMPLE 3: GSAP
// ============================================

function animateMyCards() {
    if (restaurants.length === 0) {
        alert('Click "Load Restaurant Data" first.');
        return;
    }

    if (typeof gsap === 'undefined') {
        handleAnimationError(new Error('GSAP did not load.'));
        return;
    }

    try {
        gsap.killTweensOf('#restaurant-cards .restaurant-card');
        createRestaurantCards();

        const cards = document.querySelectorAll(
            '#restaurant-cards .restaurant-card'
        );

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            gsap.set(cards, {
                opacity: 1,
                scale: 1,
                y: 0
            });
            return;
        }

        gsap.fromTo(
            cards,
            {
                opacity: 0,
                scale: 0.8,
                y: 50
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'bounce.out'
            }
        );

        console.log('Animation created successfully!');
    } catch (error) {
        handleAnimationError(error);
    }
}

// ============================================
// CONSOLE TEST HELPER
// ============================================

window.testMyWork = function () {
    if (restaurants.length === 0) {
        console.log('Click "Load Restaurant Data" first.');
        return;
    }

    createMyChart();
    createMyMap();
    animateMyCards();
};