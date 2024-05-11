import { useAppDispatch } from '@hooks/redux'
import { getCurrentUser } from '@redux/authSlice'
import { useEffect } from 'react'

const Auth: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log('here')
    dispatch(getCurrentUser())
  }, [])

  return <></>
}

export default Auth
