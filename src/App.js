
import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './components/Home';
import { ScheduleTable } from './components/ScheduleTable';
import { DetailsGame } from './components/DetailsGame';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<ScheduleTable />} />
          <Route path="/games/:id" element={<DetailsGame />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
