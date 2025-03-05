import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Todo({ todo, listId }) {
  // how to update?
  const onChangeHandler = async () => {
    const url = `http://localhost:8080/lists/${listId}/todos/${todo.id}`;
    const requestOptions = {
      method: 'PUT',
    };
    const response = await fetch(url, requestOptions);
    console.log('response', response);
  };

  return (
    <div>
      <input type='checkbox' id={`todo-${todo.id}`} checked={todo.status} onChange={onChangeHandler}/>
      <label htmlFor={`todo-${todo.id}`}>{todo.description}</label>
    </div>
  );
}

export function List() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [todos, setTodos] = useState([]);

  const fetchList = async () => {
    const url = `http://localhost:8080/lists/${id}`;
    try {
      const response = await fetch(url);
      const list = await response.json();
      setData(list);
    } catch(error) {
      console.error(error);
      setData({});
    }
    console.log('fetch list', data.title);
    fetchTodos();
  };

  const fetchTodos = async () => {
    console.log('test: fetchTodos');
    const url = `http://localhost:8080/lists/${id}/todos`;
    const response = await fetch(url);
    const todos = await response.json();
    setTodos(todos);
  };
    
  useEffect(() => {
    fetchList();
  }, []);

  const deleteClickHandler = async () => {
    const url = `http://localhost:8080/lists/${id}`;
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(url, requestOptions);
    console.log('response', response);
    fetchList();
  };
  
  return (
    <div>
      <NavLink to='/'>Home</NavLink>
      {
        data.id ? 
          <div>
            <div>{data.title}</div> 
            {todos.map(todo => <Todo key={todo.id} todo={todo} listId={id}/>)}
            <button onClick={deleteClickHandler}>Delete this to do list</button>
          </div>
          : <p>This list does not exist anymore:(</p>
      }
    </div>
  );
}