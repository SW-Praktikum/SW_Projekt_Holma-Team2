export default class BusinessObject {

    constructor(name) {
        this.id = 0;
        this.name = name;
        this.creationDate = new Date().toISOString();
        this.lastUpdated = this.creationDate;
    }


    getId() {
        return this.id
    }

    getName() {
        return this.name
    }

    getCreationDate() {
        return this.creationDate
    }

    getLastUpdated() {
        return this.lastUpdated
    }

    setId(id) {
        this.id = id
    }

    setName(name) {
        this.name = name
    }

    setCreationDate(creationDate) {
        this.creationDate = creationDate
    }

    setLastUpdated(lastUpdated) {
        this.lastUpdated = lastUpdated
    }

    toString() {
        let result = '';
        for (var prop in this) {
            result += prop + ': ' + this[prop] + ' ';
        }
        return result;
    }

}