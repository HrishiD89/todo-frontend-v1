import axios from "axios";
import { useState,useEffect,useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import { useAuth } from "../AuthContext";


const TodoPage = () => {

  const navigate = useNavigate();
  const { token, logout } = useAuth();


  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState({});
  const [currentTodoId, setCurrentTodoId] = useState(null);


  
   // Memoize getTodos
   const getTodos = useCallback(async () => {
    if (todos.length === 0) {
      try {
        const response = await axios.get("http://localhost:3000/todos", {
          headers: {
            Authorization: token,
          },
        });
        console.log(response);
        setTodos(response.data.titles);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
  }, [token, todos]);


  useEffect(() => {
    if (token && todos.length === 0) {
      getTodos();
    }
  }, [token, getTodos,todos.length]);

  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const category = e.target.category.value;

    try {
      const response = await axios.post("http://localhost:3000/todo", { title, category } ,{ headers: { Authorization: token} });
      setTodos([...todos, { title: response.data.title, category: response.data.category }]);
      e.target.reset();
    } catch (error) {
      console.error("Error creating Todo:", error);
    }
  };

  const handleEdit = (todo) => {
    setCurrentTodoId(todo.id);
    setEditingTodo({ title: todo.title, category: todo.category });
  };

  const handleDelete = async (todoId) => {
    try {
      await axios.delete("http://localhost:3000/todo", { headers: { Authorization: token,  todoid: todoId } });
      getTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const confirmEdit = async (todoId) => {
    try {
      const response = await axios.put("http://localhost:3000/todo", editingTodo, { headers: {Authorization: token, todoid: todoId } });
      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.map((todo) => {
          if (todo.id === todoId) {
            return { ...editingTodo, id: todoId };
          }
          return todo;
        });
        return updatedTodos;
      });
      setCurrentTodoId(null);
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  
  const handleCancel = () => {
    setCurrentTodoId(null);
    setEditingTodo({});
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <AddTodoForm onSubmitHandler={onSubmitHandler} />

      <TodoList
        todos={todos}
        currentTodoId={currentTodoId}
        editingTodo={editingTodo}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        confirmEdit={confirmEdit}
        setEditingTodo={setEditingTodo}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default TodoPage;
