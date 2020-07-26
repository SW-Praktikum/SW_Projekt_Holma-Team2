import BusinessObject from './BusinessObject';

export default class ArticleBO extends BusinessObject {

    constructor(name, groupId) {
        super(name);
        this.groupId = groupId
        this.count = 0
    };
 
    getGroupId() {
    return this.groupId
    }

    getCount() {
    return this.count
    }

    setGroupId(groupId){
        this.groupId = groupId
    }

    setCount(count){
        this.count = count
    }

    // Returns an Array of ArticleBOs from a given JSON structure
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