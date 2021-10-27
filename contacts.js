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
const contactsPath = path.join(__dirname, "db/contacts.json");

// const numId = Number(id);

const listContacts = async () => {
  return await readContacts();
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const [result] = contacts.filter(
    (contact) => String(contact.id) === String(contactId)
  );
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const idx = contacts.findIndex(
    (contact) => String(contact.id) === String(contactId)
  );
  if (idx === -1) {
    return null;
  }
  const removeContact = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removeContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await readContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 11));
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
