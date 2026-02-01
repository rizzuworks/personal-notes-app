import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getActiveNotes } from '../utils/network-data';
import { IoAddOutline } from 'react-icons/io5';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { useLocale } from '../contexts/LocaleContext';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialKeyword = searchParams.get('keyword') || '';
  const [keyword, setKeyword] = useState(initialKeyword);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      setLoading(true);
      const { error, data } = await getActiveNotes();
      if (!error) {
        setNotes(data);
      }
      setLoading(false);
    }
    
    fetchNotes();
  }, []);

  useEffect(() => {
    setKeyword(initialKeyword);
  }, [initialKeyword]);

  const onKeywordChange = (val) => {
    setKeyword(val);
    const params = {};
    if (val.trim()) params.keyword = val;
    setSearchParams(params);
  };

  const filtered = !keyword.trim() ? notes : notes.filter((note) => (
    note.title.toLowerCase().includes(keyword.toLowerCase())
  ));

  return (
    <div className="homepage">
      <h2>{useLocale().locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h2>
      <SearchBar keyword={keyword} onChange={onKeywordChange} />
      <NoteList notes={filtered} />
      <div className="homepage__action">
        <Link to="/new" className="action" title={useLocale().locale === 'id' ? 'Tambah Catatan' : 'Add Note'}>
          <IoAddOutline />
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
