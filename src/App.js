import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import UserDetailsPage from './pages/UserDetailsPage';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/user/:username" element={<UserDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
