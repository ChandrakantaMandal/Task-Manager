import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { validateEmail } from "../../utils/helper";

import Input from "../../components/Inputes/Input";
import Authlayout from "../../components/layouts/Authlayout";
import { UserContext } from "../../context/userContext";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
     e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email adress");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    //Login Api call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);

        updateUser(response.data);

        //Redriect based on role
        if (role == "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong.Please try again.");
      }
    }
  };

  return (
    <Authlayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-sx text-slate-700 mt-[5px] mb-6 ">
          Please Enter your details to Login
        </p>
        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            lable="Email Adress"
            placeholder="Example@.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassowrd(target.value)}
            lable="password"
            placeholder="Min 8 Characters"
            type="password"
          />
          {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            LOGIN
          </button>
          <p>
            Don't have an account?{""}
            <Link className="font-medium text-blue-500 underline " to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </Authlayout>
  );
};

export default Login;
