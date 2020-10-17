
export default class Photo {
    constructor(id, src, bigSrc, link, height, description, author, username, userLink) {
        this.id = id;
        this.src = src;
        this.link = link;
        this.height = height;
    }

    // getPhotoInfo(res) {
    //     res.map(el => {
    //         this.id = el.id;

    //         this.src = el.urls.raw;
    //     })
    // }

}