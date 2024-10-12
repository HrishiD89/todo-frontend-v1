/* eslint-disable react/prop-types */
import TodoItem from "./TodoItem";

const TodoList = ({ todos, currentTodoId, editingTodo, handleEdit, handleDelete,handleCancel, confirmEdit, setEditingTodo }) => {
  // Group todos by category
  const groupedTodos = todos.reduce((acc, todo) => {
    if (!acc[todo.category]) {
      acc[todo.category] = [];
    }
    acc[todo.category].push(todo);
    return acc;
  }, {});

  

  return (
    <fieldset>
      <legend>Todo List</legend>

      {/* Iterate over grouped categories */}
      {Object.keys(groupedTodos).map((category) => (
        <div key={category}>
          <h1>{category} </h1>
          
          {groupedTodos[category].map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isEditing={currentTodoId === todo.id}
              editingTodo={editingTodo}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              onSave={confirmEdit}
              onEditChange={setEditingTodo}
              handleCancel={handleCancel}
            />
          ))}
        </div>
      ))}
    </fieldset>
  );
};

export default TodoList;
