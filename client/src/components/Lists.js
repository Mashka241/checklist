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
  
    // const deleteClickHandler = async () => {
    //   console.log('deleting list 2');
    //   const id = 2;
    //   const url = `http://localhost:8080/lists/${id}`;
    //   const requestOptions = {
    //     method: 'DELETE',
    //     headers: { 'Content-Type': 'application/json' },
    //   };
    //   const response = await fetch(url, requestOptions);
    //   fetchLists();
    //   console.log('response', response);
    // };
  
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
        {/* <button onClick={deleteClickHandler}>delete second list</button> */}
      </div>
    );
  }