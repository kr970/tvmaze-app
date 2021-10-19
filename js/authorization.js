export function setUserName(password) {
    localStorage.setItem('user-name', password);
}

export function getUserName() {
    return localStorage.getItem('user-name');
}