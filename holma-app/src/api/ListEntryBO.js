import BusinessObject from './BusinessObject';

export default class ListEntryBO extends BusinessObject {

    constructor(article_id, amount, unit, amount, retailer_id, purchasing_user_id, shopping_list_id, checked, checked_ts, standardarticle) {
        super();
        this.article_id = article_id;
        this.amount = amount;
        this.unit = unit;
        this.retailer_id = retailer_id;
        this.purchasing_user_id = purchasing_user_id;
        this.shopping_list_id = shopping_list_id;
        this.checked = checked;
        this.checked_ts = checked_ts;
        this.standardarticle = standardarticle
    }

    getArticleId(){
        return this.article_id
    }

    getAmount(){
        return this.amount
    }

    getUnit(){
        return this.unit
    }

    getRetailerId(){
        return this.retailer_id
    }

    getPurchasingUserId(){
        return this.purchasing_user_id
    }

    getShoppingListId(){
        return this.shopping_list_id
    }

    getCheckedTs(){
        return this.checked_ts
    }

    set_article(article_id){
        this.article_id = article_id
    }

    set_amount(amount){
        this.amount = amount
    }

    set_unit(unit){
        this.unit = unit
    }

    set_purchasing_user_id(purchasing_user_id){
        this.purchasing_user_id = purchasing_user_id
    }

    set_shopping_list_id(shopping_list_id){
        this.shopping_list_id = shopping_list_id
    }

    set_retailer_id(retailer_id){
        this.retailer_id = retailer_id
    }

    set_checked(checked){
        this.checked = checked
    }

    set_checked_ts(checked_ts){
        this.checked_ts = checked_ts
    }

    set_standardarticle(standardarticle){
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