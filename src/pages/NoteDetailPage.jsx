import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { showFormattedDate } from '../utils';
import { IoArrowDownOutline, IoArrowUpOutline, IoTrashOutline } from 'react-icons/io5';
import { useLocale } from '../contexts/LocaleContext';

function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchNote() {
      setLoading(true);
      const { error: err, data } = await getNote(id);
      if (!mounted) return;
      if (err || !data) {
        setError(true);
      } else {
        setNote(data);
      }
      setLoading(false);
    }
    fetchNote();
    return () => { mounted = false; };
  }, [id]);

  const { locale } = useLocale();

  const onDelete = async () => {
    if (!note) return;
    const confirmed = window.confirm(locale === 'id' ? 'Yakin ingin menghapus catatan ini?' : 'Are you sure you want to delete this note?');
    if (!confirmed) return;
    const { error: err } = await deleteNote(note.id);
    if (!err) navigate('/');
    else alert(locale === 'id' ? 'Gagal menghapus catatan. Coba lagi.' : 'Failed to delete note. Try again.');
  };

  const onArchiveToggle = async () => {
    if (!note) return;
    const fn = note.archived ? unarchiveNote : archiveNote;
    const { error: err } = await fn(note.id);
    if (!err) navigate('/');
    else alert(locale === 'id' ? 'Gagal mengubah status arsip. Coba lagi.' : 'Failed to change archive status. Try again.');
  };

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>{locale === 'id' ? 'Memuat...' : 'Loading...'}</div>;
  if (error || !note) return <p>{locale === 'id' ? 'Catatan tidak ditemukan.' : 'Note not found.'}</p>;

  return (
    <div className="detail-page">
      <h2 className="detail-page__title">{note.title}</h2>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <div className="detail-page__body" dangerouslySetInnerHTML={{ __html: note.body }} />
      <div className="detail-page__action">
        <button
          type="button"
          className="action"
          title={note.archived ? (locale === 'id' ? 'Kembalikan' : 'Unarchive') : (locale === 'id' ? 'Arsipkan' : 'Archive')}
          onClick={onArchiveToggle}
        >
            {note.archived ? <IoArrowUpOutline /> : <IoArrowDownOutline />}
        </button>
          <button type="button" className="action" title={locale === 'id' ? 'Hapus' : 'Delete'} onClick={onDelete}>
          <IoTrashOutline />
        </button>
      </div>
    </div>
  );
}

export default NoteDetailPage;