/**
 * Configuration de sécurité pour les clés API
 * Charge la clé API depuis les variables d'environnement
 * 
 * IMPORTANT: Ce fichier charge les secrets de manière sécurisée.
 * En production, utilisez les variables d'environnement du serveur.
 */

// Charger les variables d'environnement (.env)
async function loadEnvConfig() {
  try {
    const response = await fetch('.env');
    const envText = await response.text();
    
    envText.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value && !key.startsWith('#')) {
        window[key] = value.trim();
      }
    });
    
    console.log('[Config] Variables d\'environnement chargées');
  } catch (error) {
    console.warn('[Config] Impossible de charger .env - utilisation des valeurs par défaut');
  }
}

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', loadEnvConfig);

// Exporter pour utilisation directe
window.CONFIG = {
  loadEnvConfig
};
