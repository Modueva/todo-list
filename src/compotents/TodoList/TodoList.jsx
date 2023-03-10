import React, {useEffect, useState} from 'react';
import { Button, ButtonGroup, Col, FormControl, Row } from 'react-bootstrap';
import s from "./TodoList.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faLock, faLockOpen, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

function TodoList ({todo, setTodo}){

    const [edit, setEdit] =  useState(null);
    const [value, setValue] = useState('')
    const [filtered,setFiltered] = useState(todo)


    /* хук  useEffect который будут выполняться после каждой прессовки страницы */
    useEffect(() => {
        setFiltered(todo)     
    }, [todo]);


     /*====функция для Филтирование==== */
    function todoFilter(status) {
        if(status ==='all'){
            setFiltered(todo)
        }else{
            let newTodo = [...todo].filter( item => item.status === status)
            setFiltered(newTodo)
        }
    }

    /*====функция для удаления==== */
    function deleteTodo(id){
        let newTodo = [...todo].filter(item => item.id!=id)
        setTodo(newTodo);
    }
    /*====Функция для закрытие==== */
    function  statusTodo(id) {
        let newTodo =[...todo].filter(item => {
            if(item.id == id){
                item.status = !item.status
            }
            return item
        })
        setTodo(newTodo)
    }
    /*====Функция для редактирования==== */
    function editTodo (id, title) {
        setEdit(id)
        setValue(title)
    }
    /*====Функция для сохранения==== */
    function saveTodo(id){
        let newTodo = [...todo].map(item => {
            if(item.id == id){
                item.title = value
            }
            return item
        })
        setTodo(newTodo)
        setEdit(null)
    }
    return (
        <div>
            <Row>
                <Col className={s.filter}>
                    <ButtonGroup aria-label="Basic example" className={s.btns}>
                        <Button variant="secondary" onClick={ ()=> todoFilter('all')}>Все</Button>
                        <Button variant="secondary" onClick={ ()=> todoFilter(true)}>Открытие</Button>
                        <Button variant="secondary" onClick={ ()=> todoFilter(false)}>Закрытие</Button>
                    </ButtonGroup>
                </Col>
            </Row>
            {
                filtered.map( item => (
                    <div key={item.id} className={s.listItems}>
                        {
                            edit == item.id ? 
                                <div>
                                    <input value={value} onChange={ (e) => setValue(e.target.value)} />                                    
                                </div>:    
                                <div className={ !item.status ? s.close : ''}>{item.title}</div>

                        }

                        {
                            edit == item.id ? 
                                <div>
                                    <Button onClick={ () => saveTodo(item.id)} size="sm"> <FontAwesomeIcon icon={faSave} /></Button>
                                </div>
                                :
                                <div>
                                    <Button onClick={ () => deleteTodo(item.id) } size="sm" > <FontAwesomeIcon icon={faTrash}/> </Button>
                                    <Button onClick={ () => editTodo(item.id, item.title) } className={s.btn} size="sm"> <FontAwesomeIcon icon={faEdit}/> </Button>
                                    <Button onClick={ () => statusTodo(item.id) } className={s.btn} size="sm" >
                                    {
                                        item.status ? <FontAwesomeIcon icon={faLock}/>:<FontAwesomeIcon icon={faLockOpen}/> 
                                    }
                                    </Button>
                                      
                                </div>

                        }
                        
                    </div>
                ))
            }
        </div>
    );
};


export default TodoList;