import { fetchFilms } from "./api.js";
import { START_PAGE, MAX_PAGE } from "./constant.js";

export let pagination = {
    currentPage: START_PAGE,
    maxPage: MAX_PAGE
}

export function loadNextPage() {
    pagination.currentPage = pagination.currentPage === pagination.maxPage ?
        pagination.maxPage : pagination.currentPage + 1;
    return fetchFilms(pagination.currentPage);
}

export function loadPrevPage() {
    pagination.currentPage = pagination.currentPage === START_PAGE ?
        START_PAGE : pagination.currentPage - 1;
    return fetchFilms(pagination.currentPage);
}

export function loadLastPage() {
    pagination.currentPage = pagination.maxPage;
    return fetchFilms(pagination.currentPage);
}

export function loadPage(value) {
    pagination.currentPage = value;
    return fetchFilms(pagination.currentPage);
}



