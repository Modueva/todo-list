import React, {useState} from 'react';
import './App.css';
import Header from './compotents/Header/Header.jsx';
import AddTodo from './compotents/AddTodo/AddTodo.jsx';
import TodoList from './compotents/TodoList/TodoList.jsx';
import { Container } from 'react-bootstrap';

function App() {
//useState  хранит всю нашу информацию то есть это локальный аналог БД 
  const [todo, setTodo] =useState([
    {
      id: 1,
      title: 'first todo',
      status: true
    },
    {    
      id: 2,
      title: 'second todo',
      status: true
    },
    {
      id: 3,
      title: 'third todo',
      status: false
    },
  ]);

  return (
    <Container>
      <Header/>
      <AddTodo todo={todo} setTodo={setTodo}/>
      <TodoList todo={todo} setTodo={setTodo}/>
    </Container>
  );
}

export default App;
