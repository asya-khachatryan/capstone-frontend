import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { getCurrentUser } from '@redux/authSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'store'

const Auth: React.FC = () => {
  const dispatch = useAppDispatch()
  // const navigate = useNavigate()

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [])

  // const isAuthenticated: boolean = useAppSelector(
  //   (state: RootState) => state.auth.isAuthenticated,
  // )
  // isAuthenticated ? null : navigate("/login")

  return <></>
}

export default Auth
