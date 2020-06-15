import BusinessObject from './BusinessObject';

export default class UserBO extends BusinessObject {

    constructor(name, email) {
        super(name);
        this.email = email;
        this.google_id = "";
   }


    get_email() {
        return this._email
    }

    get_google_id(){
        return this._google_id
    }   

    set_email(email){
        this._email = email
    }

    set_google_id(google_id){
        this.google_id = google_id
    }

    static fromJSON(users) {
        let result = [];

        if (Array.isArray(users)) {
            users.forEach((u) => {
                Object.setPrototypeOf(u, UserBO.prototype)
                result.push(u)
            })
        } else {

            let u = users;
            Object.setPrototypeOf(u, UserBO.prototype)
            result.push(u)
        }

        return result;
    }
}