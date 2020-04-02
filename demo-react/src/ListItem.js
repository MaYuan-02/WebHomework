import React, { Component } from "react";
import './ListItem.css';

class ListItem extends Component{
    constructor(props){
        super(props);
    }

    doIt = () => {
        this.props.finishIt(this.props.item.content);
    }

    render(){
        const item = this.props.item;
        if(item.done){
            return <p onClick={this.doIt} id={item.content} className="done-item">{item.content}</p>
        }else{
            return <p onClick={this.doIt} id={item.content} className="item">{item.content}</p>
        }
    }
}
export default ListItem;