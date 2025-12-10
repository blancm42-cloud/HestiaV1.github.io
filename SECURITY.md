# 🔒 Guide de Sécurité - HestiaV1

## ⚠️ Important : Gestion des clés API

### Problème signalé
Ta clé API Groq était visible dans le code source, ce qui a permis à Groq de la détecter et de la désactiver.

### Solution implémentée

#### 1. **Fichiers protégés par `.gitignore`**
```
.env              # ❌ JAMAIS ne faire de commit
.env.local        # ❌ JAMAIS ne faire de commit
config.local.js   # ❌ JAMAIS ne faire de commit
```

#### 2. **Fichiers de configuration**
```
.env.example      # ✅ À commiter (template sans vraies clés)
config.js         # ✅ À commiter (charge les variables d'environnement)
```

#### 3. **Comment utiliser**

**En développement local :**
```bash
# 1. Copie le fichier template
cp .env.example .env

# 2. Ajoute ta vraie clé API
# Édite .env et remplace:
# GROQ_API_KEY=votre_cle_groq_ici

# 3. Le fichier .env est automatiquement ignoré par Git ✓
```

**En production sur GitHub Pages / Netlify :**
1. Configure les variables d'environnement dans les paramètres du serveur
2. Ne mets JAMAIS ta clé API dans le code source

#### 4. **Vérification avant commit**
```bash
# Vérifie que .env n'est pas dans Git
git status | grep ".env"  # Ne doit rien afficher

# Vérifie que ta clé n'est pas dans l'historique
git log -S "gsk_" --oneline
```

#### 5. **Si tu as accidentellement commité ta clé**
```bash
# Ajoute le fichier à .gitignore
echo ".env" >> .gitignore

# Retire la clé de l'historique Git
git rm --cached .env
git commit -m "Remove .env from tracking"

# ⚠️ IMPORTANT: Invalidate la clé ancienne sur Groq et en générer une nouvelle!
```

### 📋 Checklist avant le push sur GitHub

- [ ] `.env` n'est PAS créé en local (ou contient une clé bidon)
- [ ] `.env.example` EST commité avec le template
- [ ] `.gitignore` contient `.env` et autres fichiers sensibles
- [ ] `config.js` EST commité pour charger les variables
- [ ] Pas de clés API visibles dans `dashboard.html`
- [ ] Pas de secrets hardcodés nulle part dans le code

### 🔑 Gestion des clés API
- Toutes les clés doivent être stockées dans `.env` (jamais dans le code)
- En cas d'exposition : invalider immédiatement sur https://console.groq.com/keys
- Générer une nouvelle clé et la mettre uniquement dans `.env` local

---

**Questions ?** Consulte la documentation Groq : https://console.groq.com/keys
