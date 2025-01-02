import { OnwerCard } from "@/components/users-photos/top-owners/OwnerCard";
import top_owner_styles from './top-owners.module.css';
import styles from '../common.module.css';
import { useState, useEffect } from "react";
import type { FirstPost, OwnerSearched, PopularOwner } from "@/lib/types";
import { getFirstPostPerYear, getPopularOwners } from "@/components/api/api";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { UsersChart } from "@/components/charts/UsersChart";
import { OwnerSearchFilters } from "@/components/users-photos/top-owners/OwnerSearchFilters";
import photo_search_styles from "@/components/users-photos/photo-search/search-filters.module.css";
import { DoughnutChart } from "@/components/charts/DoughnutChart";
import { mockOwners } from "./mock_data";
import { BubbleChart } from "@/components/charts/BubbleChart";

export function TopOwners() {
  const [owners, setOwners] = useState<PopularOwner[]>([]);
  const [searchedOwners, setSearchedOwners] = useState<OwnerSearched[]>([]);
  const [firstPosts, setFirstPosts] = useState<FirstPost[]>([]);
  const [isSearching, setIsSearching] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [searchClicked, setIsSearchClicked] = useState(false);

  const searchOwner = async () => {
    setIsSearching(false);
    setIsSearchClicked(true);
    try {
      //const data = await getOwners();
      const data = mockOwners;
      setSearchedOwners(data);
    } catch (error) {
      console.error("Errore nel recupero dei dati", error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const dataPO = await getPopularOwners();
        const dataFPY = await getFirstPostPerYear();
        console.log('Owners ricevuti: ',dataPO)
        setOwners(dataPO);
        setFirstPosts(dataFPY);
      } catch (error) {
        console.error("Errore nel recupero dei dati", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Analisi degli utenti</h2>
      </div>
      <hr />
      <div className={styles.explanation}>
        <h1 className={styles.subtitle}>Gli utenti più popolari</h1>
        <p>
          Scopri i 50 utenti più popolari di Flickr attraverso un'analisi dettagliata dei loro contenuti.
          <br />
          Nel grafico a bolle, l'asse delle ordinate rappresenta il numero di commenti ricevuti, l'asse delle ascisse indica il numero di like, mentre la dimensione di ciascuna bolla corrisponde al totale delle visualizzazioni dei loro contenuti.
        </p>
      </div>
      <div className={top_owner_styles.chartContainer}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <UsersChart owners={owners} />
        )}
      </div>
      <hr />
      <div className={styles.explanation}>
        <h1 className={styles.subtitle}>Distribuzione temporale delle prime foto pubblicate</h1>
        <p>
          In questa sezione viene utilizzato un grafico a bolle per analizzare la distribuzione temporale delle prime foto pubblicate dagli utenti. <br/>
          La dimensione delle bolle riflette il numero di utenti che hanno pubblicato la loro prima foto in un determinato mese e anno, offrendo una visione chiara e intuitiva delle tendenze temporali e stagionali.
        </p>
      </div>
      <div className={top_owner_styles.chartContainer}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <BubbleChart data={firstPosts}/>
        )}
      </div>
      <hr />
      <div className={styles.explanation}>
        <h1 className={styles.subtitle}>Qualche informazione sugli utenti</h1>
        <p>
          Scopri i 50 utenti più popolari di Flickr attraverso un'analisi dettagliata dei loro contenuti.
          <br />
          Nel grafico a bolle, l'asse delle ordinate rappresenta il numero di commenti ricevuti, l'asse delle ascisse indica il numero di like, mentre la dimensione di ciascuna bolla corrisponde al totale delle visualizzazioni dei loro contenuti.
        </p>
        <div className={top_owner_styles.chartsGrid}>
          <div className={top_owner_styles.doughnutContainer}>
            {false ? (
              <LoadingSpinner />
            ) : (
              <DoughnutChart
                labels={['Pro', 'NonPro']}
                values={[20, 40]}
                title="Pro vs Non pro"
              />
            )}
          </div>
          <div className={top_owner_styles.doughnutContainer}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <DoughnutChart
                labels={['Iphone', 'Canon', 'Mammita']}
                values={[20, 40, 60]}
                title="Fotocamere utilizzate"
              />
            )}
          </div>
        </div>
        <div className={styles.explanation}>
          <h1 className={styles.subtitle}>Ricerca Utente</h1>
          <p>
            Vuoi saperne di più su un fotografo specifico? Cerca il suo nome e ottieni immediatamente le informazioni sulla sua foto più visualizzata. Scopri cosa rende speciale il loro contenuto e lasciati ispirare dai loro risultati.
          </p>
        </div>
        <div>
          <OwnerSearchFilters onSearch={searchOwner} />
        </div>
        <div className={photo_search_styles.results}>
          {searchClicked ? (
            isSearching ? (
              <div className={photo_search_styles.loading}>
                <LoadingSpinner />
              </div>
            ) : searchedOwners.length ? (
              <div className={top_owner_styles.grid}>
                {searchedOwners.map((owner) => (
                  <OnwerCard owner={owner} />
                ))}
              </div>
            ) : (
              <div className={photo_search_styles.noResults}>
                Non è stata trovata nessuna foto che soddisfi i filtri!
              </div>
            )
          ) : (
            <div className={photo_search_styles.noResults}>
              Ottieni le informazioni sull'utente che ti interessa!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
