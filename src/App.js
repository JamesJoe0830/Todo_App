import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

const Layout = () => {
  return (
    <div>

      <Outlet />

    </div>
  );
};

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}


export default App;
