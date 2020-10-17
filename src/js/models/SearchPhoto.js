import fetch from 'node-fetch';
global.fetch = fetch;


const accesKeyCode = 'wquFJdjsVls1ZV3tTnrLsJ-Qq1o7Tnw2TK4s6-82odc';

// ES Modules syntax
import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({ accessKey: `${accesKeyCode}` });

export default class SearchPhoto {
    constructor(id) {
        this.id = id;
    }

    async getPhotoInfo() {
        await unsplash.photos.getPhoto(this.id)
            .then(toJson)
            .then(json => {
                this.description = json.alt_description;
                this.author = json.user.name;
                this.username = json.user.username;
                this.userLink = json.user.links.html;
                this.src = json.urls.regular;
                this.link = json.links.html;
                this.tags = json.tags.map(el => el.title);
            })
    }

}
// , el.urls.regular
// el.alt_description,
// , el.alt_description, el.user.name, el.user.username, el.user.links.html