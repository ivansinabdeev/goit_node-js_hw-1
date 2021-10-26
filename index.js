// const argv = require("yargs").argv;
const { Command } = require("commander");
const chalk = require("chalk");

const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
} = require("./contacts.js");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

(async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.table(contacts);
        break;

      case "get":
        const contactById = await getContactById(id);
        if (contactById) {
          console.log(chalk.green("Contact found"));
          console.log(contactById);
        } else {
          console.log(chalk.yellow("Contact not found"));
        }
        break;

      case "add":
        const contact = await addContact(name, email, phone);
        console.log(chalk.green("Add new contact"));
        console.log(contact);
        break;

      case "remove":
        const removeById = await removeContact(id);
        console.log(chalk.grey("Contact is removed"));
        console.log(removeById);
        break;

      default:
        console.warn(chalk.red("Unknown action type!"));
    }
  } catch (error) {
    console.error(chalk.red(error.message));
  }
})(argv);
