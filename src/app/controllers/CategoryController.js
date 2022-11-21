const CategoryRepository = require('../repositories/CategoryRespository')

class CategoryController {
  async index(request, response) {
    const categories = await CategoryRepository.findAll()

    response.json(categories)
  }

  async show(request, response) {
    const { id } = request.params

    const category = await CategoryRepository.findById(id)

    if (!category) {
      return response
        .status(400)
        .json({ error: 'Category does not exists' })
    }

    response.json(category)
  }

  async store(request, response) {
    const { name } = request.body

    if (!name) {
      return response.status(400).json({ error: 'Name is required' })
    }

    const category = await CategoryRepository.create({ name })

    response.json(category)
  }

  async update(request, response) {
    const { id } = request.params
    const { name } = request.body

    const contactExists = await CategoryRepository.findById(id)

    if (!contactExists) {
      return response
        .status(400)
        .json({ error: 'Category does not exists' })
    }

    const contact = await CategoryRepository.update(id, name)

    response.json(contact)
  }

  async delete(request, response) {
    const { id } = request.params

    await CategoryRepository.delete(id)

    response.sendStatus(204)
  }
}

module.exports = new CategoryController()
