import BusinessObject from './BusinessObject';

export default class UserBO extends BusinessObject {

    constructor(name, email) {
        super(name);
        this.email = email;
        this.googleId = "";
   }

    getEmail() {
        return this.email
    }

    getGoogleId(){
        return this.googleId
    }   

    setEmail(email){
        this.email = email
    }

    setGoogleId(googleId){
        this.googleId = googleId
    }

    static fromJSON(users) {
        let result = [];

        if (Array.isArray(users)) {
            users.forEach((u) => {
                Object.setPrototypeOf(u, UserBO.prototype);
                result.push(u)
            })
        } else {
            let u = users;
            Object.setPrototypeOf(u, UserBO.prototype);
            result.push(u)
        }

        return result;
    }
}