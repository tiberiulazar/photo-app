import uniqid from 'uniqid';

export default class Collections {
    constructor() {
        this.collections = [];
    }

    addColl(name, description) {
        const collection = {
            id: uniqid(),
            name,
            description,
            photos: []
        };
        this.collections.push(collection);

        this.persistCollection();
    }

    changeName(id, newName) {
        this.collections.forEach(el => { if (el.id === id) el.name = newName });
    }

    deleteColl(id) {

        const item = this.collections.findIndex(el => el.id === id);
        this.collections.splice(item, 1);
        this.persistCollection();
    }

    persistCollection() {
        localStorage.setItem('collections', JSON.stringify(this.collections));
    }

    readCollection() {
        const collections = JSON.parse(localStorage.getItem('collections'));

        if (collections) this.collections = collections;
    }

}

