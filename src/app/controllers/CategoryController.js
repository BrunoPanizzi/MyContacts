const CategoryRepository = require('../repositories/CategoryRespository')
const { z } = require('zod')

const sendErrorMessage = require('../utils/sendErrorMessage')

const withId = z.object({
  id: z.string().uuid(),
})

const withName = z.object({
  name: z.string().min(1),
})

class CategoryController {
  async index(request, response) {
    const categories = await CategoryRepository.findAll()

    response.json(categories)
  }

  async show(request, response) {
    const { success, error, data } = withId.safeParse(request.params)

    if (!success) {
      sendErrorMessage(error, response)
    }

    const { id } = data

    const category = await CategoryRepository.findById(id)

    if (!category) {
      return response
        .status(400)
        .json({ error: 'Category does not exists' })
    }

    response.json(category)
  }

  async store(request, response) {
    const { success, error, data } = withName.safeParse(request.body)

    if (!success) {
      return sendErrorMessage(error, response)
    }

    const { name } = data

    const alreadyExists = await CategoryRepository.findByName(name)

    if (alreadyExists) {
      return response
        .status(400)
        .json({ error: 'Category name must be unique' })
    }

    const category = await CategoryRepository.create({ name })

    response.json(category)
  }

  async update(request, response) {
    const parsedId = withId.safeParse(request.params)
    const parsedName = withName.safeParse(request.body)

    if (!parsedId.success) {
      return sendErrorMessage(parsedId.error, response)
    }
    if (!parsedName.success) {
      return sendErrorMessage(parsedName.error, response)
    }

    const { id } = parsedId.data
    const { name } = parsedName.data

    const categoryExists = await CategoryRepository.findById(id)

    if (!categoryExists) {
      return response
        .status(400)
        .json({ error: 'Category does not exists' })
    }

    const isNameUsed = await CategoryRepository.findByName(name)

    if (isNameUsed) {
      return response
        .status(400)
        .json({ error: 'Category name must be unique' })
    }

    const category = await CategoryRepository.update(id, name)

    response.json(category)
  }

  async delete(request, response) {
    const { success, error, data } = withId.safeParse(request.params)

    if (!success) {
      sendErrorMessage(error, response)
    }

    const { id } = data

    await CategoryRepository.delete(id)

    response.sendStatus(204)
  }
}

module.exports = new CategoryController()
