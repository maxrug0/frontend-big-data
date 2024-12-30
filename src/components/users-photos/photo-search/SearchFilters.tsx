import { useEffect, useState } from 'react';
import styles from './search-filters.module.css';
import { PhotoSearchFilters } from '@/lib/types';

interface SearchFiltersProps{
    availableTags: string[];
    availableYears: number[];
    onSearch: (filters: PhotoSearchFilters) => void;
}

export function SearchFilters({ availableTags, availableYears, onSearch }: SearchFiltersProps ){
    const[filters, setFilters] = useState<PhotoSearchFilters>({
        startYear: 2002,
        endYear: 2013,
        keyword: '',
        tags: []
    }); 

    useEffect(() => {
        if (availableYears.length > 0) {
            setFilters(prev => ({
                ...prev,
                startYear: Math.min(...availableYears),
                endYear: Math.max(...availableYears),
            }));
        }
    }, [availableYears]);

    console.log(filters.startYear)
    console.log(filters.endYear)

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
        e.preventDefault(); // impedire il comportamento predefinito (inviare i dati del modulo al server e ricaricare la pagina)
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
            <div className={styles.yearFilters}>
                <div className={styles.yearSelect}>
                    <select 
                        id="startYear"
                        value={filters.startYear}
                        onChange={e => {
                            const startYear = Number(e.target.value);
                            setFilters(prev => ({
                                ...prev,
                                startYear,
                                endYear: prev.endYear < startYear ? startYear : prev.endYear
                            }));
                        }}
                        >
                            {availableYears.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                </div>
                <div className={styles.yearSelect}>
                    <select 
                        id="endYear"
                        value={filters.endYear}
                        onChange={e => {
                            setFilters(prev => ({
                                ...prev,
                                endYear: Number(e.target.value)
                            }));
                        }}
                        >
                            {availableYears
                                .filter(year => year >= filters.startYear)
                                .map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))
                            }
                        </select>
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
