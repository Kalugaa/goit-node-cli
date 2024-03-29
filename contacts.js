const exp = require('constants');
const fs = require('fs/promises')
const path = require('path')
const { v4 } = require('uuid')

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    try {
        const usersJson = await fs.readFile(contactsPath)
        const users = JSON.parse(usersJson)
        return users
    } catch (err) {
        console.log(err.message);
    }
}

async function getContactById(contactId) {
    try {
        const usersJson = await fs.readFile(contactsPath)
        const users = JSON.parse(usersJson)

        const userToFind = users.find(user => user.id === contactId)

        if (!userToFind) {
            return null
        }

        return userToFind
    } catch (err) {
        console.log(err.message);
    }
}

async function removeContact(contactId) {
    try {
        const usersJson = await fs.readFile(contactsPath)
        const users = JSON.parse(usersJson)

        const indexToRemove = users.findIndex(user => user.id === contactId);

        if (indexToRemove === -1) {
            return null;
        }

        const removedContact = users.splice(indexToRemove, 1)[0];

        await fs.writeFile(contactsPath, JSON.stringify(users, null, 2))

        return removedContact;
    } catch (err) {
        console.log(err.message);
    }


}

async function addContact(name, email, phone) {
    try {
        const usersJson = await fs.readFile(contactsPath)
        const users = JSON.parse(usersJson)


        const newContact = {
            name,
            email,
            phone,
            id: v4()
        }

        users.push(newContact)


        await fs.writeFile(contactsPath, JSON.stringify(users))

        return newContact

    } catch (err) {
        console.log(err.message);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact

}