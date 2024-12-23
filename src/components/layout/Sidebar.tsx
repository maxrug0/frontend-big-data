import { Link, useLocation } from 'react-router-dom';
import { Map, LineChart } from 'lucide-react';
import styles from './Sidebar.module.css';

const menuItems = [
  { name: 'Mappa', icon: Map, path: '/' },
  { name: 'Analytics', icon: LineChart, path: '/analytics' },
];

export function Sidebar() {
  const location = useLocation();
  
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>Flickr Analytics</h2>
      </div>
      
      <nav className={styles.nav}>
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`${styles.menuItem} ${
                  location.pathname === item.path ? styles.menuItemActive : ''
                }`}
              >
                <item.icon className={styles.menuIcon} />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
