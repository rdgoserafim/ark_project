import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Infrastruture/ui/components';
import Home from './Infrastruture/ui/pages/Home';
import { DeveloperList } from './Infrastruture/ui/pages/developers';
import { LevelList } from './Infrastruture/ui/pages/levels';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="developers" element={<DeveloperList />} />
          <Route path="levels" element={<LevelList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
