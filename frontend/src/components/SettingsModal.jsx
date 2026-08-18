import { useState, useEffect } from 'react';
import { api } from '../api';
import './SettingsModal.css';

export default function SettingsModal({ onClose }) {
  const [councilModels, setCouncilModels] = useState([]);
  const [chairmanModel, setChairmanModel] = useState('');
  const [newModel, setNewModel]           = useState('');
  const [saving, setSaving]               = useState(false);
  const [error, setError]                 = useState('');

  useEffect(() => {
    api.getSettings().then((s) => {
      setCouncilModels(s.council_models);
      setChairmanModel(s.chairman_model);
    });
  }, []);

  const addModel = () => {
    const t = newModel.trim();
    if (!t || councilModels.includes(t)) return;
    setCouncilModels([...councilModels, t]);
    setNewModel('');
  };

  const removeModel = (m) => {
    const updated = councilModels.filter((x) => x !== m);
    setCouncilModels(updated);
    if (chairmanModel === m && updated.length > 0) setChairmanModel(updated[0]);
  };

  const save = async () => {
    if (councilModels.length === 0) {
      setError('At least one council member required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await api.updateSettings(councilModels, chairmanModel);
      onClose();
    } catch {
      setError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Council Settings</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <section>
            <h3>Council Members</h3>
            <p className="hint">OpenRouter model IDs e.g. <code>openai/gpt-4o-mini</code></p>
            <ul className="model-list">
              {councilModels.map((m) => (
                <li key={m} className="model-item">
                  <span className="model-name">{m}</span>
                  <button className="remove-btn" onClick={() => removeModel(m)}
                          disabled={councilModels.length === 1}>✕</button>
                </li>
              ))}
            </ul>
            <div className="add-model-row">
              <input type="text" placeholder="provider/model-name" value={newModel}
                     onChange={(e) => setNewModel(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && addModel()} />
              <button className="add-btn" onClick={addModel}>Add</button>
            </div>
          </section>
          <section>
            <h3>Chairman Model</h3>
            <p className="hint">Synthesizes the final response from all council answers.</p>
            <select value={chairmanModel} onChange={(e) => setChairmanModel(e.target.value)}>
              {councilModels.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </section>
          {error && <p className="error-msg">{error}</p>}
        </div>
        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
