// import axios from "axios";
// import { useNavigate,Link  } from "react-router-dom";

// function LoginPage() {
//   const navigate = useNavigate();
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     try {
//       await axios
//         .post("http://localhost:3000/login", {
//           email,
//           password,
//         })
//         .then((response) => {
//          alert(response.data.message);
//       console.log(response.data.token);
//       localStorage.setItem('user', JSON.stringify({ token:response.data.token }));
//       console.log('Token after login:', localStorage.getItem('user')); // Add this line
//       navigate('/', { replace: true });
          
//         });
//     } catch (error) {
//       console.log(error.response?.data || error.message);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={submitHandler}>
//         <fieldset>
//           <legend>Signup Form</legend>
//           <label htmlFor="email">Email :</label>
//           <input type="email" id="email" name="email" />
//           <label htmlFor="password">Password :</label>
//           <input type="password" id="password" name="password" />
//           <button type="submit">Login</button>
//         </fieldset>
//       </form>
//       <p>Dont have a Account ? <Link to="/signup">Signup</Link>  </p>
//     </>
//   );
// }

// export default LoginPage;

import axios from "axios";
import { useNavigate,Link  } from "react-router-dom";
import { useAuth } from "../AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const submitHandler = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await axios
        .post("http://localhost:3000/login", {
          email,
          password,
        })
        .then((response) => {
          alert(response.data.message);
          login(response.data.token); 
          navigate('/', { replace: true });
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
          <label htmlFor="email">Email :</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Password :</label>
          <input type="password" id="password" name="password" />
          <button type="submit">Login</button>
        </fieldset>
      </form>
      <p>Dont have a Account ? <Link to="/signup">Signup</Link>  </p>
    </>
  );
}

export default LoginPage;
