import React from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';
import { useLocale } from '../contexts/LocaleContext';

function NoteList({ notes }) {
  const { locale } = useLocale();
  if (!notes.length) {
    return (
      <div className="notes-list-empty">
        <p>{locale === 'id' ? 'Tidak ada catatan' : 'No notes available'}</p>
      </div>
    );
  }
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem key={note.id} {...note} />
      ))}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
  })).isRequired,
};

export default NoteList;
