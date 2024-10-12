import axios from "axios";
import { useNavigate,Link  } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(e.target);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await axios
        .post("http://localhost:3000/signup", {
          name,
          email,
          password,
        })
        .then((response) => {
          alert(response.data.message);
          e.target.reset();
          navigate("/login");
        });
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <fieldset>
          <legend>Signup Form</legend>
          <label htmlFor="name">Name :</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="email">Email :</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Password :</label>
          <input type="password" id="password" name="password" />
          <button type="submit">Sign Up</button>
        </fieldset>
      </form>
      <p>Already have an Account ? <Link to="/login">Login</Link>  </p>
    </>
  );
}

export default SignupPage;
