'use strict';
import ListUsers from './list-users';
import EditForm from './edit-form';

let listUsers = new ListUsers({

    title : 'Users',
    users : [
        {
            firstName : 'Byron ',
            lastName : 'Ellis'
        },

        {
            firstName : 'Debbie',
            lastName : ' Stone'
        },

        {
            firstName : 'Noelle ',
            lastName : 'Sanders'
        }
    ]
});

let editForm = new EditForm();


