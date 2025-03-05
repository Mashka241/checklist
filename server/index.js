import express from 'express';
import cors from 'cors';
import { Sequelize, DataTypes } from 'sequelize';

const port = 8080;
const app = express();
app.use(cors());
app.use(express.json());

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

const Todo = sequelize.define(
    'Todo',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        list_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }
)

await sequelize.sync({ force: true });

const test = await Checklist.create({ description: 'description', title: 'songs to play' });
await test.update({ description: 'bla bla bla' });
await Checklist.create({ description: 'description 1', title: 'czech words to learn' });
await Todo.create({ list_id: 2, description: 'určitě' });
await Todo.create({ list_id: 2, description: 'čokoládka' });
await Todo.create({ list_id: 2, description: 'žralok' });
await Todo.create({ list_id: 2, description: 'kotě' });

// method specifies a callback function that will be invoked whenever there is an HTTP GET request with a path ('/') relative to the site root.
// app.get('/', (request, response) => {
//     response.send(rows2);
// });

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
    data.todos.forEach(async (todo) => {
        await Todo.create({ description: todo, list_id: checklist.id });
    });

    response.send(checklist);
});

app.delete('/lists/:id', async (request, response) => {
    const id = request.params.id;
    Checklist.destroy({
        where: { id },
    });
    response.send(`list ${id} has been deleted`);
});

app.get('/lists/:id/todos', async (request, response) => {
    const id = request.params.id;
    const todos = await Todo.findAll({
        where: { list_id: id },
    })
    response.send(todos);
});

app.put('/lists/:listId/todos/:todoId', async (request, response) => {
    // const listId = request.params.listId;
    const todoId = request.params.todoId;
    const todo = await Todo.findAll({
        where: { id: todoId },
    })
    await todo[0].update({ status: !todo[0].status });
});

// starts up the server on a specified port ('3000')
app.listen(port, () => {
    console.log(`server listeing on port ${port}`);
});