const spinner = document.getElementById('spinner');
const cards = document.getElementById('cards');
const searchInput = document.getElementById('searchInput');
const searchIcon = document.getElementById('searchIcon');
const recipeModal = document.getElementById('recipe-modal');
const bottomToTop = document.getElementById('bottomToTop');
const pageOffset = window.pageYOffset;

// SEARCH ACTION
searchInput.addEventListener('click', () => {
    cards.innerHTML = '';
    spinner.classList.remove('hidden');
    const searchInputValue = searchInput.value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputValue}`;
    fetch(url).then(response => response.json()).then(data => {
        const meals = data.meals;
        if (!meals) {
            cards.innerHTML = `<h3 class="text-3xl text-center">Nothing found for ${searchInputValue}</h3>`;
            spinner.classList.add('hidden');
        }
        meals.forEach((meal) => {
            const {strMeal, strInstructions, strMealThumb, strTags, idMeal} = meal;
            let htmlCard = `<div class="card bg-base-100 shadow-xl">
            <figure class="px-10 pt-10">
                <img src="${strMealThumb}" alt="${strTags}"
                     class="rounded-xl"/>
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title text-3xl">${strMeal}</h2>
                <p>${strInstructions.slice(0, 100) + '...'}</p>
                <div class="card-actions">
                    <button class="btn btn-primary" onclick="openModal(${idMeal})">View</button>
                </div>
            </div>
        </div>`;
            cards.innerHTML += htmlCard;
        });
        spinner.classList.add('hidden');
    }).catch((err) => {
        console.log(err);
    })
})

// Window Load
window.addEventListener('load', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=').then(response => response.json()).then(data => {
        const meals = data.meals;
        meals.forEach((meal) => {
            const {strMeal, strInstructions, strMealThumb, strTags, idMeal} = meal;
            let htmlCard = `<div class="card bg-base-100 shadow-xl">
            <figure class="px-10 pt-10">
                <img src="${strMealThumb}" alt="${strTags}"
                     class="rounded-xl"/>
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title text-3xl">${strMeal}</h2>
                <p>${strInstructions.slice(0, 100) + '...'}</p>
                <div class="card-actions">
                    <button class="btn btn-primary" onclick="openModal(${idMeal})">View</button>
                </div>
            </div>
        </div>`;
            cards.innerHTML += htmlCard;
        });
        spinner.classList.add('hidden');
    }).catch((err) => {
        console.log(err);
    })
})

function openModal(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            recipeModal.innerHTML = '';
            const htmlModal = `<div class="modal-box max-w-3/4">
                                        <form method="dialog">
                                            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        <img class="rounded-xl mb-3" src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strTags}">
                                        <h3 class="font-bold text-lg">${data.meals[0].strMeal}</h3>
                                        <p class="py-4">${data.meals[0].strInstructions}</p>
                                    </div>`;
            recipeModal.innerHTML = htmlModal;
            recipeModal.showModal();
        })
        .catch((err) => {
            console.log(err);
        })
}

function closeModal() {
    recipeModal.close();
}

// BOTTOM TO TOP BUTTON STARTS HERE
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 200) {
        bottomToTop.classList.remove('hidden');
    } else {
        bottomToTop.classList.add('hidden');
    }
})
bottomToTop.addEventListener('click', () => {
    window.scroll({
        top: 0,
        behavior: "smooth"
    })
})
// BOTTOM TO TOP BUTTON ENDS HERE
