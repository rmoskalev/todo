import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Добро пожаловать!</h1>
        <p className="text-lg mb-6">Это главная страница приложения.</p>
        <Link to="/register" className="text-indigo-600 hover:text-indigo-800 text-lg">
          Перейти на страницу регистрации
        </Link>
      </div>
    </div>
  );
};

export default Home;