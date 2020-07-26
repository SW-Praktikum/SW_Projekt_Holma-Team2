import BusinessObject from './BusinessObject';

export default class GroupBO extends BusinessObject {

    constructor(name, owner) {
        super(name);
        this.owner = owner;
   }

    setOwner(owner) {
        this.owner = owner;
    }

    getOwner() {
        return this.owner;
    }

    // Returns an Array of GroupBOs from a given JSON structure
    static fromJSON(groups) {
        let result = [];
        
        if (Array.isArray(groups)) {
            groups.forEach((g) => {
                Object.setPrototypeOf(g, GroupBO.prototype);
                result.push(g)
            })
        } else {
            let g = groups;
            Object.setPrototypeOf(g, GroupBO.prototype);
            result.push(g)
        }

        return result;
    }

}

