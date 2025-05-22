
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import PostJob from './PostJob';
import Home from './Home';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home/> } />
        <Route path="/post-job" element={<PostJob />} />
      </Routes>
    </>
  );
}

export default App;
