import { Login } from '@components/Login';
import Profile from '@components/Profile';
import ProfileDropDown from '@components/ProfileDropdown';
import ProfilePage from '@components/ProfilePage';
import Register from '@components/Register';
import SortableTable from '@components/SortableTable';
import NotFoundPage from '@pages/NotFoundPage';
import React from 'react';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6';
import { useAppSelector } from '../src/hooks/redux';
import { RootState } from '../src/store';
import JobApplicationForm from './components/JobApplicationForm';
import PreviousLogin from './components/PreviousLogin';
import PreviousRegister from './components/PreviousRegister';
import { history, store } from './store';

const App: React.FC = () => {

  return (
    <ReduxStoreProvider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<Navigate to="/apply" />} />
          <Route path="/previous-login" element={<PreviousLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/previous-register" element={<PreviousRegister />} />
          <Route path="/register" element={<Register />} />
          <Route path="/apply" element={<JobApplicationForm />} />
          <Route path="/dashboard" element={<SortableTable />} />
          <Route path="/dashboard2" element={<ProfileDropDown />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/test3" element={<ProfilePage />} />
          <Route path="/profile" element={<Profile />} />
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
