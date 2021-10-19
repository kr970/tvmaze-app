export function filter(data, selectedGenre, selectedLanguage, pageSize) {
    const filteredByGenres = data.filter(item => {
        return selectedGenre === 'All' || item.genres.includes(selectedGenre);
    });
    const filteredByLanguages = filteredByGenres.filter(item => {
        return selectedLanguage === 'All' || item.language === selectedLanguage;
    });
    filteredByLanguages.length = Math.min(pageSize, filteredByLanguages.length);
    return filteredByLanguages;
}
