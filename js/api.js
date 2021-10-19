import { API_URL, START_PAGE, MAX_FILMS_PER_PAGE } from "./constant.js";

export function fetchFilms(page = START_PAGE) {
    const promise = fetch(`${API_URL}shows?page=${page}`); 
    return promise 
    .then(data => data.json())
    .then(data => {
        data.length = MAX_FILMS_PER_PAGE;
        return data
    })
    .catch(e => console.log(e))
}

export function fetchAll() {
    const promise = fetch(`${API_URL}shows`); 
    return promise 
    .then(data => data.json())
    .then(data => {
        return data
    })
    .catch(e => console.log(e))
}

export function search(value) {
    return fetch(`${API_URL}search/shows?q=${value}`)
    .then(data => data.json())
    .then(data => data.map(item => item.show))
    .catch(e => {
        console.log(e);
    })
}

