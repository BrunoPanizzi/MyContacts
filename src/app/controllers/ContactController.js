const ContactRepository = require("../repositories/ContactRepository");

const isValidEmail = require("../utils/isValidEmail");

class ContactController {
  async index(request, response) {
    const contacts = await ContactRepository.findAll();

    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: "Contact not found" });
    }

    response.json(contact);
  }

  async store(request, response) {
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Invalid name" });
    }

    if (!isValidEmail(email)) {
      return response.status(400).json({ error: "Invalid email" });
    }

    const contact = await ContactRepository.create({
      name,
      email,
      phone,
      category_id,
    });
    response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    const contactExists = await ContactRepository.findById(id);

    if (!contactExists) {
      return response.status(400).json({ error: "Contact not found" });
    }

    if (!name) {
      return response.status(400).json({ error: "Invalid name" });
    }

    if (!isValidEmail(email)) {
      return response.status(400).json({ error: "Invalid email" });
    }

    const contactWithEmail = await ContactRepository.findByEmail(email);

    if (contactWithEmail && contactWithEmail !== id) {
      return response
        .status(400)
        .json({ error: "You already have another contact with this email" });
    }

    const contact = await ContactRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.send(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    await ContactRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new ContactController();
