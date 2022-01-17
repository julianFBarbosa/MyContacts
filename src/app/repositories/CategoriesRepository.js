const db = require('../../database');

class CategoryRepository {
  async findAll(order = 'ASC') {
    const direction = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT * FROM categories 
      ORDER BY name ${direction}
    `);

    return rows;
  }

  async findByName(name) {
    const [row] = await db.query(`
       SELECT * FROM categories WHERE name = $1
    `, [name]);

    return row;
  }

  async create({ name }) {
    const [row] = await db.query(`
      INSERT INTO categories(name)
      VALUES($1)
      RETURNING *
    `, [name]);

    return row;
  }

  async update(id, {
    category,
  }) {
    const [row] = await db.query(`
      UPDATE categories
      SET name = $1
      WHERE id = $2
      RETURNING *
    `, [category, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`
      DELETE FROM categories
      WHERE id = $1
    `, [id]);

    return deleteOp;
  }
}

module.exports = new CategoryRepository();
