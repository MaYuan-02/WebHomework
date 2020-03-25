import React, { Component } from 'react';

const TodoListHeader = () => <div>
        <h2>Todo List</h2>
        <p><i>点击条目即可实现“完成”和“未完成”的转换（灰色背景为“已完成”）</i></p>
    </div>

// class TodoListHeader extends Component{
//     render(){
//         return(
//             <h2>Todo List</h2>
//         );
//     }
// }

export default TodoListHeader;