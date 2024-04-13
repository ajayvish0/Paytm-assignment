import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="rounded-lg bg-white  w-96 text-center p-2 h-max px-4">
        <Header label={"Sign Up"} />
        <SubHeading label={"Enter Your information to create an account "} />
        <InputBox
          onchange={(e) => {
            setFirstname(e.target.value);
          }}
          placeholder="John"
          label={"First Name"}
          type="text"
        />
        <InputBox
          onchange={(e) => {
            setLastname(e.target.value);
          }}
          placeholder="Doe"
          label={"Last Name"}
          type="text"
        />
        <InputBox
          placeholder="harkirat@gmail.com"
          label={"Email"}
          type="email"
          onchange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <InputBox
          onchange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="123456"
          label={"Password"}
          type="password"
        />
        <div className="pt-4">
          <Button
            label={"Sign Up"}
            onclick={async () => {
              // axios({
              //   method: "post",
              //   url: "http://localhost:3000/api/v1/user/signup",

              //   data: {
              //     userName: email,
              //     firstName: firstname,
              //     lastName: lastname,
              //     password: password,
              //   },
              // });
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  username: email,
                  firstName: firstname,
                  lastName: lastname,
                  password: password,
                }
              );
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }}
          />
        </div>
        <BottomWarning
          label={"Already have an account ? "}
          buttonText={"Sign in"}
          to={"/signin"}
        />
      </div>
    </div>
  );
};

export default Signup;
