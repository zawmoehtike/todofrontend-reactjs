import React from "react";
import TodoList from "./TodoList";
import DoneList from "./DoneList";

class App extends React.Component {
    /// State
    state = {
        todoList: [
            { _id: '1', subject: 'Milk', status: 0},
            { _id: '2', subject: 'Butter', status: 1},
            { _id: '3', subject: 'Egg', status: 0},
            { _id: '4', subject: 'Bread', status: 1},
        ]
    };

    /// Input
    inputSubject = React.createRef();
    autoId = this.state.todoList.length;

    /// Api
    api = 'http://localhost:8000/tasks';

    /// Like onCreate() in Android
    // componentWillMount(), componentDidMount()
    componentDidMount() {
        fetch(this.api).then( res => res.json() ).then( todoRemoteList => {
           this.setState({
               todoList: todoRemoteList
           })
        });
    }

    /// Function/Method
    addTodo = () => {
        fetch(this.api, { method: 'POST', headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ subject: this.inputSubject.current.value })})
            .then( res => res.json())
            .then(todoRemote => {
               this.setState({
                   todoList: [...this.state.todoList, todoRemote]
               })
            });
    }

    removeTodo = _id => {
        fetch(`${this.api}/${_id}`, { method: 'DELETE'});

        this.setState({
            todoList: this.state.todoList.filter(item => item._id !== _id)
        });
    }

    toggleTodo = _id => {
        this.setState({
            todoList: this.state.todoList.map(todo => {

                if (todo._id === _id) {
                    todo.status = +!todo.status;

                    fetch(`${this.api}/${_id}`, {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({status: todo.status})
                    });
                }

                return todo;
            })
        })
    }

    render() {
        return (
            <div>
                <h1>
                    React To-do List Count
                    ({this.state.todoList.filter(todo => {
                        return todo.status === 0;
                    }).length})
                </h1>

                <TodoList
                    items={this.state.todoList.filter(todo => todo.status === 0)}
                    remove={this.removeTodo}
                    toggle={this.toggleTodo}
                />

                <DoneList
                    items={this.state.todoList.filter(todo => todo.status === 1)}
                    remove={this.removeTodo}
                    toggle={this.toggleTodo}
                />

                <div>
                    <input type="text" ref={this.inputSubject} />
                    <button onClick={this.addTodo}>+</button>
                </div>
            </div>
        );
    }
}

export default App;
