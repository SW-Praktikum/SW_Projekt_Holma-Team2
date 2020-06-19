export default class BusinessObject {

    constructor(name) {
        this.id = 0;
        this.name = name;
        this.creationDate = new Date("%Y-%m-%dT%H:%M:%S.fffff");
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

    getLastUpated() {
        return this.lastUpated
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

    setLastUpated(lastUpated) {
        this.lastUpated = lastUpated
    }

    toString() {
        let result = '';
        for (var prop in this) {
            result += prop + ': ' + this[prop] + ' ';
        }
        return result;
    }

}