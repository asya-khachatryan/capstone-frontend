import { useAppDispatch } from '@hooks/redux'
import {
  Button,
  Collapse,
  IconButton,
  Navbar,
  Typography,
} from '@material-tailwind/react'
import { logout } from '@redux/authSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NavigationBar: React.FC = () => {
  const [openNav, setOpenNav] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false),
    )
  }, [])

  const logoutAndNavigate = () => {
    dispatch(logout()).then(() => navigate('/login'))
  }

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <svg
          width="16"
          height="15"
          viewBox="0 0 16 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 0.5C4.73478 0.5 4.48043 0.605357 4.29289 0.792893C4.10536 0.98043 4 1.23478 4 1.5C4 1.76522 4.10536 2.01957 4.29289 2.20711C4.48043 2.39464 4.73478 2.5 5 2.5H11C11.2652 2.5 11.5196 2.39464 11.7071 2.20711C11.8946 2.01957 12 1.76522 12 1.5C12 1.23478 11.8946 0.98043 11.7071 0.792893C11.5196 0.605357 11.2652 0.5 11 0.5H5ZM2 4.5C2 4.23478 2.10536 3.98043 2.29289 3.79289C2.48043 3.60536 2.73478 3.5 3 3.5H13C13.2652 3.5 13.5196 3.60536 13.7071 3.79289C13.8946 3.98043 14 4.23478 14 4.5C14 4.76522 13.8946 5.01957 13.7071 5.20711C13.5196 5.39464 13.2652 5.5 13 5.5H3C2.73478 5.5 2.48043 5.39464 2.29289 5.20711C2.10536 5.01957 2 4.76522 2 4.5ZM0 8.5C0 7.96957 0.210714 7.46086 0.585786 7.08579C0.960859 6.71071 1.46957 6.5 2 6.5H14C14.5304 6.5 15.0391 6.71071 15.4142 7.08579C15.7893 7.46086 16 7.96957 16 8.5V12.5C16 13.0304 15.7893 13.5391 15.4142 13.9142C15.0391 14.2893 14.5304 14.5 14 14.5H2C1.46957 14.5 0.960859 14.2893 0.585786 13.9142C0.210714 13.5391 0 13.0304 0 12.5V8.5Z"
            fill="#90A4AE"
          />
        </svg>

        <a href="/dashboard" className="flex items-center">
          Dashboard
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#90A4AE"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>

        <a href="/interviews" className="flex items-center">
          Interviews
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 8.5C16 10.6217 15.1571 12.6566 13.6569 14.1569C12.1566 15.6571 10.1217 16.5 8 16.5C5.87827 16.5 3.84344 15.6571 2.34315 14.1569C0.842855 12.6566 0 10.6217 0 8.5C0 6.37827 0.842855 4.34344 2.34315 2.84315C3.84344 1.34285 5.87827 0.5 8 0.5C10.1217 0.5 12.1566 1.34285 13.6569 2.84315C15.1571 4.34344 16 6.37827 16 8.5ZM10 5.5C10 6.03043 9.78929 6.53914 9.41421 6.91421C9.03914 7.28929 8.53043 7.5 8 7.5C7.46957 7.5 6.96086 7.28929 6.58579 6.91421C6.21071 6.53914 6 6.03043 6 5.5C6 4.96957 6.21071 4.46086 6.58579 4.08579C6.96086 3.71071 7.46957 3.5 8 3.5C8.53043 3.5 9.03914 3.71071 9.41421 4.08579C9.78929 4.46086 10 4.96957 10 5.5ZM8 9.5C7.0426 9.49981 6.10528 9.77449 5.29942 10.2914C4.49356 10.8083 3.85304 11.5457 3.454 12.416C4.01668 13.0706 4.71427 13.5958 5.49894 13.9555C6.28362 14.3152 7.13681 14.5009 8 14.5C8.86319 14.5009 9.71638 14.3152 10.5011 13.9555C11.2857 13.5958 11.9833 13.0706 12.546 12.416C12.147 11.5457 11.5064 10.8083 10.7006 10.2914C9.89472 9.77449 8.9574 9.49981 8 9.5Z"
            fill="#90A4AE"
          />
        </svg>
        <a href="/interviewers" className="flex items-center">
          Interviewers
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#90A4AE"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
          />
        </svg>

        <a href="/specializations" className="flex items-center">
          Specializations
        </a>
      </Typography>
    </ul>
  )

  return (
    <Navbar
      className="mx-auto max-w-screen-3xl px-4 py-2 lg:px-8 lg:py-4"
      color="white"
      variant="gradient"
    >
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Talent Journey
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1">
          <Button
            variant="text"
            size="sm"
            className="hidden lg:inline-block"
            onClick={() => navigate('/profile')}
          >
            <span>My profile</span>
          </Button>
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
            onClick={() => logoutAndNavigate()}
          >
            <span>Logout</span>
          </Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center gap-x-1">
            <Button
              fullWidth
              variant="text"
              size="sm"
              className=""
              onClick={() => navigate('/profile')}
            >
              <span>My profile</span>
            </Button>
            <Button
              fullWidth
              variant="gradient"
              size="sm"
              className=""
              onClick={() => logoutAndNavigate()}
            >
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </Collapse>
    </Navbar>
  )
}

export default NavigationBar
