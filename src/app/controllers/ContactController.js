const ContactRepository = require('../repositories/ContactRepository')
const isValidEmail = require('../utils/isValidEmail')

class ContactController {
	index(request, response) {
		const contacts = ContactRepository.findAll()

		response.json(contacts)
	}

	show(request, response) {
		const { id } = request.params
		const contact = ContactRepository.findById(id)

		if (!contact) {
			return response.status(404).json({ error: 'Contact not found' })
		}

		response.json(contact)
	}

	store(request, response) {
		const { name, email, phone, category } = request.body
		
		if (!name) {
			return response.status(400).json({ error: 'Invalid name' })
		}

		if (!email || !isValidEmail(email)) {
			return response.status(400).json({ error: 'Invalid email' })
		}
		
		let contactExists = ContactRepository.findByEmail(email)
		if (contactExists) {
			return response.status(400).json({ error: 'You have another contact with this email' })
		}

		contactExists = ContactRepository.findByPhone(phone)
		if (contactExists) {
			return response.status(400).json({ error: 'You have another contact with this phone number' })
		}
		
		const contact = ContactRepository.create({
			name, 
			email, 
			phone,
			category
		})
		response.status(201).json(contact)

	}

	update(request, response) {
		const { id } = request.params
		const { name, email, phone, category } = request.body

		let contactExists = ContactRepository.findById(id)

		if (!contactExists) {
			return response.status(400).json({ error: 'Contact not found' })
		}

		if (!name) {
			return response.status(400).json({ error: 'Invalid name' })
		}

		if (!email || !isValidEmail(email)) {
			return response.status(400).json({ error: 'Invalid email' })
		}

		contactExists = ContactRepository.findByEmail(email)

		if (contactExists && contactExists.id !== id) {
			return response.status(400).json({ error: 'You have another contact with this email' })
		}

		contactExists = ContactRepository.findByPhone(phone)
		
		if (contactExists && contactExists.id !== id) {
			return response.status(400).json({ error: 'You have another contact with this phone number' })
		}

		const contact = ContactRepository.update(id, { name, email, phone, category })

		response.send(contact)

	}

	delete(request, response) {
		const { id } = request.params
		const contact = ContactRepository.findById(id)

		if (!contact) {
			return response.status(404).json({ error: 'Contact not found' })
		}

		ContactRepository.delete(id)
		response.sendStatus(204)
	}
}

module.exports = new ContactController()
