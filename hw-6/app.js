function getGenresString(genres) {
  return genres
    .map((genre) => {
      return genre.genre;
    })
    .join("/");
}

function filmView(img, title, genres, year, id) {
  return `
    <div class="movie">
          <div class="movie-image">
            <img class="cover" src="${img}" alt="poster-movie" />
          </div>
          <div class="wrapper-info">
          <div class="movie-info">
            <p class="title">${title}</p>
            <p class="genres">${getGenresString(genres)}</p>
            <p class="movie-year">${year}</p>
          </div>
          <div class="action">
            <button data-id="${id}">Watch more</button>
          </div>
          </div>
        </div>
    `;
}

const list = document.getElementById("moovies-list");
function fetchInfo(path) {
  return fetch("https://kinopoiskapiunofficial.tech/api/v2.2/" + path, {
    method: "GET",
    headers: {
      "X-API-KEY": "86345f7e-62a7-49aa-b982-7820be9dadc9",
      "Content-Type": "application/json",
    },
  });
}
fetchInfo("films/top?type=TOP_250_BEST_FILMS&page=1")
  .then((res) => res.json())
  .then((data) => {
    data.films.map(({ posterUrl, nameRu, genres, year, filmId }) => {
      list.innerHTML += filmView(posterUrl, nameRu, genres, year, filmId);
    });
  });

list.addEventListener("click", (e) => {
  if (e.target.tagName != "BUTTON") {
    return;
  }
  const popUp = document.querySelector(".modal"),
    modalContent = document.querySelector(".modal-content");
  id = e.target.getAttribute("data-id");
  fetchInfo("films/" + id)
    .then((res) => res.json())
    .then((data) => {
      modalContent.innerHTML = modalView(data);

      const close = document.querySelector(".close");

      function closeModal() {
        popUp.style.display = "none";
        list.classList.remove("overlay");
      }

      popUp.style.display = "block";
      list.classList.add("overlay");
      if (list.classList.contains("overlay")) {
        list.addEventListener("click", (e) => {
          closeModal();
        });
      }

      close.addEventListener("click", (e) => {
        closeModal();
      });

      document.addEventListener("keydown", (e) => {
        if (e.keyCode === 27) {
          closeModal();
        }
      });
    });
});

function modalView(film) {
  const countryFilm = film.countries
    .map((country) => {
      return country.country;
    })
    .join(",");
  return `

  <div class="movie-image">
    <img class="cover" src="${film.posterUrl}" alt="poster-movie" />
    <ul class="rating">
    <li>Kinopoisk: ${film.ratingKinopoisk}</li>
    <li>Imdb: ${film.ratingImdb}</li>
  </ul>
  </div>
  
  <div class="modal-info">
    <h1 class="title">${film.nameRu}</h1>
    <p class="year">${film.year}, ${countryFilm}</p>
    <p class="genres">${getGenresString(film.genres)}</p>
    <h3 class="slogan">${film.slogan}</h3>
    <p class="description">${film.description}</p>
    <a href="${film.webUrl}" class="webUrl">Link on kinopoisk</a>
</div>
    `;
}
