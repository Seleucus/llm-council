"""Runtime settings store — mutable council config with disk persistence."""
import json
from pathlib import Path
from .config import COUNCIL_MODELS, CHAIRMAN_MODEL, DATA_DIR

SETTINGS_FILE = Path(DATA_DIR).parent / "settings.json"

_store = {
    "council_models": list(COUNCIL_MODELS),
    "chairman_model": CHAIRMAN_MODEL,
}

def _load_from_disk():
    if SETTINGS_FILE.exists():
        try:
            with open(SETTINGS_FILE) as f:
                _store.update(json.load(f))
        except Exception:
            pass

def get_council_models() -> list[str]:
    return _store["council_models"]

def get_chairman_model() -> str:
    return _store["chairman_model"]

def get_settings() -> dict:
    return dict(_store)

def update_settings(council_models: list[str], chairman_model: str):
    _store["council_models"] = council_models
    _store["chairman_model"] = chairman_model
    SETTINGS_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(SETTINGS_FILE, "w") as f:
        json.dump(_store, f, indent=2)

_load_from_disk()
