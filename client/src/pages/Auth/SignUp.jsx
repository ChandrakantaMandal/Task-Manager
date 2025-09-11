import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/Inputes/Input";
import ProfilePhotoSelector from "../../components/Inputes/ProfilePhotoSelector";
import Authlayout from "../../components/layouts/Authlayout";
import { UserContext } from "../../context/userContext";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import { validateEmail } from "../../utils/helper";
import uploadImage from "../../utils/uplodeImage";

const Signup = () => {
  const [fullname, setFullname] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullname) {
      setError("Please enter full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return; // ✅ stop execution
    }

    setError("");

    try {
      // Upload Image if present
      if (profilePic) {
        const imaUploadRes = await uploadImage(profilePic);
        profileImageUrl = imaUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullname,
        email,
        password,
        adminInviteToken,
        profileImageUrl,
      });

      console.log("Signup response:", response.data); // 👈 debug

      const { token, role } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      console.error("Signup error:", error); // 👈 debug
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Authlayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-sx text-slate-700 mt-[5px] mb-6 ">
          Join us today by entering your details below
        </p>
        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <Input
            value={fullname}
            onChange={({ target }) => setFullname(target.value)}
            lable="Full Name"
            placeholder="Jony"
            type="text"
          />
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
          <Input
            value={adminInviteToken}
            onChange={({ target }) => setAdminInviteToken(target.value)}
            lable="Admin Invite Token "
            placeholder="6 digit code"
            type="text"
          />
          {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            SIGNUP
          </button>
          <p>
            Allrady an account?{""}
            <Link className="font-medium text-blue-500 underline " to="/login">
              LogIn
            </Link>
          </p>
        </form>
      </div>
    </Authlayout>
  );
};

export default Signup;
