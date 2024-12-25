import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { SpatialPosts } from './pages/mappa/SpatialPosts';
import { Clusters } from './pages/mappa/Clusters';
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
              <Route path="/spatial-posts" element={<SpatialPosts />} />
              <Route path="/clusters" element={<Clusters />} />
              <Route path="/photo-trends" element={<PhotoTrends />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
