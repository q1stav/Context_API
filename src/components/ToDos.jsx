import React from 'react';
import { ToDo } from './ToDo';
import { AppContext } from './context';
import { useContext } from 'react';


export const ToDos=({onClickDelete,refreshToDoList})=>{
    const  toDos  = useContext(AppContext);
    return(
    <>
        {toDos.map(({ id, title }) => (
            <ToDo
            id={id}
            title={title}
            onClickDelete={onClickDelete}
            rerefrestToDoList={refreshToDoList}
            key={id}
      />))}
    </>
      
    )
}