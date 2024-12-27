import { OnwerCard } from "@/components/top-owners/OwnerCard";
import top_owner_styles from './top-owners.module.css'
import styles from '../common.module.css';
import { useState, useEffect } from "react";
import type { Owner } from "@/lib/types";
import { getTop100Owners } from "@/components/api";
import { parseOwnersData } from "@/components/maps/clusters/utils";
export function TopOwners(){
  const [owners, setOwners] = useState<Owner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOwnersData = async () => {
      try {
        const data = await getTop100Owners();
        console.log(data)
        setOwners(parseOwnersData(data)); 
      } catch (error) {
        console.error('Errore nel recupero dei dati', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchOwnersData(); 
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
