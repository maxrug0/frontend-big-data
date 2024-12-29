import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import styles from './App.module.css';

import { SpatialPosts } from './pages/maps/SpatialPosts';
import { Clusters } from './pages/maps/Clusters';

import { PhotoTrends } from './pages/analytics/PhotoTrends';
import { TagRules } from './pages/analytics/TagRules';
import { PhotoSearch } from './pages/users-photos/PhotoSearch';

import { TopOwners } from './pages/users-photos/TopOwners';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.main}>
          <div className={styles.content}>
            <Routes>
              <Route path="/" element={<SpatialPosts />} />
              <Route path="/clusters" element={<Clusters />} />
              <Route path="/photo-trends" element={<PhotoTrends />} />
              <Route path="/top-owners" element={<TopOwners />} />
              <Route path="/tag-rules" element={<TagRules />} />
              <Route path="/photo-search" element={<PhotoSearch />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
