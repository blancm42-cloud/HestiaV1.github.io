// Données de test pour les témoignages - À copier dans localStorage via la console du navigateur
// Pour charger ces données, ouvrez la console (F12) et exécutez : loadTestData()

function loadTestData() {
  const testStories = [
    {
      id: 1701432000000,
      title: "Ma reconstruction après la découverte",
      text: "Il y a six mois, j'ai découvert que mon visage avait été utilisé dans des deepfakes intimes partagés sur plusieurs forums. Le choc a été immense. Au début, je ne savais pas vers qui me tourner, j'avais honte alors que je n'avais rien fait. Grâce au soutien psychologique et à l'aide juridique, j'ai pu faire retirer ces contenus et porter plainte. Aujourd'hui, je me reconstruis petit à petit. Ce n'est pas facile tous les jours, mais je reprends le contrôle de ma vie.",
      author: "Anonyme",
      voices: [],
      likes: 47,
      comments: [
        {
          text: "Merci infiniment pour ce témoignage. Votre courage inspire et aide d'autres personnes dans la même situation. Vous n'êtes pas seule. 💜",
          voices: []
        },
        {
          text: "Bravo pour votre force. Votre parcours montre qu'il est possible de se reconstruire. Continuez, vous êtes sur le bon chemin.",
          voices: []
        },
        {
          text: "Votre histoire m'a beaucoup touchée. Je suis passée par là aussi. Le temps et l'accompagnement font vraiment la différence. Tenez bon. 🌸",
          voices: []
        }
      ]
    },
    {
      id: 1701345600000,
      title: "Briser le silence",
      text: "Pendant des mois, j'ai gardé le silence par peur du jugement. Des deepfakes de moi circulaient dans mon entourage professionnel. J'avais peur de perdre mon emploi, ma réputation. Un jour, j'ai décidé de parler à une amie de confiance. Elle m'a aidée à contacter une association. Aujourd'hui, je réalise que le silence protège les agresseurs, pas les victimes. Parler a été la première étape de ma libération.",
      author: "Anonyme",
      voices: [],
      likes: 62,
      comments: [
        {
          text: "Votre courage de briser le silence est admirable. Vous avez fait le pas le plus difficile. Beaucoup de soutien pour la suite de votre parcours.",
          voices: []
        },
        {
          text: "Merci de partager cela. Vous donnez de la force à celles et ceux qui hésitent encore à parler. Vous êtes incroyablement courageuse.",
          voices: []
        },
        {
          text: "Le silence isole, la parole libère. Votre témoignage le prouve. Bravo d'avoir franchi ce cap. 💪",
          voices: []
        },
        {
          text: "Je suis dans une situation similaire et votre message me donne espoir. Merci de votre partage.",
          voices: []
        }
      ]
    },
    {
      id: 1701259200000,
      title: "L'importance de l'accompagnement",
      text: "Quand j'ai découvert ces images, j'étais anéantie. Je ne dormais plus, je n'arrivais plus à me concentrer au travail. C'est mon médecin qui m'a orientée vers un psychologue spécialisé. Les séances m'ont permis de comprendre que je n'étais pas responsable, que la honte devait changer de camp. L'accompagnement juridique m'a aussi aidée à agir concrètement. Aujourd'hui, je vais mieux. Le chemin est long mais je ne suis plus seule.",
      author: "Anonyme",
      voices: [],
      likes: 38,
      comments: [
        {
          text: "L'accompagnement professionnel est essentiel. Merci de le rappeler. Votre témoignage peut sauver d'autres personnes. 🙏",
          voices: []
        },
        {
          text: "Vous avez pris les bonnes décisions. Bravo pour votre parcours et merci de partager votre expérience.",
          voices: []
        },
        {
          text: "Ces mots résonnent fort. Je suis contente que vous ayez trouvé de l'aide. Continuez à avancer, vous êtes sur la bonne voie.",
          voices: []
        }
      ]
    },
    {
      id: 1701172800000,
      title: "Ma vie d'avant et d'après",
      text: "Il y a un avant et un après dans ma vie. Avant, j'étais insouciante, je partageais ma vie sur les réseaux sociaux sans me méfier. Après la découverte des deepfakes, tout a changé. J'ai dû effacer mes comptes, changer mes habitudes, expliquer la situation à mes proches. La colère et la tristesse ont laissé place à la détermination. Je me bats aujourd'hui pour que d'autres n'aient pas à vivre cela. Mon histoire ne me définit pas, mais elle m'a rendue plus forte.",
      author: "Anonyme",
      voices: [],
      likes: 55,
      comments: [
        {
          text: "Votre force est impressionnante. Transformer la douleur en action est admirable. Tout mon soutien. ❤️",
          voices: []
        },
        {
          text: "Merci pour ce témoignage puissant. Votre résilience est une inspiration pour beaucoup. Continuez ce combat.",
          voices: []
        },
        {
          text: "Vous êtes courageuse. Votre histoire montre qu'on peut survivre et même prospérer après un tel traumatisme.",
          voices: []
        },
        {
          text: "Je vous admire. Votre détermination donne de l'espoir. Merci de partager votre parcours avec nous.",
          voices: []
        }
      ]
    },
    {
      id: 1701086400000,
      title: "Le soutien de mes proches",
      text: "Sans ma famille et mes vrais amis, je ne sais pas comment j'aurais traversé cette épreuve. Quand j'ai découvert les deepfakes, j'ai eu peur de leur réaction. Mais leur soutien a été immédiat et inconditionnel. Ils m'ont accompagnée dans toutes les démarches, m'ont écoutée pleurer, m'ont rappelé qui j'étais vraiment. Leur présence m'a permis de ne pas sombrer. Aujourd'hui, je sais que l'entourage peut faire toute la différence.",
      author: "Anonyme",
      voices: [],
      likes: 71,
      comments: [
        {
          text: "L'importance des proches est immense dans ces moments. Vous avez de la chance de les avoir, et ils ont de la chance de vous avoir. 💕",
          voices: []
        },
        {
          text: "Votre témoignage rappelle qu'on n'est pas seule. Le soutien est crucial. Merci de le partager.",
          voices: []
        },
        {
          text: "C'est beau de voir comment l'amour et le soutien peuvent aider à surmonter l'épreuve. Courage pour la suite.",
          voices: []
        },
        {
          text: "Merci de rappeler qu'il ne faut pas hésiter à s'appuyer sur ses proches. Leur soutien est précieux.",
          voices: []
        },
        {
          text: "Votre entourage a été à la hauteur. C'est réconfortant de lire cela. Beaucoup de force pour votre chemin. 🌟",
          voices: []
        }
      ]
    },
    {
      id: 1701000000000,
      title: "De la honte à la fierté",
      text: "Au début, j'avais honte. Je me sentais salie, diminuée. Je me cachais, j'évitais les regards. Puis j'ai réalisé que la honte devait changer de camp. Ce n'est pas moi qui ai créé ces images, ce n'est pas moi la criminelle. J'ai décidé de porter plainte, de me battre. Aujourd'hui, je suis fière de mon courage, fière d'avoir refusé de rester victime. Mon message : ne laissez personne vous voler votre dignité.",
      author: "Anonyme",
      voices: [],
      likes: 89,
      comments: [
        {
          text: "Quel message puissant ! La honte change de camp, absolument. Vous êtes une guerrière. 👊",
          voices: []
        },
        {
          text: "Votre fierté est légitime. Vous avez transformé la douleur en force. Bravo pour ce parcours exemplaire.",
          voices: []
        },
        {
          text: "Ce témoignage me donne des frissons. Merci de rappeler où est la vraie responsabilité. Tout mon respect.",
          voices: []
        },
        {
          text: "Vous êtes une inspiration. Votre message va aider tellement de personnes. Continuez à briller. ✨",
          voices: []
        },
        {
          text: "La dignité ne peut pas être volée, seulement donnée. Et vous ne l'avez pas donnée. Bravo !",
          voices: []
        },
        {
          text: "Merci infiniment pour ces mots. Ils résonnent fort et juste. Toute ma solidarité.",
          voices: []
        }
      ]
    },
    {
      id: 1700913600000,
      title: "Le poids du regard des autres",
      text: "Le plus difficile n'a pas été les images elles-mêmes, mais le regard des autres après. Les murmures, les questions indiscrètes, les conseils non sollicités. Certains ont même laissé entendre que j'y étais pour quelque chose. Cette double peine a été très dure à vivre. Heureusement, j'ai trouvé refuge dans un groupe de parole. Là, j'ai rencontré des personnes qui comprenaient vraiment. Nous nous sommes soutenus mutuellement. Aujourd'hui, je sais que seul compte le regard que je porte sur moi-même.",
      author: "Anonyme",
      voices: [],
      likes: 43,
      comments: [
        {
          text: "Les groupes de parole sont si importants. Merci de partager cette ressource. Vous êtes courageuse.",
          voices: []
        },
        {
          text: "Le jugement des autres est injuste et cruel. Votre force à y résister est admirable. 💜",
          voices: []
        },
        {
          text: "Votre témoignage touche juste. Le regard qu'on porte sur soi est le seul qui compte vraiment. Bravo.",
          voices: []
        },
        {
          text: "Merci de rappeler l'importance de l'entraide. Ensemble, on est plus fortes. Tout mon soutien.",
          voices: []
        }
      ]
    }
  ];

  // Sauvegarder dans localStorage
  localStorage.setItem('hestia_stories', JSON.stringify(testStories));
  
  // Initialiser les likes (simuler que certains utilisateurs ont aimé certains témoignages)
  const likedStories = [1701432000000, 1701259200000, 1701000000000];
  localStorage.setItem('likedStories', JSON.stringify(likedStories));
  
  console.log('✅ Données de test chargées avec succès !');
  console.log(`📝 ${testStories.length} témoignages créés`);
  console.log('🔄 Rafraîchissez la page pour voir les témoignages');
  
  return testStories;
}

// Pour charger les données, exécutez dans la console : loadTestData()
console.log('💡 Pour charger les données de test, exécutez : loadTestData()');
