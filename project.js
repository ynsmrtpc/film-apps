const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

const ui = new UI();  // UI Objesini Başlatma 
const storage = new Storage();  // Storage Objesi Üretme
eventListener();  // Tüm Eventleri Yükleme

function eventListener(){
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });
    cardBody.addEventListener("click", deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}
function addFilm(event){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === ""){
        ui.displayMessages("Tüm Alanları Doldurmanız Gereklidir!", "danger");
    }
    else {
        // yeni film
        const newFilm = new Film(title,director,url);
        ui.addFilmToUI(newFilm); // Arayüze film ekleme
        storage.addFilmToStorage(newFilm); // Storage'a film ekleme
        ui.displayMessages("Film Başarıyla Eklendi", "success");
    }        
    ui.clearInput(titleElement, urlElement, directorElement);
    event.preventDefault();
}

function deleteFilm(event){
    if(event.target.id === "delete-film"){
        ui.deleteFilmFromUI(event.target);
        storage.deleteFilmFromStorage(event.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Silme işlemi başarılı!","warning");
    }
}

function clearAllFilms(){
    if(confirm("Emin Misiniz?")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
        ui.displayMessages("Tüm Filmler Silindi!", "danger");
    }
}