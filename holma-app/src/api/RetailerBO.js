import BusinessObject from './BusinessObject';

export default class RetailerBO extends BusinessObject {

    constructor(name) {
        super(name);
   }

   static fromJSON(retailers) {
    let result = [];

    if (Array.isArray(retailers)) {
        retailers.forEach((ret) => {
            Object.setPrototypeOf(ret, RetailerBO.prototype)
            result.push(ret)
        })
    } else {
        
        let ret = retailers
        Object.setPrototypeOf(ret, RetailerBO.prototype)
        result.push(ret)
    }

    return result;
}
}