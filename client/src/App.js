import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Home() {
  return(
    <div>
      <h1>Home</h1>
      <NavLink to='lists' end>Show lists</NavLink>
    </div>
  );
}

function Lists() {
  const [data, setData] = useState([]);

  const fetchLists = async () => {
    const url = 'http://localhost:8080/lists';
    const response = await fetch(url);
    const lists = await response.json();
    console.log('lists:', lists);
    setData(lists);
  }
  
  useEffect(() => {
    fetchLists();
  }, []);

  const addListClickHandler = async () => {
    console.log('creating new list');
    const url = 'http://localhost:8080/lists';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({title: 'countries to visit', description: 'nice description'})
    }
    const response = await fetch(url, requestOptions);
    fetchLists();
    console.log('response', response);
  }

  const deleteClickHandler = async () => {
    console.log('deleting list 2');
    const id = 2;
    const url = `http://localhost:8080/lists/${id}`;
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(url, requestOptions);
    fetchLists();
    console.log('response', response);
  }

  return(
    <div>
      <NavLink to='/' end>Home</NavLink>
      <h1>Lists</h1>
      <ul>{data.map(el => {
        return (
          <li key={el.id}>{el.title}</li>
        )
      })}</ul>
      <button onClick={addListClickHandler}>Add list</button>
      <button onClick={deleteClickHandler}>delete second list</button>
    </div>
  );
}

function List() {
  const [data, setData] = useState({});
  
  useEffect(() => {
    const fetchLists = async () => {
      const url = 'http://localhost:8080/lists/2';
      const response = await fetch(url);
      const list = await response.json();
      console.log('lists:', list);
      setData(list);
    }
    fetchLists();
  }, []);

  return (
    <div>{data.title}</div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='lists' element={<Lists />} />
          <Route path='lists/:id' element={<List/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
