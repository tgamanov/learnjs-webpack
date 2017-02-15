import template from './list-users.pug';
import './list-users.styl';

export default class ListUsers {
    constructor({title, users}){
        this._title = title;
        this._users = users;

        this._render();

        document.body.appendChild(this.getElem());

        this._el = document.querySelector('.list-users');

        this._el.addEventListener('click', this._clickHadler.bind(this));
        this._el.addEventListener('user-data-change', this._updateUserData.bind(this) );
    }


    _render() {
        let tmp = document.createElement('div');
        tmp.innerHTML = template({
            title : this._title,
            users : this._users
        });

        this._elem = tmp;
    }

    _clickHadler(event) {
        if( event.target.nodeType !== 'li'){
            let activeClass = 'list-users__item--active';
            let target = event.target.closest('li');

            if(this._el.querySelector('.' + activeClass)) {
                this._el.querySelector('.' + activeClass).classList.remove(activeClass);
            }

            if( target.classList.contains(activeClass) ) {
                target.classList.remove(activeClass);
            }
            else{
                target.classList.add(activeClass);

                let eventTrig = new CustomEvent('list-user-check', {
                    bubble : true,
                    detail : {
                        checkedUser : {
                            firstName : target.querySelector('[data-first-name]').dataset.firstName,
                            lastName : target.querySelector('[data-last-name]').dataset.lastName
                        }
                    }
                });

                this._el.dispatchEvent(eventTrig);
            }


        }
    }

    _updateUserData(event) {
        let userUpdate = event.detail;

        let dataFirstName = this._el.querySelector('.list-users__item--active [data-first-name]');
        let dataLastName = this._el.querySelector('.list-users__item--active [data-last-name]');

        dataFirstName.innerHTML = userUpdate.firstName + ' ';
        dataFirstName.setAttribute('data-first-name', userUpdate.firstName);
        dataLastName.innerHTML = userUpdate.lastName;
        dataLastName.setAttribute('data-last-name', userUpdate.lastName);
    }

    getElem() {
        return this._elem;
    }
};


