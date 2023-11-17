const nanoid = require("nanoid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve(__dirname, "db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch((e) => console.log(e.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      let contactFound;

      try {
        contactFound = JSON.parse(data).find((item) => item.id === contactId);
      } catch (e) {
        console.log(e.message);
      }

      if (contactFound) console.log(contactFound);
      else console.log(null);
    })
    .catch((e) => console.log(e.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      let contactFound;
      try {
        contactFound = JSON.parse(data).find((item) => item.id === contactId);
      } catch (e) {
        console.log(e.message);
      }
      if (contactFound) {
        let filteredArray;
        try {
          filteredArray = JSON.parse(data).filter(
            (item) => item.id !== contactId
          );
        } catch (e) {
          console.log(e.message);
        }
        fs.writeFile(contactsPath, JSON.stringify(filteredArray))
          .then(() => console.log(contactFound))
          .catch((e) => console.log(e.message));
      } else console.log(null);
    })
    .catch((e) => console.log(e.message));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const newContact = {
        id: nanoid.nanoid(),
        name,
        email,
        phone,
      };

      let updatedArr;
      try {
        updatedArr = [...JSON.parse(data), newContact];
      } catch (e) {
        console.log(e.message);
      }

      fs.writeFile(contactsPath, JSON.stringify(updatedArr))
        .then(() => console.log(newContact))
        .catch((e) => console.log(e.message));
    })
    .catch((e) => console.log(e.message));
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
