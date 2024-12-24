import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  Map,
  ChartCandlestick,
  Satellite,
  Orbit,
  TrendingUp,
  Trophy,
  SearchCode,
  Camera
} from 'lucide-react';
import styles from './Sidebar.module.css';

const menuItems = [
  {
    name: 'Mappa',
    icon: Map,
    subMenu: [
      { name: 'SpatialPosts', icon: Satellite, path: '/spatial-posts' },
      { name: 'Clusters', icon: Orbit, path: '/clusters' },
    ],
  },
  {
    name: 'Analytics',
    icon: ChartCandlestick,
    subMenu: [{ name: 'Photo Trends', icon: TrendingUp, path: '/photo-trends' }],
  },
  {
    name: 'Foto',
    icon: Camera,
    subMenu: [
      { name: 'Top owners', icon: Trophy, path: '/top-owners' },
      { name: 'Ricerca per tag', icon: SearchCode, path: '/tag-based' },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {}
  );

  const handleMenuClick = (menuName: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName], // Toggles the clicked menu
    }));
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>Flickr Analytics</h2>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li key={item.name}>
              {/* Main Menu Button */}
              <div
                className={`${styles.menuItem} ${
                  expandedMenus[item.name] ? styles.menuItemActive : ''
                }`}
                onClick={() => handleMenuClick(item.name)}
              >
                <item.icon className={styles.menuIcon} />
                {item.name}
              </div>

              {/* Submenu */}
              {expandedMenus[item.name] && item.subMenu && (
                <ul className={styles.subMenu}>
                  {item.subMenu.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        to={subItem.path}
                        className={`${styles.menuItem} ${
                          location.pathname === subItem.path
                            ? styles.menuItemActive
                            : ''
                        }`}
                      >
                        <subItem.icon className={styles.menuIcon} />
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
