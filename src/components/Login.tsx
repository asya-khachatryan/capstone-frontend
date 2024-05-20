import { useAppDispatch } from '@hooks/redux'
import { Button, Input, Typography } from '@material-tailwind/react'
import { login } from '@redux/authSlice.js'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleLogin = () => {
    dispatch(login({ username, password }))
      .then((result) => {
        console.log(result)
        if (result) {
          navigate('/dashboard')
        }
      })
      .catch((error) => {
        console.error('Login failed:', error)
      })
  }

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography
            variant="h2"
            className="font-bold mb-4"
            placeholder={undefined}
          >
            Login
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
            placeholder={undefined}
          >
            Enter your username and password to log in.
          </Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
              placeholder={undefined}
            >
              Username
            </Typography>
            <Input
              size="lg"
              placeholder="Username"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              crossOrigin={undefined}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
              placeholder={undefined}
            >
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              crossOrigin={undefined}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="mt-6"
            fullWidth
            placeholder={undefined}
            onClick={handleLogin}
          >
            Login
          </Button>

          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium mt-4"
            placeholder={undefined}
          >
            Not registered?
            <Link to="/register" className="text-gray-900 ml-1">
              Create account
            </Link>
          </Typography>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="public/banner.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  )
}

export default Login
