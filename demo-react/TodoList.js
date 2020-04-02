import React, { Component } from 'react';
import ListItem from "./ListItem";
import NewItem from './NewItem';

class TodoList extends Component{
    constructor(props){
        super(props);
        this.state = {
            todoList:[
                {content:'React practice', done: true},
                {content:'game time', done: false}
            ]
        }
    }

    addNewItem = (newItemContent) => {
        const newList = [...this.state.todoList, {content: newItemContent, done: false}];
        this.setState({
            todoList: newList
        });
    }

    finishIt = (content) => {
        const newList = this.state.todoList;
        newList.map(item => {
            if(item.content === content){
                item.done = !item.done;
            }
        });
        this.setState({
            todoList: newList
        });
    }

    render(){
        return (
            <div>
                <div id='todoList'>
                    {
                        this.state.todoList.map(item => <ListItem item = {item} key = {item.content} finishIt = {this.finishIt}/>)
                    }
                </div>
                <NewItem addItem = {this.addNewItem}></NewItem>
            </div>
        );
    }
}
export default TodoList;