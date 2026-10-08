// ============================================
// TUTORIAL 5: ARRAY METHODS FOR DATA
// From ONE element to MANY elements
// ============================================

// Restaurant data - this is what we'll work with
const restaurants = [
    {
        "id": 1,
        "name": "Milano's Italian Restaurant",
        "cuisine": "Italian",
        "rating": 4.5,
        "priceRange": "$$",
        "neighborhood": "College Park",
        "hours": "11am-10pm",
        "specialties": ["pasta", "pizza"],
        "phoneNumber": "(301) 555-0123"
    },
    {
        "id": 2,
        "name": "Sakura Sushi",
        "cuisine": "Japanese",
        "rating": 4.2,
        "priceRange": "$$$",
        "neighborhood": "Downtown",
        "hours": "5pm-11pm",
        "specialties": ["sushi", "ramen"],
        "phoneNumber": "(301) 555-0456"
    },
    {
        "id": 3,
        "name": "Border Café",
        "cuisine": "Mexican",
        "rating": 4.0,
        "priceRange": "$",
        "neighborhood": "University District",
        "hours": "10am-12am",
        "specialties": ["tacos", "burritos"],
        "phoneNumber": "(301) 555-0789"
    },
    {
        "id": 4,
        "name": "The Brass Elephant",
        "cuisine": "American",
        "rating": 4.8,
        "priceRange": "$$$$",
        "neighborhood": "Historic District",
        "hours": "5pm-10pm",
        "specialties": ["steaks", "seafood"],
        "phoneNumber": "(301) 555-0012"
    },
    {
        "id": 5,
        "name": "Pho Corner",
        "cuisine": "Vietnamese",
        "rating": 4.3,
        "priceRange": "$",
        "neighborhood": "College Park",
        "hours": "11am-9pm",
        "specialties": ["pho", "banh mi"],
        "phoneNumber": "(301) 555-0345"
    },
    {
        "id": 6,
        "name": "Tandoor Palace",
        "cuisine": "Indian",
        "rating": 4.1,
        "priceRange": "$$",
        "neighborhood": "Downtown",
        "hours": "12pm-10pm",
        "specialties": ["curry", "naan"],
        "phoneNumber": "(301) 555-0678"
    },
    {
        "id": 7,
        "name": "Le Petit Bistro",
        "cuisine": "French",
        "rating": 4.6,
        "priceRange": "$$$",
        "neighborhood": "Historic District",
        "hours": "6pm-10pm",
        "specialties": ["wine", "cheese"],
        "phoneNumber": "(301) 555-0901"
    },
    {
        "id": 8,
        "name": "Seoul Kitchen",
        "cuisine": "Korean",
        "rating": 4.4,
        "priceRange": "$$",
        "neighborhood": "University District",
        "hours": "11am-11pm",
        "specialties": ["bbq", "kimchi"],
        "phoneNumber": "(301) 555-0234"
    }
];

// Wait for the page to load
document.addEventListener('DOMContentLoaded', () => {
    const displayButton = document.querySelector('#display-button');
    const restaurantList = document.querySelector('#restaurant-list');

    const filterButton = document.querySelector('#filter-button');
    const filteredList = document.querySelector('#filtered-list');

    const mapButton = document.querySelector('#map-button');
    const mappedList = document.querySelector('#mapped-list');

    const findButton = document.querySelector('#find-button');
    const foundItem = document.querySelector('#found-item');

    // 1. forEach: Display every restaurant's name and cuisine
    displayButton.addEventListener('click', () => {
        restaurantList.innerHTML = '';

        restaurants.forEach((restaurant) => {
            restaurantList.innerHTML += `
                <div class="restaurant-item">
                    <div class="restaurant-name">${restaurant.name}</div>
                    <div class="restaurant-cuisine">${restaurant.cuisine}</div>
                </div>
            `;
        });
    });

    // 2. filter: Create a new array of affordable restaurants
    filterButton.addEventListener('click', () => {
        const cheapRestaurants = restaurants.filter((restaurant) => {
            return restaurant.priceRange === '$' ||
                   restaurant.priceRange === '$$';
        });

        filteredList.innerHTML = '';

        cheapRestaurants.forEach((restaurant) => {
            filteredList.innerHTML += `
                <div class="restaurant-item">
                    <div class="restaurant-name">${restaurant.name}</div>
                    <div class="restaurant-cuisine">${restaurant.cuisine}</div>
                    <span class="restaurant-price">${restaurant.priceRange}</span>
                </div>
            `;
        });
    });

    // 3. map: Create a new array containing only restaurant names
    mapButton.addEventListener('click', () => {
        const names = restaurants.map((restaurant) => {
            return restaurant.name;
        });

        const list = document.createElement('ul');
        list.className = 'name-list';

        names.forEach((name) => {
            const item = document.createElement('li');
            item.textContent = name;
            list.appendChild(item);
        });

        mappedList.replaceChildren(list);
    });

    // 4. find: Get the first restaurant with a rating of 4.8
    findButton.addEventListener('click', () => {
        const bestRestaurant = restaurants.find((restaurant) => {
            return restaurant.rating === 4.8;
        });

        if (bestRestaurant) {
            foundItem.innerHTML = `
                <div class="found-restaurant">
                    <div class="restaurant-name">${bestRestaurant.name}</div>
                    <div>${bestRestaurant.cuisine}</div>
                    <div>Rating: ${bestRestaurant.rating} / 5</div>
                </div>
            `;
        } else {
            foundItem.textContent = 'No restaurant with a rating of 4.8 was found.';
        }
    });
});