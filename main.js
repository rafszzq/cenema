const movies = [
    { name: "Fnaf", image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSVPivSEOPVmHn_Egmig4GtQdvv4pQiSXqO6_p9D_CyvH63jtoD", tickets: 185, category: "terror" },
    { name: "Filme 2", image: "https://i0.wp.com/www.mundodasresenhas.com.br/wp-content/uploads/2021/08/poster-monty-python-em-busca-do-calice-sagrado-1975-filme.jpg?resize=600%2C350&ssl=1", tickets: 100, category: "Comédia" },
    { name: "Filme 3", image: "imagem1.jpg", tickets: 100, category: "Romance" },
    { name: "Filme 4", image: "imagem1.jpg", tickets: 100, category: "terror" },
    { name: "Filme 5", image: "imagem1.jpg", tickets: 100, category: "terror" },
    { name: "Filme 6", image: "imagem1.jpg", tickets: 100, category: "terror" },
    { name: "Filme 7", image: "imagem1.jpg", tickets: 100, category: "terror" },
    { name: "Filme 8", image: "imagem1.jpg", tickets: 100, category: "terror" },
    { name: "Filme 9", image: "imagem1.jpg", tickets: 100, category: "terror" },
    { name: "Filme 10", image: "imagem1.jpg", tickets: 100, category: "terror" },
    { name: "Filme 11", image: "imagem1.jpg", tickets: 100, category: "terror" },
    { name: "Filme 12", image: "imagem1.jpg", tickets: 100, category: "terror" },
    { name: "Filme 13", image: "imagem1.jpg", tickets: 100, category: "terror" },
    { name: "Filme 14", image: "imagem1.jpg", tickets: 100, category: "terror" },
    { name: "Filme 15", image: "imagem1.jpg", tickets: 100, category: "terror" },
    { name: "Filme 16", image: "imagem1.jpg", tickets: 100, category: "terror" },
    { name: "Filme 17", image: "imagem1.jpg", tickets: 100, category: "terror" },
    { name: "Filme 18", image: "imagem1.jpg", tickets: 100, category: "terror" },
    { name: "Filme 19", image: "imagem1.jpg", tickets: 100, category: "terror" },
    { name: "Filme 20", image: "imagem1.jpg", tickets: 100, category: "terror" },
];

const itemsPerPage = 10;
let currentPage = 1;

const movieList = document.getElementById("movie-list");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const pagination = document.getElementById("pagination");

function renderMovieList(page) {
    movieList.innerHTML = "";
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const filteredMovies = filterMovies(movies, searchInput.value, categoryFilter.value);

    for (let i = startIndex; i < endIndex; i++) {
        if (i < filteredMovies.length) {
            const movie = filteredMovies[i];
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <img src="${movie.image}" alt="${movie.name}">
                <h2>${movie.name}</h2>
                <p>Disponíveis: ${movie.tickets} tickets</p>
                <p>Categoria: ${movie.category}</p>
            `;
            movieList.appendChild(movieCard);
        }
    }
}

function filterMovies(movies, searchTerm, category) {
    return movies.filter(movie => 
        (movie.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === "") &&
        (category === "all" || movie.category === category)
    );
}

function generatePagination() {
    const totalPages = Math.ceil(filterMovies(movies, searchInput.value, categoryFilter.value).length / itemsPerPage);
    pagination.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("span");
        pageLink.textContent = i;
        pageLink.addEventListener("click", () => {
            currentPage = i;
            renderMovieList(currentPage);
            generatePagination();
        });
        pagination.appendChild(pageLink);
    }
}

searchInput.addEventListener("input", () => {
    currentPage = 1;
    renderMovieList(currentPage);
    generatePagination();
});

categoryFilter.addEventListener("change", () => {
    currentPage = 1;
    renderMovieList(currentPage);
    generatePagination();
});

renderMovieList(currentPage);
generatePagination();
