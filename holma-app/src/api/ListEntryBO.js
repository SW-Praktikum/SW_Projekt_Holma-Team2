import BusinessObject from './BusinessObject';

export default class ListEntryBO extends BusinessObject {

    constructor(articleId, articleName, amount, unit, retailerId, retailerName, purchasingUserId, purchasingUserName, shoppingListId, shoppingListName, checked, checkedTs, standardarticle) {
        super();
        this.articleId = articleId;
        this.articleName = articleName;
        this.amount = amount;
        this.unit = unit;
        this.retailerId = retailerId;
        this.retailerName = retailerName;
        this.purchasingUserId = purchasingUserId;
        this.purchasingUserName = purchasingUserName;
        this.shoppingListId = shoppingListId;
        this.shoppingListName = shoppingListName;
        this.checked = checked;
        this.checkedTs = checkedTs;
        this.standardarticle = standardarticle
    }

    getArticleId(){
        return this.articleId
    }

    getArticleName(){
        return this.articleName
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

    getRetailerName() {
        return this.retailerName
    }

    getPurchasingUserId(){
        return this.purchasingUserId
    }

    getPurchasingUserName(){
        return this.purchasingUserName
    }

    getShoppingListId(){
        return this.shoppingListId
    }

    getShoppingListName(){
        return this.shoppingListName
    }

    getCheckedTs(){
        return this.checkedTs
    }

    isStandardarticle() {
        return this.standardarticle
    }

    setArticleId(articleId){
        this.articleId = articleId
    }

    setArticleName(articleName){
        this.articleName = articleName
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

    setPurchasingUserName(purchasingUserName){
        this.purchasingUserName = purchasingUserName
    }

    setShoppingListId(shoppingListId){
        this.shoppingListId = shoppingListId
    }

    setShoppingListName(shoppingListName){
        this.shoppingListName = shoppingListName
    }

    setRetailerId(retailerId){
        this.retailerId = retailerId
    }

    setRetailerName(retailerName){
        this.retailerName = retailerName
    }

    setChecked(checked){
        if (checked == true) {
            let checkedTs = new Date().toISOString();
            this.setCheckedTs(checkedTs)
        }
        else {
            this.setCheckedTs(null)
        }
        this.checked = checked
    }

    setCheckedTs(checkedTs){
        this.checkedTs = checkedTs
    }

    setStandardarticle(standardarticle){
        this.standardarticle = standardarticle
    }

    static fromJSON(listEntries) {
        let result = [];
        if (Array.isArray(listEntries)) {
            listEntries.forEach((le) => {
                Object.setPrototypeOf(le, ListEntryBO.prototype)
                result.push(le)
            })
        } else {
            let le = listEntries
            Object.setPrototypeOf(le, ListEntryBO.prototype)
            result.push(le)
        }

        return result;
    }
}