import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import CrudScreen from './components/CrudScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/documents" element={<CrudScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;