import React, { useState, useRef, useEffect } from 'react';
import * as api from '../../api/api';
import { useTranslation } from 'react-i18next';
import BeerIcon from '../../assets/icons/beer.svg';

function BeerSommelier() {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const endRef = useRef(null);
  const panelRef = useRef(null);
  const fabRef = useRef(null);

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 250);
  };

  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') close();
    };

    const handleClickOutside = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        fabRef.current &&
        !fabRef.current.contains(e.target)
      ) {
        close();
      }
    };

    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text) => {
    if (!text.trim() || loading) return;

    const userMsg = { role: 'user', content: text };
    const nextMessages = [...messages, userMsg];

    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const reply = await api.askSommelier(nextMessages, lang);
      setMessages([...nextMessages, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages([
        ...nextMessages,
        { role: 'assistant', content: 'Something went wrong. Try again!' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        ref={fabRef}
        className="sommelier-fab"
        onClick={() => (open ? close() : setOpen(true))}
        aria-label={t('sommelier.ariaFab')}
      >
        <img
          src={BeerIcon}
          alt=""
        />
      </button>

      {open && (
        <div
          className={`sommelier-panel${closing ? ' sommelier-panel--closing' : ''}`}
          ref={panelRef}
        >
          <div className="sommelier-header">
            <span>{t('sommelier.title')}</span>
            <button
              onClick={close}
              aria-label={t('sommelier.ariaClose')}
            >
              ✕
            </button>
          </div>

          <div className="sommelier-messages">
            {messages.length === 0 && (
              <p className="sommelier-empty">{t('sommelier.emptyState')}</p>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`sommelier-msg sommelier-msg--${m.role}`}
              >
                {m.content}
              </div>
            ))}

            {loading && (
              <div className="sommelier-msg sommelier-msg--assistant sommelier-typing">
                <span />
                <span />
                <span />
              </div>
            )}

            <div ref={endRef} />
          </div>

          <div className="sommelier-input-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') send(input);
              }}
              placeholder={t('sommelier.placeholder')}
              disabled={loading}
            />
            <button
              onClick={() => send(input)}
              disabled={loading}
            >
              {t('sommelier.send')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default BeerSommelier;
