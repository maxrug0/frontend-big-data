import { useState } from 'react';
import styles from './search-filters.module.css';
import { PhotoSearchFilters } from '@/lib/types';

interface SearchFiltersProps{
    availableTags: string[];
    onSearch: (filters: PhotoSearchFilters) => void;
}

export function SearchFilters({ availableTags, onSearch }: SearchFiltersProps ){
    const MIN_DATE = '2000-01-01';
    const MAX_DATE = '2017-12-31';

    const [filters, setFilters] = useState<PhotoSearchFilters>({
        startDate: MIN_DATE, // Formato: YYYY-MM-DD
        endDate: MAX_DATE,
        keyword: '',
        tags: [],
    });

    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(filters);
      };

    const availableTagsFiltered = availableTags.filter(
        tag => !filters.tags.includes(tag)
    );

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
            {/* Date Pickers */}
            <div className={styles.dateFilters}>
                <div className={styles.datePicker}>
                    <label htmlFor="startDate">Data Inizio</label>
                    <input
                        type="date"
                        id="startDate"
                        value={filters.startDate}
                        min={MIN_DATE}
                        max={MAX_DATE}
                        onChange={e =>
                            setFilters(prev => ({
                                ...prev,
                                startDate: e.target.value,
                                endDate: prev.endDate && prev.endDate < e.target.value ? '' : prev.endDate, // Resetta dataFine se è precedente
                            }))
                        }
                    />
                </div>
                <div className={styles.datePicker}>
                    <label htmlFor="endDate">Data Fine</label>
                    <input
                        type="date"
                        id="endDate"
                        value={filters.endDate}
                        min={filters.startDate || MIN_DATE} // Imposta il minimo a dataInizio o il limite inferiore
                        max={MAX_DATE} // Limita il massimo a MAX_DATE
                        onChange={e =>
                            setFilters(prev => ({
                                ...prev,
                                endDate: e.target.value,
                            }))
                        }
                    />
                </div>
            </div>
            <button
                type="submit"
                className={styles.searchButton}
                disabled={filters.tags.length === 0 && filters.keyword.trim() === ''}
            >
                Cerca
            </button>
        </form>
    );
}
