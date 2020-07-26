import BusinessObject from './BusinessObject';

export default class ShoppingListBO extends BusinessObject {

    constructor(name, groupId, groupName) {
        super(name);
        this.groupId = groupId;
        this.groupName = groupName
        this.archived = false
   }

    getGroupId() {
        return this.groupId
    }


    getArchived() {
        return this.archived
    }

    setGroupId(groupId) {
        this.groupId = groupId
    }

    setArchived(archived) {
        this.archived = archived
    }

    // Returns an Array of ShoppingListBOs from a given JSON structure
    static fromJSON(shoppinglists) {
        let result = [];

        if (Array.isArray(shoppinglists)) {
            shoppinglists.forEach((sl) => {
                Object.setPrototypeOf(sl, ShoppingListBO.prototype)
                result.push(sl)
            })
        } else {

            let sl = shoppinglists
            Object.setPrototypeOf(sl, ShoppingListBO.prototype)
            result.push(sl)
        }

        return result;
    }
}