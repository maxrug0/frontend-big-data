import { useState } from 'react';
import styles from './search-filters.module.css';
import { PhotoSearchFilters } from '@/lib/types';

interface SearchFiltersProps{
    availableTags: string[];
    onSearch: (filters: PhotoSearchFilters) => void;
}

export function SearchFilters({ availableTags, onSearch }: SearchFiltersProps ){
    const[filters, setFilters] = useState<PhotoSearchFilters>({
        startYear: 2001,
        endYear: 2013,
        keyword: '',
        tags: []
    }); 

    const handleTagSelect = (tag: string) => {
        setFilters(prev => ({
            ...prev,
            tags: [...prev.tags, tag]
        }));
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFilters(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag != tagToRemove)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault; // impedire il comportamento predefinito (inviare i dati del modulo al server e ricaricare la pagina)
        onSearch(filters);
    };

    const availableTagsFiltered = availableTags.filter(
        tag => !filters.tags.includes(tag)
    );
    
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.textFilters}>
                <div className={styles.input}>
                    <label htmlFor='keyword'>Keyword</label>
                    <input 
                        type='text' 
                        id='keyword' 
                        placeholder='Cerca per keyword...' 
                        value={filters.keyword}
                        onChange={e => setFilters(prev => ({
                            ...prev,
                            keyword: e.target.value
                        }))}
                    />
                </div>
            </div>
            <div className={styles.tagSection}>
                <div className={styles.tagSelect}>
                    <label htmlFor='tags'>Tags</label>
                    <select
                        id='tags'
                        onChange={e => {
                            if (e.target.value) {
                                handleTagSelect(e.target.value);
                                e.target.value = '';
                            }
                        }}
                    >
                        <option value="">Seleziona i tags...</option>
                        {availableTagsFiltered.map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.selectedTags}>
                    {filters.tags.map(tag => (
                        <span key={tag} className={styles.tag}>
                            {tag}
                            <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                                className={styles.removeTag}
                            >
                            ×
                            </button>
                    </span>
                    ))}
                </div>
            </div>
            <button
                type="submit"
                className={styles.searchButton}
                disabled={filters.tags.length === 0}
            >
                Cerca
            </button>
        </form>
    );
}
