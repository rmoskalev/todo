import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import RegisterForm from '@features/auth/register-form';
import Home from '@pages/home';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/register" element={<RegisterForm />} />
			</Routes>
		</Router>
	);
};

export default App;
