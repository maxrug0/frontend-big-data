import photo_search_styles from './photo-search.module.css';
import styles from '../common.module.css';
import { SearchFilters } from '@/components/users-photos/photo-search/SearchFilters';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useEffect, useState } from 'react';
import { PhotoSearched, PhotoSearchFilters, TagsResponse } from '@/lib/types';
import { PhotoCard } from '@/components/users-photos/photo-search/PhotoCard';
import { getPhotos, topTags } from '@/components/api/api';

export function PhotoSearch(){
    const[isLoading, setIsLoading]= useState<boolean>(false);
    const[photos, setPhotos]= useState<PhotoSearched[]>([]);
    const[availableTags, setAvailableTags] = useState<string[]>([]);

    const searchPhotos = async (filters: PhotoSearchFilters) => {
        setIsLoading(true);
        try{
            const photosData: PhotoSearched[] = await getPhotos(filters.keyword, filters.startDate, filters.endDate, filters.tags);
            setPhotos(photosData)
        } catch (error) {
            console.error('Errore nel recupero delle foto.', error);
        } finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
          try {
            const tags: TagsResponse[] = await topTags(50); // Commento la chiamata API
            const mappedTags: string[] = tags.map(tag => tag.tagValue);
            setAvailableTags(mappedTags)
          } catch (error) {
            console.error('Errore nel recupero dei tags:', error);
          } finally {
            setIsLoading(false);
          }
        };
        fetchData();
      }, []);
    

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Ricerca delle foto</h1>
            </div>
            <hr></hr>
            <div>
                <SearchFilters availableTags={availableTags} onSearch={searchPhotos}/>
            </div>

            <div className={photo_search_styles.results}>
                {isLoading ? (
                        <div className={photo_search_styles.loading}>
                            <LoadingSpinner />
                        </div>
                    ) : photos.length > 0 ? (
                        <div className={photo_search_styles.grid}>
                            {photos.map(photo => (
                                <div className={photo_search_styles.cardWrapper}>
                                    <PhotoCard photo={photo}/>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={photo_search_styles.noResults}>
                            Non è stata trovata nessuna foto che soddifsi i filtri!
                        </div>
                    )
                }
            </div>
        </div>
    );
}
