import fetch from 'node-fetch';
global.fetch = fetch;


const accesKeyCode = 'wquFJdjsVls1ZV3tTnrLsJ-Qq1o7Tnw2TK4s6-82odc';

// ES Modules syntax
import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({ accessKey: `${accesKeyCode}` });

export default class Search {
    constructor(query, page) {
        this.query = query;
        this.page = page;
    }

    async getPhotos() {
        const res = await unsplash.search.photos(this.query, this.page, 30)
            .then(toJson)
            .then(json => {
                const photos = json;
                console.log(json);
                return photos.results;
            });
        this.results = res;
    }

    async getSearchInfo() {
        await unsplash.search.photos(this.query, this.page, 30)
            .then(toJson)
            .then(json => {
                this.total = json.total;
                this.pages = json.total_pages;
            });
    }



}

