/**
 * Configuration de sécurité pour les clés API
 * Charge la clé API depuis les variables d'environnement
 * 
 * IMPORTANT: Ce fichier charge les secrets de manière sécurisée.
 * En production, utilisez les variables d'environnement du serveur.
 */

// Charger les variables d'environnement (.env)
async function loadEnvConfig() {
  const STORAGE_KEY = 'groq_api_key';
  let apiKey = localStorage.getItem(STORAGE_KEY) || '';

  try {
    const response = await fetch('.env');
    if (response.ok) {
      const envText = await response.text();
      envText.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value && !key.startsWith('#')) {
          const cleanValue = value.trim();
          window[key] = cleanValue;
          if (key === 'GROQ_API_KEY') {
            apiKey = cleanValue;
          }
        }
      });
      console.log('[Config] Variables .env chargees');
    }
  } catch (error) {
    console.warn('[Config] Impossible de charger .env - utilisation des valeurs par defaut');
  }

  if (!apiKey && window.GROQ_API_KEY) {
    apiKey = window.GROQ_API_KEY;
  }

  // Fallback manuel: l'utilisateur saisit la cle; stockee uniquement en localStorage
  if (!apiKey) {
    const manualKey = window.prompt('Entrez votre cle Groq (stockee en local, jamais envoyee au depot):');
    if (manualKey && manualKey.trim().length > 0) {
      apiKey = manualKey.trim();
      localStorage.setItem(STORAGE_KEY, apiKey);
    }
  }

  if (apiKey) {
    window.GROQ_API_KEY = apiKey;
    window.dispatchEvent(new Event('groq-key-loaded'));
    console.log('[Config] Cle API Groq disponible (stockee localement)');
  } else {
    console.warn('[Config] Aucune cle API disponible. Ajoutez GROQ_API_KEY dans .env ou via le prompt.');
  }
}

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', loadEnvConfig);

// Exporter pour utilisation directe
window.CONFIG = {
  loadEnvConfig
};
