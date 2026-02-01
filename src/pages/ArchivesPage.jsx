import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArchivedNotes } from '../utils/network-data';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { useLocale } from '../contexts/LocaleContext';

function ArchivesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialKeyword = searchParams.get('keyword') || '';
  const [keyword, setKeyword] = useState(initialKeyword);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      setLoading(true);
      const { error, data } = await getArchivedNotes();
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
    <div className="archives-page">
      <h2>{useLocale().locale === 'id' ? 'Arsip' : 'Archives'}</h2>
      <SearchBar keyword={keyword} onChange={onKeywordChange} />
      <NoteList notes={filtered} />
    </div>
  );
}

export default ArchivesPage;