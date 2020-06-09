export default class BusinessObject {

    constructor(name) {
        this.id = 0;
        this.name = name;
        this.creation_date = datetime.now();
        this.last_updated = this.creation_date;
    }


    get_ID() {
        return this.id
    }

    get_name() {
        return this.name
    }

    get_creation_date() {
        return this.creation_date
    }

    get_last_updated() {
        return this._last_updated
    }

    setID(id) {
        this.id = id
    }

    set_name(self, name) {
        this.name = name
    }

    set_creation_date(self, creation_date) {
        this.creation_date = creation_date
    }

    set_last_updated(self, last_updated) {
        this.last_updated = last_updated
    }

    toString() {
        let result = ''
        for (var prop in this) {
            result += prop + ': ' + this[prop] + ' ';
        }
        return result;
    }

}