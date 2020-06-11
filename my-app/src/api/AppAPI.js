import GroupBO from './GroupBO';
import UserBO from './UserBO';

export default class AppAPI{

    static #api = null;

    #appServerBaseURL = '/app';



    // User Related
    #getUsersURL = () => `${this.#appServerBaseURL}/users`;
    #addUserURL = () => `${this.#appServerBaseURL}/users`;
    #getUserURL = (id) => `${this.#appServerBaseURL}/users/${id}`;
    #updateUserURL = (id) => `${this.#appServerBaseURL}/users/${id}`;
    #deleteUserURL = (id) => `${this.#appServerBaseURL}/users/${id}`
    #searchUserURL = (userName) => `${this.#appServerBaseURL}/users-by-name/${userName}`;
}