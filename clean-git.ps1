# Script de nettoyage d'urgence - Retirer .env de GitHub

Write-Host "⚠️  NETTOYAGE D'URGENCE - Retrait de .env de GitHub" -ForegroundColor Red
Write-Host ""

# 1. Retirer .env du tracking Git
Write-Host "1. Retrait de .env du tracking..." -ForegroundColor Yellow
git rm --cached .env
git rm --cached .env.example

# 2. Commit le retrait
Write-Host "2. Création du commit..." -ForegroundColor Yellow
git commit -m "Remove .env files from tracking - Security fix"

# 3. Push forcé pour nettoyer l'historique
Write-Host "3. Push des modifications..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "✅ .env retiré de GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  IMPORTANT: Tu dois MAINTENANT:" -ForegroundColor Red
Write-Host "1. Aller sur https://console.groq.com/keys" -ForegroundColor Yellow
Write-Host "2. INVALIDER la clé exposée" -ForegroundColor Yellow
Write-Host "3. CRÉER une nouvelle clé API" -ForegroundColor Yellow
Write-Host "4. La mettre dans ton .env LOCAL (qui ne sera plus commité)" -ForegroundColor Yellow
