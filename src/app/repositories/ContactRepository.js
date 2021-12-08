const { v4 } = require('uuid')
const fs = require('fs')
const path = require('path')

const readJSON = require('../utils/readJSON')

let dbPath = path.resolve('src', 'app', 'data', 'data.json')

class ContactRepository {
	findAll() {
		return readJSON(dbPath)
	}

	findById(id) {
		if (!id) return
		return readJSON(dbPath).find((contact) => contact.id === id)
	}

	findByEmail(email) {
		if (!email) return
		return readJSON(dbPath).find((contact) => contact.email === email)
	}

	findByPhone(phone) {
		if (!phone) return
		return readJSON(dbPath).find((contact) => contact.phone === phone)
	}

	create({ name, email, phone, category }) {
		let db = readJSON(dbPath)
		
		const newContact = {
			id: v4(),
			name, 
			email, 
			phone,
			category
		}

		db.push(newContact)
		
		fs.writeFileSync(dbPath, JSON.stringify(db))
	}

	update(id, { name, email, phone, category }) {
		let db = readJSON(dbPath)
	
		const updatedContact = {
			id,
			name, 
			email, 
			phone,
			category
		}

		db = db.map(contact => contact.id === id ? updatedContact : contact)
		fs.writeFileSync(dbPath, JSON.stringify(db))

		return updatedContact
	}

	delete(id) {
		let db = readJSON(dbPath)

		db = db.filter(contact => contact.id !== id)

		fs.writeFileSync(dbPath, JSON.stringify(db))
	}

}

module.exports = new ContactRepository()