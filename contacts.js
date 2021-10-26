const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const readContacts = async () => {
  const result = await fs.readFile(
    path.join(__dirname, "db/contacts.json"),
    "utf8"
  );
  return JSON.parse(result);
};
const contactsPath = "db/contacts.json";

const listContacts = async () => {
  return await readContacts();
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const [result] = contacts.filter((contact) => contact.id === contactId);
  return result;
};

function removeContact(contactId) {
  // ...твой код
}

const addContact = async (name, email, phone) => {
  const contacts = await readContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 11));
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
