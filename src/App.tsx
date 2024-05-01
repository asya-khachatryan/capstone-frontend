import React, { useState, useEffect } from 'react';
import { Provider as ReduxStoreProvider } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { HistoryRouter } from 'redux-first-history/rr6'
import { useAppDispatch, useAppSelector } from '../src/hooks/redux';
import { RootState } from '../src/store';
import Login from './components/Login'
import Register from './components/Register'
import { history, store } from './store'
import JobApplicationForm from './components/JobApplicationForm'
import SortableTable from '@components/SortableTable';
import { ThemeProvider } from '@material-tailwind/react';
import ProfileDropDown from '@components/ProfileDropdown';
import NotFoundPage from '@pages/NotFoundPage';
import SignIn from '@components/SignIn';
import SignUp from '@components/SignUp';

const App: React.FC = () => {

  return (
    <ReduxStoreProvider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<Navigate to="/apply" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/apply" element={<JobApplicationForm />} />
          <Route path="/dashboard" element={<SortableTable />} />
          <Route path="/dashboard2" element={<ProfileDropDown />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/test" element={<SignIn />} />
          <Route path="/test2" element={<SignUp />} />
        </Routes>
      </HistoryRouter>
    </ReduxStoreProvider>
  );
}

function ProtectedRoute() {
  const isAuthenticated: boolean = useAppSelector((state: RootState) => state.auth.isAuthenticated);
  console.log(isAuthenticated)
  return isAuthenticated ? <SortableTable /> : <Navigate to="/login" />;
}

export default App
