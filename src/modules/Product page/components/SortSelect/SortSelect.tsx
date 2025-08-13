import { useSearchParams } from 'react-router-dom';
import styles from './SortSelect.module.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const SortSelect: React.FC = () => {
  const { t } = useTranslation();

  const options = [
    { value: 'age', label: t('sortSelect.newest') },
    { value: 'price', label: t('sortSelect.price') },
    { value: 'title', label: t('sortSelect.alphabet') },
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  const initialSortValue = searchParams.get('sort') || 'title';
  const initialOption = options.find(option => option.value === initialSortValue);

  const [selectedOption, setSelectedOption] = React.useState(initialOption || options[2]); 
  const [isOpen, setIsOpen] = React.useState(false);
  
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSortChange = option => {
    setSelectedOption(option);
    const newParams = new URLSearchParams(searchParams);

    newParams.set('sort', option.value);
    setSearchParams(newParams);
    setIsOpen(false);
  };

  return (
    <div className={styles.SortSelect} ref={dropdownRef}>
      <div className={styles.SortSelect__label}>{t('sortSelect.sortBy')}</div>
      <div
        className={styles.SortSelect__selected}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption.label}
        <img
          src="./img/buttons/arrow-down.svg"
          alt="Arrow Down"
          className={`${styles.SortSelect__arrow} ${isOpen ? styles.SortSelect__arrow_open : ''}`}
        />
      </div>
      {
        <ul
          className={`${styles.SortSelect__options} ${isOpen ? styles.SortSelect__options_open : ''}`}
        >
          {options.map(option => (
            <li
              key={option.value}
              className={styles.SortSelect__option}
              onClick={() => {
                handleSortChange(option);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      }
    </div>
  );
};