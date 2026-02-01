import React, { useState } from 'react';
import { addNote } from '../utils/network-data';
import { useNavigate } from 'react-router-dom';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { useLocale } from '../contexts/LocaleContext';

function AddNotePage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { locale } = useLocale();

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onBodyChange = (event) => {
    setBody(event.currentTarget.textContent);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!body.trim() && !title.trim()) return;
    
    setLoading(true);
    const { error } = await addNote({ title: title.trim(), body: body.trim() });
    if (!error) {
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="add-new-page">
      <form onSubmit={onSubmit}>
        <div className="add-new-page__input">
          <input
            type="text"
            className="add-new-page__input__title"
            placeholder={locale === 'id' ? 'Judul catatan' : 'Note title'}
            value={title}
            onChange={onTitleChange}
          />
          <div
            className="add-new-page__input__body"
            contentEditable
            data-placeholder={locale === 'id' ? 'Tulis catatanmu di sini...' : 'Write your note here...'}
            onInput={onBodyChange}
            suppressContentEditableWarning
          >
          </div>
        </div>
        <div className="add-new-page__action">
          <button type="submit" className="action" title={locale === 'id' ? 'Simpan' : 'Save'} disabled={loading}>
            {loading ? (locale === 'id' ? 'Memuat...' : 'Loading...') : <IoCheckmarkOutline />}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNotePage;