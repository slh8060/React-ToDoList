var TodoList = React.createClass({
    getInitialState: function () {
        return {
            todolist: []
        }
    },
    handleChange: function (rows) {
        this.setState({
            todolist: rows
        })
    },
    render: function () {
        return (
            <div>
                <AddData onAdd={this.handleChange} todo={this.state.todolist}/>
                <ListView onDel={this.handleChange} onMod={this.handleChange} todo={this.state.todolist}/>
            </div>
        )
    }
});

var AddData = React.createClass({
    handleAdd: function (e) {
        e.preventDefault();
        var inputDom = this.refs.inputnew;
        var newthing = inputDom.value.trim();
        var rows = this.props.todo;
        if (newthing !== '') {
            rows.push(newthing);
            this.props.onAdd(rows);
        }
        inputDom.value = '';
    },
    render: function () {
        return (
            <form onSubmit={this.handleAdd}>
                <input type="text" ref="inputnew" placeholder="input sth..."/>
            </form>
        )
    }
});

var ListView = React.createClass({
    handleDel:function (e) {
        var delIndex = e.target.getAttribute('data-key');
        this.props.todo.splice(delIndex,1);
        this.props.onDel(this.props.todo);
    },
    handleMod:function (e) {
        var modIndex = e.target.getAttribute('data-val');
        var iptEdit = <input type="text"/>;
        this.props.todo.splice(modIndex,1,iptEdit);
        this.props.onMod(this.props.todo);
    },

    render: function () {
        return (
            <ul>
                {
                    this.props.todo.map(function (item, i) {
                        return (
                            <li>
                                <span onClick={this.handleMod} data-val={i}>{item}</span>
                                <button className="destroy" onClick={this.handleDel} data-key={i}>delete</button>
                            </li>
                        );
                    }.bind(this))
                }
            </ul>
        );
    }
});


ReactDOM.render(
    <TodoList/>,
    document.getElementById('app')
);