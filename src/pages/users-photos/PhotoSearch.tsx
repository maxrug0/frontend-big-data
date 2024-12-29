import photo_search_styles from './photo-search.module.css';
import styles from '../common.module.css';
import { SearchFilters } from '@/components/users-photos/photo-search/SearchFilters';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useEffect, useState } from 'react';
import { PhotoSearched, PhotoSearchFilters } from '@/lib/types';
import { PhotoCard } from '@/components/users-photos/photo-search/PhotoCard';

export function PhotoSearch(){
    const MOCK_PHOTOS: PhotoSearched[] = [
        {
            url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
            username: 'Marco Bianchi',
            tags: ['rome', 'colosseum', 'sunset', 'architecture'],
            views: 12500,
        },
        {
            url: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140',
            username: 'Laura Romano',
            tags: ['rome', 'vatican', 'art', 'architecture'],
            views: 8300,
        },
        {
            url: 'https://images.unsplash.com/photo-1555992828-ca4dbe41d294',
            username: 'Giuseppe verdi',
            tags: ['rome', 'history', 'night', 'ruins'],
            views: 6700,
        }
    ];

    const AVAILABLE_TAGS = [
        'rome', 'italy', 'colosseum', 'vatican', 'architecture',
        'history', 'ancient', 'ruins', 'art', 'sculpture',
        'sunset', 'night', 'street', 'food', 'people'
    ];

    const[isLoading, setIsLoading]= useState<boolean>(false);
    const[photos, setPhotos]= useState<PhotoSearched[]>([]);
    const[availableTags, setAvailabelTags] = useState<string[]>([]);
    const searchPhotos = async (filters: PhotoSearchFilters) => {
        setIsLoading(true);
        try{
            await new Promise(resolve => setTimeout(resolve, 1500));
            setPhotos(MOCK_PHOTOS)
        } catch (error) {
            console.error('Errore nel recupero dei dati mensili per anno:', error);
        } finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const fetchTagsData = async () => {
            setIsLoading(true);
          try {
            //const tags = await getTags(); // Commento la chiamata API
            setAvailabelTags(AVAILABLE_TAGS)
          } catch (error) {
            console.error('Errore nel recupero dei dati annuali:', error);
          } finally {
            setIsLoading(false);
          }
        };
        fetchTagsData();
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
                        <div className={photo_search_styles.photoGrid}>
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
