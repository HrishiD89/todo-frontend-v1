/* eslint-disable react/prop-types */

const AddTodoForm = ({ onSubmitHandler }) => {
  return (
    <form onSubmit={onSubmitHandler}>
      <fieldset>
        <legend>Add Todo</legend>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" placeholder="Title" required />
        <select name="category" id="category" defaultValue="School">
          <option value="School">School</option>
          <option value="Work">Work</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>
        <button type="submit">+</button>
      </fieldset>
    </form>
  );
};

export default AddTodoForm;
