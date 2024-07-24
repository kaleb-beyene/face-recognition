import React, { useState, useEffect } from 'react';
import {
  Input,
  Button,
  Typography,
  Select, Option
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, logout } from '@/feature/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


export function SignUp() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, status, user, registerUserLoading, registerUserSuccess, registerUserFailed } = useSelector((state) => state.auth)

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = () => {

    const formData =
    {
      username: username,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      role: role
    }
    dispatch(registerUser(formData))

  };


  useEffect(() => {
    if (registerUserSuccess === true) {
      dispatch(logout());
      navigate("/auth/sign-in");
    }
  }, [registerUserSuccess])

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" >
          <div className='text-3xl text-center font-bold pb-10'>Create an Account</div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              User Name
            </Typography>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="lg"
              placeholder="username"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Email
            </Typography>
            <Input
              type='email'
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type='password'
              size="lg"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              First Name
            </Typography>
            <Input
              size="lg"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Last Name
            </Typography>
            <Input
              size="lg"
              placeholder="Last Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Role
            </Typography>
            <Select
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              value={role}
              onChange={(e) => setRole(e)}
            >
              {/* <Option value='student'>Student</Option> */}
              <Option value='faculty'>Faculty</Option>
              <Option value='staff'>Staff</Option>
            </Select>
          </div>

          {
            registerUserFailed &&
            <div className="my-3 flex flex-col gap-6">
              <Typography variant="small" className="-mb-3 font-normal text-red-400 text-sm">
                Error While creating account, try again later please
              </Typography>
            </div>
          }

          <Button className="mt-6" fullWidth onClick={handleSubmit} disabled={registerUserLoading}>
            {registerUserLoading ? "Loading..." : "Register Now"}
          </Button>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}

export default SignUp;
