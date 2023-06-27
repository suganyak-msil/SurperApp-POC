import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WatchList from './screens/watchList';
import Searchscreen from './screens/searchscreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<WatchList />} />
        <Route path='/search' element={<Searchscreen />} />

      </Routes>

    </Router>
  );
}

export default App;
