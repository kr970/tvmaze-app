import { pagination } from "./pagination.js"
import { START_PAGE, MAX_PAGE } from "./constant.js";

const authorization = document.getElementById('authorization');
const userName = document.getElementById('user-name');
const header = document.getElementById('header');
const main = document.getElementById('main');
const footer = document.getElementById('footer');
const sectionWithFilms = document.getElementsByClassName('films')[0];
const paginationNode = document.getElementById('pagination');
const currentPage = document.getElementById('current-page');
const maxPage = document.getElementById('max-page');
const paginationAllPages = document.getElementById('pagination-all-pages');
const filterSection = document.getElementById('filter');
const allGenresOption = document.getElementById('all-genres');
const allLanguagesOption = document.getElementById('all-languages');
const defaultPageSize = document.getElementById('default-page-size');

const body = document.body;
let paginationIsOpened = false;

export function toggleMainPage() {
    const nodes = [authorization, header, main, footer];
    nodes.forEach(node => node.classList.toggle('not-visible'));
}

export function renderUserName(name) {
    userName.innerText = name;
}

export function renderFilms(data, callbackAddFav, callbackDeleteFav, favourites) {
    sectionWithFilms.innerHTML = '';
    if (!data.length) {
        const p = document.createElement('p');
        p.innerText = 'Films not found';
        sectionWithFilms.append(p);
        return;
    }
    for (let i = 0; i < data.length; i++) {
        const container = document.createElement('div');
        container.classList.add('film');
        const img = setImage(data[i].image);
        img.addEventListener('click', () => renderModal(data[i]));
        const div = document.createElement('div');
        div.classList.add('film__title');
        const name = document.createElement('a');
        name.setAttribute('href', '#');
        name.innerText = data[i].name;
        const icon = setIcon(data[i], callbackAddFav, callbackDeleteFav, favourites);
        container.append(img);
        div.append(name);
        div.append(icon);
        container.append(div);
        sectionWithFilms.append(container);
    }
}

function setImage(image) {
    const img = document.createElement('img');
    if (image) {
        img.setAttribute('src', image.medium);
    } else {
        img.setAttribute('src', './images/no-available.jpg');
        img.setAttribute('class', 'no-avaliable-poster');
    }
    return img;
}

function setIcon(data, callbackAddFav, callbackDeleteFav, favourites) {
    const icon = document.createElement('span');
    let isFavourite = favourites.some(film => film.name === data.name);
    icon.setAttribute('class', isFavourite ? 'icon-heart-solid' : 'icon-heart-regular');
    icon.addEventListener('click', () => {
        isFavourite = !isFavourite;
        toggleIcon(icon);
        if (isFavourite) {
            callbackAddFav(data);
        } else {
            callbackDeleteFav(data);
        }
    });
    return icon;
}

function toggleIcon(icon) {
    const currentClassName = icon.className;
    icon.className = currentClassName === 'icon-heart-solid' ?
        'icon-heart-regular' : 'icon-heart-solid';
}

export function resetSearch(node) {
    node.value = '';
}

function renderModal(data) {
    const modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    const modalContent = document.createElement('div');
    modalContent.setAttribute('class', 'modal__content fadeIn');
    const img = setImage(data.image);
    const modalText = document.createElement('div');
    modalText.setAttribute('class', 'modal__text');
    const filmName = document.createElement('p');
    filmName.setAttribute('class', 'film-name')
    filmName.innerText = data.name;
    const filmGenre = document.createElement('p');
    const genres = data.genres.join();
    filmGenre.innerText = genres;
    const filmLang = document.createElement('p');
    filmLang.innerText = data.language;
    const filmDescription = document.createElement('p');
    filmDescription.innerHTML = data.summary;
    const btnClose = document.createElement('span');
    btnClose.innerHTML = '&times;';
    btnClose.setAttribute('class', 'close');
    body.addEventListener('click', (e) => deleteModal(e, modal));
    btnClose.addEventListener('click', () => deleteModalByBtn(modal));
    modalText.append(filmName);
    modalText.append(filmGenre);
    modalText.append(filmLang);
    modalText.append(filmDescription);
    modalContent.append(img);
    modalContent.append(modalText);
    modalContent.append(btnClose);
    modal.append(modalContent);
    body.prepend(modal);
}

function deleteModal(e, node) {
    if (e.target == node) {
        node.remove();
    }
}

function deleteModalByBtn(node) {
    node.remove();
}

export function setPagination() {
    currentPage.innerText = pagination.currentPage;
    maxPage.innerText = pagination.maxPage;
}
setPagination();

export function hidePagination() {
    paginationNode.classList.add('not-visible');
}

export function showPagination() {
    paginationNode.classList.remove('not-visible');
}

export function renderAllPages(callback) {
    for (let i = START_PAGE; i <= MAX_PAGE; i++) {
        const span = document.createElement('span');
        span.innerText = i;
        paginationAllPages.append(span);
        span.addEventListener('click', () => {
            callback(i);
            setPagination();
        });
    }
}

export function toggleAllPages() {
    if (!paginationIsOpened) {
        paginationAllPages.classList.remove('hidden');
        paginationIsOpened = !paginationIsOpened;
        return
    }
    paginationAllPages.classList.add('hidden');
    paginationIsOpened = !paginationIsOpened;
}

export function showFilter() {
    filterSection.classList.remove('hidden');
}

export function hideFilter() {
    filterSection.classList.add('hidden');
}

export function resetFilters() {
    const nodes = [allGenresOption, allLanguagesOption, defaultPageSize];
    nodes.forEach(node => {
        node.setAttribute('selected', 'selected');
    });
}