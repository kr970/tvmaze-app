import './scss/style.scss';
import { setUserName, getUserName } from './js/authorization.js';
import { fetchFilms, search, fetchAll } from './js/api.js';
import {
    setPagination, renderFilms, hidePagination, showPagination, showFilter, hideFilter,
    toggleAllPages, renderAllPages, toggleMainPage, renderUserName, resetSearch, resetFilters
} from './js/render.js';
import { addFavourite, getFavourites, deleteFavourite } from './js/favourites.js';
import { pagination, loadNextPage, loadPrevPage, loadLastPage, loadPage } from './js/pagination.js';
import { filter } from './js/filter.js';
import { START_PAGE } from './js/constant.js';

const submit = document.getElementById('submit');
const login = document.getElementById('login');
const userName = document.getElementById('user-name');
const userLogo = document.getElementById('user-logo');
const btnSearch = document.getElementById('btn-search');
const inputSearch = document.getElementById('input-search');
const filmsLink = document.getElementById('link-films');
const favLink = document.getElementById('link-fav');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const btnMaxPage = document.getElementById('max-page');
const btnPageList = document.getElementById('page-list');
const genres = document.getElementById('genres');
const languages = document.getElementById('languages');
const pages = document.getElementById('pages');
const allOptions = [genres, languages, pages];

if (getUserName()) {
    renderUserName(getUserName());
    toggleMainPage();
}

submit.addEventListener('click', () => {
    setUserName(login.value);
    renderUserName(login.value);
    toggleMainPage();
});
userName.addEventListener('click', toggleMainPage);
userLogo.addEventListener('click', toggleMainPage);

function render(films) {
    renderFilms(films, addFavourite, deleteFavourite, getFavourites());
}

fetchFilms().then(render);

renderAllPages(page => loadPage(page).then(render));

btnSearch.addEventListener('click', () => {
    search(inputSearch.value).then(data => render(data));
    resetSearch(inputSearch);
    hidePagination();
});
filmsLink.addEventListener('click', () => {
    fetchFilms(pagination.currentPage).then(data => render(data));
    showPagination();
    showFilter();
    resetFilters();
});
favLink.addEventListener('click', () => {
    render(getFavourites());
    hidePagination();
    hideFilter();
    resetFilters();
});
btnNext.addEventListener('click', () => {
    if (pagination.currentPage === pagination.maxPage) return;
    loadNextPage().then(data => render(data));
});
btnNext.addEventListener('click', setPagination);
btnPrev.addEventListener('click', () => {
    if (pagination.currentPage === START_PAGE) return;
    loadPrevPage().then(data => render(data));
});
btnPrev.addEventListener('click', setPagination);
btnMaxPage.addEventListener('click', () => {
    if (pagination.currentPage === pagination.maxPage) return;
    loadLastPage().then(data => render(data));
});
btnMaxPage.addEventListener('click', setPagination);
btnPageList.addEventListener('click', toggleAllPages);

allOptions.forEach(item => {
    item.addEventListener('change', () => {
        hidePagination();
        const selectedGenre = genres.value;
        const selectedLanguage = languages.value;
        const pageSize = +pages.value;
        fetchAll()
            .then(data => filter(data, selectedGenre, selectedLanguage, pageSize))
            .then(render)
    });
})

