import React, { useEffect } from 'react'; // Імпортуємо useEffect
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';
import classNames from 'classnames';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem('language');

    if (!savedLang) {
      i18n.changeLanguage('en');
      localStorage.setItem('language', 'en');
    } else {
      i18n.changeLanguage(savedLang);
    }
  }, []); 

  const currentLang = i18n.language;

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng); 
  };

  return (
    <div className={styles.langSwitcher}>
      <button
        onClick={() => changeLanguage('en')}
        className={classNames(styles.langBtn, {
          [styles.active]: currentLang === 'en',
        })}
      >
        EN
      </button>
      <span>/</span>
      <button
        onClick={() => changeLanguage('ua')}
        className={classNames(styles.langBtn, {
          [styles.active]: currentLang === 'ua',
        })}
      >
        UA
      </button>
    </div>
  );
};