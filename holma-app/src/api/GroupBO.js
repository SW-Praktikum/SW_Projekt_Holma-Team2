import BusinessObject from './BusinessObject';

export default class GroupBO extends BusinessObject {

    constructor(o) {
        super();
        this.owner = o;
   }

    setOwner(o) {
        this.owner = o
    }

    getOwner() {
        return this.owner
    }

    static fromJSON(groups) {
        let result = [];

        if (Array.isArray(groups)) {
            groups.forEach((g) => {
                Object.setPrototypeOf(g, GroupBO.prototype)
                result.push(g)
            })
        } else {
            
            let g = groups
            Object.setPrototypeOf(g, GroupBO.prototype)
            result.push(g)
        }

        return result;
    }

}

