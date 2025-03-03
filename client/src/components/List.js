import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export function List() {
    const [data, setData] = useState({});
    const { id } = useParams();
    
    useEffect(() => {
      const fetchLists = async () => {
        const url = `http://localhost:8080/lists/${id}`;
        const response = await fetch(url);
        const list = await response.json();
        setData(list);
      };
      fetchLists();
    }, []);
  
    return (
      <div>
        <NavLink to='/'>Home</NavLink>
        <div>{data.title}</div>
      </div>
    );
  }