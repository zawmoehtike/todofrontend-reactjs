import React from "react";
import Item from "./Item";

const styles = {
    done: {
        color: 'gray',
        textDecoration: 'line-through',
    }
};

class DoneList extends React.Component {
    render() {
        return (
            <ul style={styles.done}>
                {this.props.items.map(todo => {
                    return (
                        <Item
                            key={todo._id}
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

export default DoneList;
