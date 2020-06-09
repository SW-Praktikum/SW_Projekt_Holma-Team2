'use strict';

/**
* Config file for a https://github.com/micromata/http-fake-backend to
* mock the PythonBankBeispiel backend.
*
* Just place in ./server/api folder.
*/

const SetupEndpoint = require('./setup/');

const prefix = "/listingapp"

module.exports = SetupEndpoint({
    name: 'listingapp',
    urls: [{
        params: '/allusers',
        requests: [{
            method: 'GET',
            response: '/response-files/listingapp/allusers.json' // -> what directory? /response-files?
        },
        {
            method: ['POST'],
            response: '/response-files/listingapp/user.json'
        }] 
    }, {
        params: '/allusers/{id}',
        requests: [{
            method: ['GET'],
            response: '/response-files/listingapp/user.json'
        }, {
            method: ['PUT'],
            response: '/response-files/listingapp/user.json'
        }, {
            method: 'DELETE',
            response: '/response-files/listingapp/user.json'
        }]
    }, {
        params: '/allusers/{id}/allgroups',
        requests: [{
            method: 'GET',
            response: '/response-files/listingapp/usersofgroup.json'
        }, {
            method: ['POST'],
            response: '/response-files/listingapp/group.json'
        }]
    }, 
    
    
    /** 
    {
        params: '/accounts',
        requests: [{
            method: 'GET',
            response: '/response-files/bank/allaccounts.json'
        }]
    }, {
        params: '/accounts/{id}',
        requests: [{
            method: 'GET',
            response: '/response-files/bank/account.json'
        },
        {
            method: ['delete'],
            response: {
                deleted: true
            }
        }]
    }
    */
    ]
});

