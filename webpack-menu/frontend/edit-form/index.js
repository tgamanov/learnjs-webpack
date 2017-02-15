import template from './edit-form.pug';
import './edit-form.styl';

export default class EditForm {
    constructor() {
        document.body.appendChild(this.render());

        this._el = document.querySelector('.edit-form--user');
        this._listUsers = document.querySelector('.list-users');
        this._formElement = document.forms[0];




        this._listUsers.addEventListener('list-user-check', this._listUserCheckHandler.bind(this));

        this._formElement.addEventListener('change', this._formChangeHandler.bind(this));
    }

    render() {
        let element = document.createElement('div');

        element.innerHTML = template();

        return element;
    }

    _listUserCheckHandler(event) {
       let user = event.detail.checkedUser;
        this._formElement.elements['first-name'].value = user.firstName;
        this._formElement.elements['last-name'].value = user.lastName;
    }

    _formChangeHandler(event) {

        let eventTrig = new CustomEvent('user-data-change', {
            detail : {
                firstName :  this._formElement.elements['first-name'].value,
                lastName : this._formElement.elements['last-name'].value
            }
        });

        this._listUsers.dispatchEvent(eventTrig);
    }
}