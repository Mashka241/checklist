import { NavLink } from 'react-router-dom';
import { CreateList } from './CreateList';

export function Home() {
  return(
    <div>
      <h1>Home</h1>
      <CreateList/>
      <NavLink to='lists' end>Show all created lists</NavLink>
    </div>
  );
}