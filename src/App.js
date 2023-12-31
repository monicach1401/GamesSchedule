
import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './components/Home';
import { ScheduleTable } from './components/ScheduleTable';
import { DetailsGame } from './components/DetailsGame';
import {MessageScreen} from './components/MessageScreen';
import { PhotosScreen } from './components/PhotosScreen';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<ScheduleTable />} />
          <Route path="/games/:id" element={<DetailsGame />} />
          <Route path="/messages/:id" element={<MessageScreen />} />
          <Route path="/photos/:id" element={<PhotosScreen />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
