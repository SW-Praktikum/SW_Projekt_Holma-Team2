import BusinessObject from './BusinessObject';

export default class ListEntryBO extends BusinessObject {

    constructor(articleId, amount, unit, retailerId, purchasingUserId, shoppingListId, checked, checkedTs, standardarticle) {
        super();
        this.articleId = articleId;
        this.amount = amount;
        this.unit = unit;
        this.retailerId = retailerId;
        this.purchasingUserId = purchasingUserId;
        this.shoppingListId = shoppingListId;
        this.checked = checked;
        this.checkedTs = checkedTs;
        this.standardarticle = standardarticle
    }

    getArticleId(){
        return this.articleId
    }

    getAmount(){
        return this.amount
    }

    getChecked(){
        return this.checked
    }

    getUnit(){
        return this.unit
    }

    getRetailerId(){
        return this.retailerId
    }

    getPurchasingUserId(){
        return this.purchasingUserId
    }

    getShoppingListId(){
        return this.shoppingListId
    }

    getCheckedTs(){
        return this.checkedTs
    }

    isStandardarticle() {
        return this.standardarticle
    }

    setArticle(articleId){
        this.articleId = articleId
    }

    setAmount(amount){
        this.amount = amount
    }

    setUnit(unit){
        this.unit = unit
    }

    setPurchasingUserId(purchasingUserId){
        this.purchasingUserId = purchasingUserId
    }

    setShoppingListId(shoppingListId){
        this.shoppingListId = shoppingListId
    }

    setRetailerId(retailerId){
        this.retailerId = retailerId
    }

    setChecked(checked){
        this.checked = checked
    }

    setCheckedTs(checkedTs){
        this.checkedTs = checkedTs
    }

    setStandardarticle(standardarticle){
        this.standardarticle = standardarticle
    }

    static fromJSON(listentries) {
        let result = [];

        if (Array.isArray(listentries)) {
            listentries.forEach((le) => {
                Object.setPrototypeOf(le, ListEntryBO.prototype)
                result.push(le)
            })
        } else {
            let le = listentries
            Object.setPrototypeOf(le, ListEntryBO.prototype)
            result.push(le)
        }

        return result;
    }
}