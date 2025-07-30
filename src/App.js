import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginForm />} />
    </Routes>
    </Router>
  );
}

export default App;
