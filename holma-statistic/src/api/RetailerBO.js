import BusinessObject from './BusinessObject';

export default class RetailerBO extends BusinessObject {

    constructor(name) {
        super(name);
        this.count = 0
   };

   getCount() {
    return this.count
   };

   setCount(count){
        this.count = count
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