import React from "react";
import Item from "./Item";

class TodoList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.items.map((todo) => {
                    return (
                        <Item
                            key={todo._id} // key is necessary
                            item={todo}
                            remove={this.props.remove}
                            toggle={this.props.toggle}
                        />
                    )
                })}
            </ul>
        );
    }
}

export default TodoList;
