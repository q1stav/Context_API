import React from 'react';
import { ToDo } from './ToDo';


export const ToFind=({toFind,onClickDelete,refreshToDoList})=>{

    
    return(
    <>
        {toFind.map(({ id, title }) => (
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