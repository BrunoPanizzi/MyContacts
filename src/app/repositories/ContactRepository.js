const { v4 } = require('uuid')

let contacts = require('../mocks/contacts')

class ContactRepository {
	findAll() {
		return contacts	
	}

	findById(id) {
		return contacts.find((contact) => contact.id === id)
	}

	findByEmail(email) {
		return contacts.find((contact) => contact.email === email)
	}

	findByPhone(phone) {
		return contacts.find((contact) => contact.phone === phone)
	}

	create({ name, email, phone, category }) {
		const newContact = {
			id: v4(),
			name, 
			email, 
			phone,
			category
		}

		contacts.push(newContact)
	}

	update(id, { name, email, phone, category }) {
		const updatedContact = {
			id,
			name, 
			email, 
			phone,
			category
		}

		contacts = contacts.map(contact => contact.id === id ? updatedContact : contact)

		return updatedContact
	}

	delete(id) {
		contacts = contacts.filter(contact => contact.id !== id)
	}

}

module.exports = new ContactRepository()