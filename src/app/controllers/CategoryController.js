const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await CategoriesRepository.findAll(orderBy);

    response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params;
    const category = await CategoriesRepository.findByName(id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;

    const doesHaveSameCategory = await CategoriesRepository.findByName(name);

    if (doesHaveSameCategory) {
      return response.status(400).json({ error: 'Category already exists' });
    }
    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.create({ name });

    response.json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { category } = request.body;
    const doesHaveSameCategory = await CategoriesRepository.findByName(category);

    if (doesHaveSameCategory) {
      return response.status(400).json({ error: 'Category Already exists' });
    }
    if (!category) {
      response.status(400).json({ error: 'Category is required' });
    }

    const updatedCategory = await CategoriesRepository.update(id, { category });

    response.send(updatedCategory);
  }

  async delete(request, response) {
    const { id } = request.params;

    await CategoriesRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
