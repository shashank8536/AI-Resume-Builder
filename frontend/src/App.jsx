import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Builder from './pages/Builder';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="builder" element={<Builder />} />
      </Route>
    </Routes>
  );
}

export default App;
