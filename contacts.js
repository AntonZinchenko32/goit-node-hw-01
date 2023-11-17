const nanoid = require("nanoid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve(__dirname, "db/contacts.json");

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch((error) => console.log(error.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contactFound = JSON.parse(data).find(
        (item) => item.id === contactId
      );
      if (contactFound) console.log(contactFound);
      else console.log(null);
    })
    .catch((error) => console.log(error.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contactFound = JSON.parse(data).find(
        (item) => item.id === contactId
      );
      if (contactFound) {
        const filteredArr = JSON.parse(data).filter(
          (item) => item.id !== contactId
        );
        fs.writeFile(contactsPath, JSON.stringify(filteredArr))
          .then(() => console.log(contactFound))
          .catch((error) => console.log(error.message));
      } else console.log(null);
    })
    .catch((error) => console.log(error.message));
}

function addContact(name, email, phone) {
  console.table({
    id: nanoid.nanoid(),
    name,
    email,
    phone,
  });
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
