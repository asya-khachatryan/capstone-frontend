import ApplicationForm from '@components/ApplicationForm'
import Auth from '@components/Auth'
import Dashboard from '@components/Dashboard'
import Interviewers from '@components/Interviewers'
import Interviews from '@components/Interviews'
import { Login } from '@components/Login'
import Profile from '@components/Profile'
import Register from '@components/Register'
import SpecializationPage from '@components/SpecializationPage'
import NotFoundPage from '@pages/NotFoundPage'
import React from 'react'
import { Provider as ReduxStoreProvider } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HistoryRouter } from 'redux-first-history/rr6'
import { useAppSelector } from '../src/hooks/redux'
import { RootState } from '../src/store'
import { history, store } from './store'

const App: React.FC = () => {
  return (
    <ReduxStoreProvider store={store}>
      <Auth />
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<Navigate to="/apply" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/interviewers" element={<Interviewers />} />
          <Route path="/specializations" element={<SpecializationPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/apply" element={<ApplicationForm />} />
        </Routes>
      </HistoryRouter>
    </ReduxStoreProvider>
  )
}

function ProtectedRoute() {
  const isAuthenticated: boolean = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  )
  return isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
}

export default App
