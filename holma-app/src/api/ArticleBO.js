import BusinessObject from './BusinessObject';

export default class ArticleBO extends BusinessObject {

    constructor(name, groupId) {
        super(name);
        this.groupId = groupId
<<<<<<< HEAD
   }

    getGroupId() {
    return this.groupId
}
=======
    };

    getGroupId() {
    return this.groupId
    }
>>>>>>> 274f996a14d4e04374657875c984a7f246bd683d

    set_group(groupId){
        this.groupId = groupId
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