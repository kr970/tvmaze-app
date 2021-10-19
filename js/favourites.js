export function addFavourite(film) {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    localStorage.setItem('favourites', JSON.stringify([...favourites, film]));
}

export function getFavourites(){
    return JSON.parse(localStorage.getItem('favourites')) || [];
}

export function deleteFavourite(film) {
    const favourites = JSON.parse(localStorage.getItem('favourites'));
    const filteredFav = favourites.filter(item => item.name !== film.name);
    localStorage.setItem('favourites', JSON.stringify(filteredFav));
}