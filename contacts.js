const nanoid = require("nanoid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve(__dirname, "db/contacts.json");

function Parcer(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function listContacts() {
  const data = await fs
    .readFile(contactsPath)
    .catch((e) => console.log(e.message));
  console.table(Parcer(data));
}

async function getContactById(contactId) {
  const data = await fs
    .readFile(contactsPath)
    .catch((e) => console.log(e.message));

  const contactFound = Parcer(data).find((item) => item.id === contactId);

  contactFound ? console.log(contactFound) : console.log(null);
}

async function removeContact(contactId) {
  const data = await fs
    .readFile(contactsPath)
    .catch((e) => console.log(e.message));

  const contactFound = Parcer(data).find((item) => item.id === contactId);

  if (contactFound) {
    const filteredArray = Parcer(data).filter((item) => item.id !== contactId);

    await fs
      .writeFile(contactsPath, JSON.stringify(filteredArray))
      .catch((e) => console.log(e.message));
    console.log(contactFound);
  } else console.log(null);
}

async function addContact(name, email, phone) {
  const data = await fs
    .readFile(contactsPath)
    .catch((e) => console.log(e.message));

  const newContact = {
    id: nanoid.nanoid(),
    name,
    email,
    phone,
  };

  const updatedArr = [...Parcer(data), newContact];

  await fs
    .writeFile(contactsPath, JSON.stringify(updatedArr))
    .catch((e) => console.log(e.message));
  console.log(newContact);
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
