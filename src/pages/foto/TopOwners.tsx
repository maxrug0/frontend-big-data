import { OnwerCard } from "@/components/top-owners/OwnerCard";
import top_owner_styles from './top-owners.module.css'
import styles from '../common.module.css';
import { useState, useEffect } from "react";
import type { Owner } from "@/lib/types";


export function TopOwners(){
  const [owners, setOwners] = useState<Owner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      //const data = API
      const data: Owner[] = [
        {
          rank: 1,
          name: 'Alessandro Rossi',
          avatarUrl: 'https://images.unsplash.com/profile-1446404465118-3a53b909cc82',
          totalPhotos: 2453,
          bestPhoto: {
            url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
            views: 1234567,
            comments: 892
          }
        },
        {
          rank: 2,
          name: 'Marco Bianchi',
          avatarUrl: 'https://images.unsplash.com/profile-1441298803695-accd94000cac',
          totalPhotos: 1876,
          bestPhoto: {
            url: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140',
            views: 987654,
            comments: 654
          }
        },
        {
          rank: 3,
          name: 'Giulia Conti',
          avatarUrl: 'https://images.unsplash.com/profile-1502809342504-1b9b1a7a6cc1',
          totalPhotos: 1543,
          bestPhoto: {
            url: 'https://images.unsplash.com/photo-1525874684015-58379d421a52',
            views: 876543,
            comments: 543
          }
        },
        {
          rank: 4,
          name: 'Sofia Romano',
          avatarUrl: 'https://images.unsplash.com/profile-1617559495390-6d94d77d66f7',
          totalPhotos: 1234,
          bestPhoto: {
            url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
            views: 765432,
            comments: 432
          }
        },
        {
          rank: 5,
          name: 'Luca Ferrari',
          avatarUrl: 'https://images.unsplash.com/profile-1544707963613-16baf868f301',
          totalPhotos: 987,
          bestPhoto: {
            url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef',
            views: 654321,
            comments: 321
          }
        }
      ];
      setOwners(data);
      setIsLoading(false);
  }, []); 
  
  if (isLoading){
    return <div className={styles.loading}>Sto caricado i dati...</div>
  }
  return(
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top 5 fotografi: scopri gli autori di spicco su Flickr</h2>
      </div>
      <hr></hr>
      <div>
        <p className={styles.text}>
          Esplora i migliori contributori di foto geotaggate su Flickr! <br />
          Scopri chi sono i top 5 fotografi, ammira le loro foto più visualizzate, e ottieni informazioni sulle loro opere e luoghi rappresentati.
        </p>
      </div>
      <div className={top_owner_styles.grid}>
        {owners.map((owner) => (
          <OnwerCard owner={owner} />
        ))}
      </div>
    </div>
  );
}
