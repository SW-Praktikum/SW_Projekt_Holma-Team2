import BusinessObject from './BusinessObject';

export default class ShoppingListBO extends BusinessObject {

    constructor(name, groupId) {
        super(name);
        this.groupId = groupId  
   }

    getGroupId() {
        return this.groupId
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