import { useState } from 'react';

function CreateListForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [currentTodo, setCurrentTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const onSaveHandler = async () => {
    if (!title) {
      return;
    }
    const url = 'http://localhost:8080/lists';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, todos })
    };
    const response = await fetch(url, requestOptions);
    setTitle('');
    setDescription('');
    setTodos([]);
    console.log('response', response);
  };

  const onAddHandler = () => {
    setTodos([...todos, currentTodo]);
    setCurrentTodo('');
  };

  return (
    <div>
      <div className='create-list-container'>
        <label htmlFor='title'>Title: </label>
        <input type='text' value={title} id='title' onChange={e => setTitle(e.target.value)} required />

        <label htmlFor='description'>Description: </label>
        <input type='text' value={description} id='description' onChange={e => setDescription(e.target.value)} />

        <label htmlFor='items'>To do: </label>
        {!!todos.length && 
            <ul>
              {todos.map(el => {
                return (
                  <li key={el}>{el}</li>
                );
              })}
            </ul>
        }
        <input type='text' id='items' value={currentTodo} onChange={e => setCurrentTodo(e.target.value)}></input>
        <button onClick={onAddHandler}>Add todo</button>

        <button onClick={onSaveHandler}>Save!</button>
      </div>
    </div>
  );
}

export function CreateList() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const addListClickHandler = () => {
    setShowCreateForm(true);
  };

  const closeClickHandler = () => {
    setShowCreateForm(false);
  };

  return (
    <div>
      {
        showCreateForm ? 
          <div>
            <CreateListForm/>
            <button onClick={closeClickHandler}>Close</button>
          </div> 
          : 
          <button onClick={addListClickHandler}>Create new checklist</button>
      }
    </div>
  );
}