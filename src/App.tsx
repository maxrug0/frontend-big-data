import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { MapPage } from './pages/Map';
import { Analytics } from './pages/Analytics';
import styles from './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.main}>
          <div className={styles.content}>
            <Routes>
              <Route path="/" element={<MapPage />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
