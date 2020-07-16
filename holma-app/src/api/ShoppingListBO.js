import BusinessObject from './BusinessObject';

export default class ShoppingListBO extends BusinessObject {

    constructor(name, groupId, groupName) {
        super(name);
        this.groupId = groupId;
        this.groupName = groupName
   }

    getGroupId() {
        return this.groupId
    }

    getGroupName() {
        return this.groupName
    }

    setGroupId(groupId) {
        this.groupId = groupId
    }

    setGroupName(groupName) {
        this.groupName = groupName
    }


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