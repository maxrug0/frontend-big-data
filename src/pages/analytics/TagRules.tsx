import { useState, useEffect } from 'react';
import { RuleCard } from '@/components/analytics/tag-rules/RuleCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import styles from '../common.module.css';
import analytics_styles from './analytics.module.css';
import type { AssociationRule } from '@/lib/types';
import { getAssociationRules } from '@/components/api/api';

export function TagRules(){
    const MOCK_DELAY = 1500;

    const MOCK_RULES: AssociationRule[] = [
    {
        antecedent: ["italy"],
        confidence: 0.8865615721389919,
        consequent: ["rome"],
        lift: 1.577599814338708,
        support: 0.40985051979741227
    },
    {
        antecedent: ["roma", "italy"],
        confidence: 0.8912340792844746,
        consequent: ["rome"],
        lift: 1.5859143484183038,
        support: 0.23412775473329853
    },
    {
        antecedent: ["roma"],
        confidence: 0.6693039986438092,
        consequent: ["rome"],
        lift: 1.190998907666493,
        support: 0.30477533341454854
    },
    {
        antecedent: ["rome"],
        confidence: 0.729312124795831,
        consequent: ["italy"],
        lift: 1.577599814338708,
        support: 0.40985051979741227
    },
    {
        antecedent: ["roma", "rome"],
        confidence: 0.7681978462963183,
        consequent: ["italy"],
        lift: 1.6617148385291656,
        support: 0.23412775473329853
    }
    ];

    const [rules, setRules] = useState<AssociationRule[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    /*
    useEffect(() => {
        const fetchTagData = async () => {
          try {
            const data = await getAssociationRules();
            setRules(rules); 
          } catch (error) {
            console.error('Errore nel recupero dei dati', error);
          } finally {
            setIsLoading(false);
          }
        };
        fetchTagData(); 
      }, []);
    */

    useEffect(() => {
        const loadRules = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
        setRules(MOCK_RULES);
        setIsLoading(false);
        };

        loadRules();
    }, []);


    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Regole di associazione</h1>
            </div>
            <hr></hr>
            <div>
                <div className={analytics_styles.explanation}>
                    <p>
                        Queste regole mostrano le relazioni tra i tag presenti nelle foto. Ad esempio, quando determinati tag compaiono insieme,
                        c'è un'elevata probabilità di trovare un altro tag specifico. Le metriche aiutano a comprendere la forza di queste relazioni:
                    </p>
                    <ul className={analytics_styles.metrics}>
                        <li>
                            <strong>Confidenza:</strong> la probabilità che i tag consequenziali compaiano quando i tag antecedenti sono presenti
                        </li>
                        <li>
                            <strong>Supporto:</strong> la frequenza con cui la combinazione appare nel dataset
                        </li>
                        <li>
                            <strong>Lift:</strong> quanto è più probabile che i tag compaiano insieme rispetto al caso
                        </li>
                    </ul>
                </div>
                
                {isLoading ? (
                    <div className={analytics_styles.loadingContainer}>
                        <LoadingSpinner />
                    </div>
                    ) : (
                    <div className={analytics_styles.grid}>
                        {rules.map((rule, index) => (
                            <RuleCard key={index} rule={rule} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
