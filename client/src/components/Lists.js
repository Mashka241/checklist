import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { CreateList } from './CreateList';

export function Lists() {
  const [data, setData] = useState([]);
  
  const fetchLists = async () => {
    const url = 'http://localhost:8080/lists';
    const response = await fetch(url);
    const lists = await response.json();
    console.log('lists:', lists);
    setData(lists);
  };
    
  useEffect(() => {
    fetchLists();
  }, []);
  
  return(
    <div>
      <NavLink to='/' end>Home</NavLink>
      <h1>Lists</h1>
      <ul>{data.map(el => {
        return (
          <NavLink key={el.id} to={`/lists/${el.id}`}>
            <li>{el.title}</li>
          </NavLink>
        );
      })}</ul>
      <CreateList/>
    </div>
  );
}