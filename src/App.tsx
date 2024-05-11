import Auth from '@components/Auth'
import Form from '@components/Form'
import Interviewers from '@components/Interviewers'
import Interviews from '@components/Interviews'
import { Login } from '@components/Login'
import MentorAssignmentModal from '@components/MentorAssignmentModal'
import Profile from '@components/Profile'
import Register from '@components/Register'
import SortableTable from '@components/SortableTable'
import NotFoundPage from '@pages/NotFoundPage'
import React from 'react'
import { Provider as ReduxStoreProvider } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HistoryRouter } from 'redux-first-history/rr6'
import { useAppSelector } from '../src/hooks/redux'
import { RootState } from '../src/store'
import JobApplicationForm from './components/JobApplicationForm'
import PreviousLogin from './components/PreviousLogin'
import PreviousRegister from './components/PreviousRegister'
import { history, store } from './store'
import InterviewerModal from '@components/InterviewerModal'

const App: React.FC = () => {
  return (
    <ReduxStoreProvider store={store}>
      <Auth />
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<Navigate to="/apply" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<SortableTable />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/interviewers" element={<Interviewers />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/apply" element={<Form />} />
          <Route
            path="/int"
            element={
              <InterviewerModal closeModal={() => console.log()} size="md" />
            }
          />

          <Route path="/previous-login" element={<PreviousLogin />} />
          <Route path="/previous-register" element={<PreviousRegister />} />
          <Route path="/form" element={<JobApplicationForm />} />

          <Route
            path="/test"
            element={
              <MentorAssignmentModal
                closeModal={() => console.log()}
                size="lg"
              ></MentorAssignmentModal>
            }
          />
        </Routes>
      </HistoryRouter>
    </ReduxStoreProvider>
  )
}

function ProtectedRoute() {
  const isAuthenticated: boolean = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  )
  console.log(isAuthenticated)
  return isAuthenticated ? <SortableTable /> : <Navigate to="/login" />
}

export default App
