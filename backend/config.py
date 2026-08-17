"""Configuration for the LLM Council."""

import os
from dotenv import load_dotenv

load_dotenv()

# OpenRouter API key
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Council members - list of OpenRouter model identifiers
# Original Council -- Premium Members
# COUNCIL_MODELS = [
#    "openai/gpt-5.1",
#    "google/gemini-3-pro-preview",
#    "anthropic/claude-sonnet-4.5",
#    "x-ai/grok-4",
#]

# Council members – list of OpenRouter model identifiers
# Modified to be cheaper! Recommended by copilot
COUNCIL_MODELS = [
    "openai/gpt-4o-mini",
    "google/gemini-2.5-flash",
    "anthropic/claude-haiku-4.5",
    "deepseek/deepseek-chat",
]

# Chairman model – synthesizes final response
# Copilot recommended budget chairman.
CHAIRMAN_MODEL = "google/gemini-2.5-flash"


# Chairman model - synthesizes final response
# Original Chairman
# CHAIRMAN_MODEL = "google/gemini-3-pro-preview"

# OpenRouter API endpoint
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

# Data directory for conversation storage
DATA_DIR = "data/conversations"
