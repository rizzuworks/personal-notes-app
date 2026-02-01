import React from 'react';
import PropTypes from 'prop-types';
import { useLocale } from '../contexts/LocaleContext';

function SearchBar({ keyword, onChange }) {
  const { locale } = useLocale();
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={locale === 'id' ? 'Cari judul catatan...' : 'Search note title...'}
        value={keyword}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
