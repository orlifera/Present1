
import './App.css'
import { useEffect, useState } from 'react'
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MobileNav from './components/MobileNav';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import WishPage from './components/WishPage';

function App() {

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  return (
    <Router>
      <Header />
      {width > 768 ? <Navbar /> : <MobileNav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/wish" element={<WishPage />} />
      </Routes>
    </Router>
  );
}

export default App;
