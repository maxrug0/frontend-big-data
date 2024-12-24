import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { MapPage } from './pages/Map';
import { PhotoTrends } from './pages/PhotoTrends';
import styles from './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.main}>
          <div className={styles.content}>
            <Routes>
              <Route path="/spatial-posts" element={<MapPage />} />
              <Route path="/photo-trends" element={<PhotoTrends />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
