import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { login } from '../redux/authSlice.js';

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login({ username, password }));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-auto">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-16 h-16 mx-auto text-gray-600">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
          <h2 className="mt-2 text-xl font-semibold">Login</h2>
        </div>
        <form className="mt-4" >
          <div className="mt-1">
            <input
              type="text"
              id="username"
              className="block w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:border-indigo-500"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              min="8" max="20"
            />
            <input
              type="password"
              id="password"
              className="block w-full border border-gray-300 rounded p-2 mt-4 focus:outline-none focus:border-indigo-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$"
            />
            <button
              // type='submit'
              className="w-full bg-indigo-500 text-white p-3 rounded mt-4 focus:outline-none focus:bg-indigo-600 hover:bg-indigo-600"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <span>Don't have an account?</span>{' '}
          <Link
            to="/register"
            className="text-indigo-500 hover:text-indigo-700">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
