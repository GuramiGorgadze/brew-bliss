import React, { useState, useRef, useEffect } from 'react';
import * as api from '../../api/api';
import { useTranslation } from 'react-i18next';
import BeerIcon from '../../assets/icons/beer.svg';

const DEFAULT_SUGGESTIONS = [
  'Recommend me a beer',
  'What beer pairs with pizza?',
  'Whats a good beer for beginners?',
];

function BeerSommelier() {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(DEFAULT_SUGGESTIONS);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

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

  const fetchSuggestions = async (updatedMessages) => {
    setLoadingSuggestions(true);
    try {
      const result = await api.getSommelierSuggestions(updatedMessages, lang);
      if (Array.isArray(result) && result.length > 0) {
        setSuggestions(result);
      } else {
        setSuggestions(DEFAULT_SUGGESTIONS);
      }
    } catch {
      setSuggestions(DEFAULT_SUGGESTIONS);
    } finally {
      setLoadingSuggestions(false);
      setTimeout(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  const send = async (text) => {
    if (!text.trim() || loading) return;

    const userMsg = { role: 'user', content: text };
    const nextMessages = [...messages, userMsg];

    setMessages(nextMessages);
    setInput('');
    setLoading(true);
    setSuggestions([]);

    try {
      const reply = await api.askSommelier(nextMessages, lang);
      const finalMessages = [...nextMessages, { role: 'assistant', content: reply }];
      setMessages(finalMessages);
      fetchSuggestions(finalMessages);
    } catch (err) {
      setMessages([
        ...nextMessages,
        { role: 'assistant', content: 'Something went wrong. Try again!' },
      ]);
      setSuggestions(DEFAULT_SUGGESTIONS);
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

          {suggestions.length > 0 && (
            <div
              className={`sommelier-suggestions${loadingSuggestions ? ' sommelier-suggestions--loading' : ''}`}
            >
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  className="sommelier-suggestion-chip"
                  onClick={() => send(s)}
                  disabled={loading}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

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
