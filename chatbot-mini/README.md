# 🤖 Chatbot HestIA - Mini Projet

Interface de chatbot moderne respectant la direction artistique du projet HestIA.

## 🎨 Caractéristiques

- **Direction artistique cohérente** : Glass-morphism, gradients, animations identiques au projet principal
- **Animation machine à écrire** : "Comment puis-je vous aider" avec curseur clignotant
- **Chat interactif** : Messages utilisateur (droite) et bot (gauche)
- **Responsive** : S'adapte aux différentes tailles d'écran
- **Animations fluides** : Entrée des messages, hover effects
- **Background animé** : Blobs et formes géométriques flottantes

## 🚀 Utilisation

Ouvrez simplement `index.html` dans votre navigateur.

## 📁 Structure

```
chatbot-mini/
├── index.html     # Structure HTML
├── style.css      # Styles (DA HestIA)
├── script.js      # Logique du chatbot
├── logo.png       # Logo placeholder (remplacez par votre logo)
└── README.md      # Documentation
```

## 💬 Fonctionnalités

- **Envoi de messages** : Cliquez sur le bouton ou appuyez sur Enter
- **Retour à la ligne** : Shift + Enter dans le textarea
- **Auto-resize** : Le champ de saisie s'adapte au contenu
- **Réponses automatiques** : Le bot répond avec des messages aléatoires
- **Scroll automatique** : Descend automatiquement aux nouveaux messages

## 🎯 Personnalisation

### Changer le texte animé
Modifiez la variable `textToType` dans `script.js` :
```javascript
const textToType = 'Votre nouveau texte';
```

### Ajouter des réponses bot
Modifiez le tableau `botResponses` dans `script.js` :
```javascript
const botResponses = [
  "Votre réponse 1",
  "Votre réponse 2"
];
```

### Remplacer le logo
Remplacez `logo.png` par votre propre logo (40x40px recommandé).

## 🔧 Technologies

- HTML5
- CSS3 (animations, backdrop-filter, gradients)
- JavaScript vanilla (typing animation, DOM manipulation)

## 📝 Notes

- Le bouton microphone affiche une alerte (à implémenter avec Web Speech API)
- Les messages ne sont pas persistants (rechargez = reset)
- Design optimisé pour desktop et mobile
