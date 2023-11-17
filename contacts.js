const fs = require('fs').promises;
const path = require('path')

const contactsPath = path.resolve(__dirname, 'db/contacts.json')

// TODO: задокументировать каждую функцию
function listContacts() {
    fs
        .readFile(contactsPath)
        .then(data => {
            console.table(JSON.parse(data))
        })
        .catch(error => console.log(error.message));
}

function getContactById(contactId) {
  // ...твой код. Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
}

function removeContact(contactId) {
  // ...твой код. Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
}

function addContact(name, email, phone) {
  // ...твой код. Возвращает объект добавленного контакта. 
}

module.exports = {
listContacts
};