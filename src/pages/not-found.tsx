import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">The page you are looking for could not be found.</p>
      <Link to="/" className="text-indigo-500 hover:text-indigo-700">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
