import BusinessObject from './BusinessObject';

export default class ArticleBO extends BusinessObject {

    constructor(name, groupId) {
        super(name);
        this.groupId = groupId
   }

    getGroupId() {
    return this.groupId
}

    set_group(group_id){
        this.group_id = group_id
        }

static fromJSON(articles) {
    let result = [];

    if (Array.isArray(articles)) {
        articles.forEach((art) => {
            Object.setPrototypeOf(art, ArticleBO.prototype)
            result.push(art)
        })
    } else {
        
        let art = articles
        Object.setPrototypeOf(art, ArticleBO.prototype)
        result.push(art)
    }

    return result;
}
}