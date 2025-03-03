
// import sqlite3 from 'sqlite3';
import express from 'express';
import cors from 'cors';
import { Sequelize, DataTypes } from 'sequelize';

// import { execute, getAll } from './dbUtils.js'

const port = 8080;
const app = express();
app.use(cors());
app.use(express.json());

// const sequelize = new Sequelize('sqlite::memory:');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const Checklist = sequelize.define(
    'Checklist',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
);

await sequelize.sync({ force: true });

// const test = Checklist.build({ id: 2, date_created: '2025-01-09', date_updated: '2025-01-10', description: 'description' });
// await test.save();
const test = await Checklist.create({ description: 'description', title: 'songs to play' });

// test.description = 'bla bla bla';
// await test.save();
await test.update({ description: 'bla bla bla' });

const test1 = await Checklist.create({ description: 'description 1', title: 'czech words to learn' });

// await test1.destroy();
// console.log('test: 4', test1.id);

// const db = new sqlite3.Database('checklist');
// const lists = 'lists';
// const createListsTable = `CREATE TABLE IF NOT EXISTS ${lists} (
// id INTEGER PRIMARY KEY,
// date_created TEXT NOT NULL,
// date_updated TEXT NOT NULL,
// description TEXT NOT NULL)`;
// await execute(db, createListsTable);

// const insertSql = `INSERT INTO ${lists}(id, date_created, date_updated, description) VALUES(?, ?, ?, ?)`;
// await execute(db, insertSql, [2, '2025-01-09', '2025-01-10', 'text']);
// await execute(db, insertSql, [3, '2025-02-09', '2025-02-10', 'text']);

// const updateSql = `UPDATE ${lists} SET date_updated = ? WHERE id = ?`;
// await execute(db, updateSql, ['2025-01-12', 2]);

// const selectSql = `SELECT * FROM ${lists}`;
// const rows = await getAll(db, selectSql);
// console.log('rows before delete:', rows);

// const deleteSql = `DELETE FROM ${lists} WHERE id = ?`;
// await execute(db, deleteSql, [3]);

// const rows2 = await getAll(db, selectSql);
// console.log('rows: after delete:', rows2);

// method specifies a callback function that will be invoked whenever there is an HTTP GET request with a path ('/') relative to the site root.
app.get('/', (request, response) => {
    response.send(rows2);
});

app.get('/lists', async (request, response) => {
    const checklists = await Checklist.findAll();
    response.send(checklists);
});

app.get('/lists/:id', async (request, response) => {
    const id = request.params.id;
    const checklist = await Checklist.findAll({
        where: { id },
    })
    if (!checklist[0]) {
        response.status(404).send('Oh uh, something went wrong');
    } else {
        response.send(checklist[0]);
    }
});

app.post('/lists', async (request, response) => {
    const data = request.body;
    console.log('POST request, data:', data);
    const checklist = await Checklist.create({ description: data.description, title: data.title });
    response.send(checklist);
});

app.delete('/lists/:id', async (request, response) => {
    const id = request.params.id;
    Checklist.destroy({
        where: { id },
    });
    response.send(`list ${id} has been deleted`);
});

// starts up the server on a specified port ('3000')
app.listen(port, () => {
    console.log(`server listeing on port ${port}`);
});