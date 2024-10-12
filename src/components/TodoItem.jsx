/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const TodoItem = ({ todo, handleEdit,handleCancel, handleDelete, isEditing, editingTodo, onSave, onEditChange }) => (

  <div>
    {isEditing ? (
      <>
        <input
          type="text"
          value={editingTodo.title || ""}
          onChange={(e) => onEditChange({ ...editingTodo, title: e.target.value })}
        />
        <select
          value={editingTodo.category || ""}
          onChange={(e) => onEditChange({ ...editingTodo, category: e.target.value })}
        >
          <option value="School">School</option>
          <option value="Work">Work</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>
        <button onClick={() => onSave(todo.id)}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </>
    ) : (
      <p>
        {todo.title}
        <i
          onClick={() => handleEdit(todo)}
          className="fa-solid fa-pen-to-square"
          style={{ cursor: "pointer", marginLeft: "10px" }}
        ></i>
        <i
          onClick={() => handleDelete(todo.id)}
          className="fa-solid fa-trash"
          style={{ cursor: "pointer", marginLeft: "10px" }}
        ></i>
      </p>
    )}
  </div>
);

export default TodoItem;
