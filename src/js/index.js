import Search from './models/Search';
import Photo from './models/Photo';
import Collections from './models/Collection';
import SearchPhoto from './models/SearchPhoto'

import * as searchView from './views/searchView';
import * as collView from './views/collectionView';
import * as photoView from './views/photoView';
import { elements } from './views/base';
// import Search from './models/Search';
// import Recipe from './models/Recipe';
// import List from './models/List';
// import Likes from './models/Likes';
// import * as searchView from './views/searchView';
// import * as recipeView from './views/recipeView';
// import * as listView from './views/listView';
// import * as likesView from './views/likesView';
// import { elements, renderLoader, clearLoader } from './views/base';
// import string from './models/Search';
// // import {add as a, multiply as m, ID} from './views/searchView';
// import * as searchView from './views/searchView'

///////////////////////////////////
// export examples

// export const elementStrings = {
//     loader: 'loader'
// }

// export const clearLoader = () => {
//     const loader = document.querySelector(`.${elementStrings.loader}`);
//     if (loader) loader.parentElement.removeChild(loader);
// }

let state = {};

const transformHas = (has) => {
    has = has.replace('#', '');
    has = has.split('&');
    has = has.map(el => el.split('='));

    has = [...has[0], ...has[1]];
    // has = has.split('=');
    return has;
}


const displayImages = async () => {


    try {

        await state.search.getPhotos();

        await state.search.getSearchInfo();
        // create photos
        const photos = state.search.results.map(el => new Photo(el.id, el.urls.small, el.links.html, el.height));

        state.photos = photos;

        // clear input
        searchView.clearSearch();

        // clear photos container
        searchView.clearPhotos();
        // clear error
        searchView.displayErr(false);


        // display photos
        searchView.displayPhoto(photos);

        // display pagination
        searchView.pagVisibility(true);
        searchView.uptPageNr(state.search.page, state.search.pages);
    } catch (err) {
        console.log(err);
    }

}



const controlSearch = async () => {

    // take has and check if is search type
    let search, page;
    let has = window.location.hash;
    if (has !== '' && has.includes('search')) {
        has = transformHas(has);
    }

    if (has[0] === 'search' && has[2] === 'page') {
        search = has[1];
        page = parseInt(has[3]);

        // remove no photos yet
        searchView.removeNoPhotos(true);

        // create new search 
        state.search = new Search(search, page);


        // waiting photos
        await displayImages();


        // display search info
        searchView.displaySearchInfo(state.search);

        // display error if photos doesn't exists
        if (state.search.results.length === 0) {
            // remove pagination
            searchView.pagVisibility(false);
            // display error
            searchView.displayErr(true);
            // clear search info
            searchView.clearSearchInfo()
        }
    } else if (has !== '') {
        // clear search info
        searchView.clearSearchInfo()
        // remove pagination
        searchView.pagVisibility(false);
        searchView.removeNoPhotos(true);
        searchView.displayErr(true);
        // clea input
        searchView.clearSearch();
        // clear photos container
        searchView.clearPhotos();
    } else {
        // clear search info
        searchView.clearSearchInfo();
        // remove pagination
        searchView.pagVisibility(false);
        searchView.removeNoPhotos(true);
        searchView.removeNoPhotos(false);
        // clear input
        searchView.clearSearch();
        // clear photos container
        searchView.clearPhotos();
    }

}



elements.searchSubmit.addEventListener('click', () => {
    const search = searchView.searchValue();
    const page = 1;
    window.location.hash = `search=${search}&page=${page}`;
});

window.addEventListener('keydown', (e) => {
    const search = searchView.searchValue();
    const page = 1;
    if (e.keyCode === 13 && search !== '') {
        // update link
        window.location.hash = `search=${search}&page=${page}`;

    }
})

elements.pagination.addEventListener('click', e => {
    e.preventDefault()
    const search = state.search.query;
    if (e.target.matches('.next__page, .next__page *')) {
        state.search.page++;
    } else if (e.target.matches('.prev__page, .prev__page *') && state.search.page > 1) {
        state.search.page--;
    }
    window.location.hash = `search=${search}&page=${state.search.page}`;
})

// ['hashchange', 'load'].forEach(event => window.addEventListener(event, () =>));

// window.addEventListener('load', controlSearch);
// window.addEventListener('hashchange', controlSearch);



const init = () => {
}


///////////////////////////////////////
// Collection
state = new Collections();

elements.addCollection.addEventListener('click', e => {
    if (e.target.matches('.add__collection, .add__collection *')) {
        e.preventDefault();
        collView.displayPopup(true);
    }
})

const closePopUp = () => {
    // clear inputs
    collView.clearPopup();
    // close popup
    collView.displayPopup(false);

}

elements.closePU.addEventListener('click', e => {
    e.preventDefault();
    closePopUp();
})

elements.submitPU.addEventListener('click', e => {
    e.preventDefault();
    const collName = elements.collName.value;
    const collDescription = elements.collDescr.value;

    if (collName !== '') {
        // adding collection to state
        state.addColl(collName, collDescription);
        // clear UI
        collView.clearCollections();
        // updating UI
        collView.displayColl(state.collections);

    }


    // close popup
    closePopUp();

})

const getCollection = () => {
    state.readCollection();
    collView.displayColl(state.collections);
}

window.addEventListener('load', getCollection);

elements.collections.addEventListener('click', e => {

    if (e.target.matches('.delete__coll__btn')) {
        e.preventDefault();
        const id = e.target.closest('.collections__list__item').dataset.collid;
        //delete collection from state
        state.deleteColl(id);
        // clear UI
        collView.clearCollections();
        // updating UI
        collView.displayColl(state.collections);
    }
})

const photoPage = async () => {
    let hashLoc, photoID;
    let has = window.location.hash;
    has = has.replace('#', '');
    has = has.split('=');
    hashLoc = has[0];
    photoID = has[1];
    if (hashLoc === 'photo' && photoID !== '') {
        state.photo = new SearchPhoto(photoID);
        await state.photo.getPhotoInfo();

        // clear right side
        // clearRightSide();
        // display photo state
        photoView.displayPhotoState(state.photo);

    }

}

const displayCurrentState = () => {
    // undisplay state search
    searchView.displaySearchState(false);
    // clear photo state
    photoView.clearPhotoState();

    // take hash
    let hash = window.location.hash;
    // format hash
    if (hash.includes('search')) {
        console.log('search');
        // display search state
        searchView.displaySearchState(true);
        // format hash 
        // check if hash matches
        controlSearch();


    } else if (hash.includes('photo')) {
        console.log('photo');
        photoPage();
    } else if (hash.includes('collection')) {
        console.log('collection');
    } else {
        console.log('error page')
    }


    // check hash format

    // call functions depending on hash

}


// ['hashchange', 'load'].forEach(event => window.addEventListener(event, photoPage));

['hashchange', 'load'].forEach(event => window.addEventListener(event, displayCurrentState))

// pun eventul principal pe schimbat hastag, iar cand dau submit de fapt schimb hastagul

//['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
// const id = window.location.hash.replace('#', '');


// - 1. Actualizare/reset paginatie cand fac un search nou
// - 2. Informatii search (nume si cautari)
// - 3. Rezolvare eroare -> eroarea era data de ordinea in care apelam functiile si practic daca exista sau nu obiectul respectiv. In cazul de fata, incercam sa folosim un obiect care nu exista, tocmai de aceea zicea ca nu putea sa foloseasca ceva ce nu exista (null) ca un obiect (parametrul meu)
// 4. Organizare cod de la display photos ca prea se repeta

// Colectii
// - 1. Creare state
// - 2. Creare clasa
// - 3. Metoda adauga colectii
// - 4. Creare popup
// 5. Conditii popup
// - 6. Delete collection - redesign collection with delete btn separate
// 7. Pagina pentru collectie si rute (if general pentru rute)
// 8. Bagat collections in localstorage
// 9. Popup submit on enter

// State-uri
// 1. State de user
// - 2. State de colectie
// 3. State de photo

// Photos
// 1. Photo state
// 2. Photo page

// Idei
// 1. Functionalitate display type
// 2. Functionalitate how many images to see
// 3. Functionalitate colectii rename

window.state = state;

// to do for today
// 1. Modificare state photo in functie de #, folosind metoda de search photo by id
// 2. Linkuri taguri
// 3. Functie care sa se apeleze de fecare data cand se incarca pagina sau se schimba hash-ul, iar functia asta sa verifice formatul hash-ului si sa apeleze la randul ei functiile respective fiecarui state