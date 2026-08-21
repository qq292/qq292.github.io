[lag]{Français}
[简体中文]{fab/AnimToTextureGenerator-zh.md}
[English]{fab/AnimToTextureGenerator-en.md}
[한국어]{fab/AnimToTextureGenerator-ko.md}
[Русский]{fab/AnimToTextureGenerator-ru.md}
[日本語]{fab/AnimToTextureGenerator-ja.md}
[Español]{fab/AnimToTextureGenerator-es.md}
[Português (BR)]{fab/AnimToTextureGenerator-pt-BR.md}
[Français]{fab/AnimToTextureGenerator-fr.md}
[Deutsch]{fab/AnimToTextureGenerator-de.md}
[繁體中文]{fab/AnimToTextureGenerator-zh-Hant.md}

# AnimToTextureGenerator Documentation du Plugin

---

### Vue d'ensemble

**AnimToTextureGenerator** est un plugin pour Unreal Engine 5 qui convertit automatiquement les séquences d'animation de mailles squelettiques en **Textures d'Animation de Sommets (Vertex Animation Texture, VAT)**, et génère toutes les ressources associées, y compris les mailles statiques, les instances de matériau et les actifs de données. Il simplifie le flux de travail VAT en intégrant des outils d'éditeur, permettant une conversion animation en texture en un seul clic.

Ce plugin prend en charge **Unreal Engine 5.4 à 5.8** et est compatible avec les API UE 5.4-5.6 et UE 5.7+.

### Fonctionnalités

- **Génération VAT en un clic** : Convertit les séquences d'animation de mailles squelettiques en textures d'animation de sommets en un seul clic.
- **Création automatique de mailles statiques** : Génère automatiquement des mailles statiques à partir de mailles squelettiques pour le rendu VAT.
- **Gestion des instances de matériau** : Clone et gère automatiquement les instances de matériau en conservant la hiérarchie des matériaux d'origine.
- **Extraction de textures d'os** : Extrait les textures de rotation, de position et de poids des os pour stocker les données d'animation.
- **Sélecteur de séquences d'animation** : Boîte de dialogue intégrée pour filtrer et sélectionner les séquences d'animation, n'affichant que les animations compatibles avec le squelette de la maille squelettique sélectionnée.
- **Prise en charge LOD** : Lors de la sélection des animations, il est possible de choisir le niveau de détail (LOD) à traiter.
- **Validation du taux d'échantillonnage** : Vérifie automatiquement le taux d'échantillonnage des séquences d'animation et émet une alerte en cas d'incohérence (ce qui peut provoquer des saccades dans l'animation).
- **Intégration au navigateur de contenu** : Lors de la sélection d'une maille squelettique dans le navigateur de contenu, un élément est ajouté au menu contextuel du clic droit.
- **Bouton de barre d'outils dans l'éditeur de mailles squelettiques** : Ajoute un bouton dans la barre d'outils de l'éditeur de mailles squelettiques pour un accès rapide pratique.
- **Compatibilité UE 5.4-5.8** : Grâce à la compilation conditionnelle, la compatibilité entre UE 5.4 et 5.8 est assurée, en gérant les changements d'API entre les versions.

### Prérequis environnement

- **Unreal Engine** : 5.4, 5.5, 5.6, 5.7 ou 5.8
- **IDE** : Visual Studio 2019 ou supérieur (recommandé pour les projets C++)
- **Type de projet** : Éditeur uniquement (ne peut pas être emballé pour le runtime)

### Étapes d'installation

1. Clonez ou copiez le dossier du plugin dans le répertoire `Plugins/` de votre projet.
2. Si votre projet n'a pas de dossier `Plugins`, créez-le à la racine du projet.
3. Cliquez avec le bouton droit sur le fichier `.uproject`, sélectionnez **Générer les fichiers du projet (Generate Project Files)** (ou exécutez `Setup.sh` / `GenerateProjectFiles.sh`).
4. Ouvrez le projet dans l'éditeur Unreal Engine.
5. Allez dans **Édition > Plugins (Edit > Plugins)**, recherchez **AnimToTextureGenerator** et activez-le.
6. Si on vous demande de redémarrer l'éditeur, faites-le.

### Utilisation

#### Méthode une : Menu contextuel du navigateur de contenu

1. Dans le **Navigateur de contenu (Content Browser)**, sélectionnez une ressource de **Maille squelettique (Skeletal Mesh)**.
2. Cliquez avec le bouton droit sur la ressource sélectionnée pour ouvrir le menu contextuel.
3. Cliquez sur **Convertir les animations en texture (VAT)**.
4. Une boîte de dialogue de sélection de répertoire s'ouvrira : choisissez le chemin d'enregistrement et cliquez sur **Sélectionner le dossier**.
5. La boîte de dialogue du **Sélecteur de séquences d'animation** s'ouvrira, n'affichant que les animations compatibles avec le squelette de la maille squelettique sélectionnée.
6. Sélectionnez **plusieurs** séquences d'animation à convertir.
7. Utilisez le menu déroulant **LOD** pour choisir le niveau de détail à traiter.
8. Cliquez sur **Confirmer la sélection (Confirm Selection)**.
9. Si les taux d'échantillonnage des animations sélectionnées ne sont pas cohérents, une boîte de dialogue d'avertissement apparaîtra : cliquez sur **Oui** pour continuer ou **Non** pour annuler.
10. Le plugin exécutera le processus de conversion et affichera une notification de succès une fois terminé.

#### Méthode deux : Bouton de barre d'outils de l'éditeur de mailles squelettiques

1. Ouvrez l'**Éditeur de mailles squelettiques (Skeletal Mesh Editor)** avec une maille squelettique.
2. Cliquez sur le bouton **AnimToTextureGenerator** dans la barre d'outils de l'éditeur (icône : icône de classe Texture2D).
3. Suivez les étapes 4-10 de la méthode une.

#### Méthode trois : Bouton du plugin (maille squelettique active)

1. Assurez-vous qu'une maille squelettique est ouverte dans l'**Éditeur de mailles squelettiques** (ressource active).
2. Utilisez le bouton du plugin (accessible depuis la barre d'outils ou un raccourci personnalisé).
3. Suivez les étapes 4-10 de la méthode une.

#### Démo vidéo complète

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe src="https://www.youtube.com/embed/FDQjzFrp8bA?autoplay=1&start=30&controls=0"
        scrolling="no"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
        width="640"
        height="480">
</iframe>
</div>

### Ressources générées

Après avoir terminé la conversion, les ressources suivantes seront créées dans le chemin d'enregistrement sélectionné :

| Type de ressource                                    | Description                                                                                                                                                           |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Maille statique (Static Mesh)**                    | Maille statique dérivée de la maille squelettique, utilisée pour le rendu VAT.                                                                                        |
| **Matériau racine (Material)**                       | Matériau racine contenant les nœuds de shader VAT pour l'échantillonnage des textures d'animation.                                                                    |
| **Instance de matériau (Material Instance)**         | Instances de matériau pour chaque canal de matériau, liées au matériau racine.                                                                                        |
| **Actif de données (Data Asset)**                    | `UAnimToTextureDataAsset` — contient des références à toutes les ressources générées, séquences d'animation, textures d'os et informations de taux d'échantillonnage. |
| **Texture de rotation d'os (Bone Rotation Texture)** | Texture stockant les données d'animation de rotation des os.                                                                                                          |
| **Texture de position d'os (Bone Position Texture)** | Texture stockant les données d'animation de position des os.                                                                                                          |
| **Texture de poids d'os (Bone Weight Texture)**      | Texture stockant les données d'animation de poids des os.                                                                                                             |

### API Blueprints

Le plugin fournit les fonctions suivantes, accessibles depuis Blueprints via `AnimToTextureGeneratorLibrary` :

| Fonction                                    | Description                                                                                                                                                                                |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OpenFilteredAnimSequencePicker`            | Ouvre la boîte de dialogue du sélecteur de séquences d'animation filtrées. Paramètres : `FilterSkeletalMesh` (maille squelettique pour le filtrage), `OnAssetsPicked` (délégué de rappel). |
| `ShowSimpleSuccessToast`                    | Affiche une notification de succès simple. Paramètres : `Message` (texte à afficher), `Duration` (durée d'affichage en secondes).                                                          |
| `InvokeConvertSkeletalMeshToStaticMesh`     | Convertit une maille squelettique en maille statique. Paramètres : `SkeletalMesh`, `NamePrefix`, `LODIndex`. Valeur de retour : `UStaticMesh*`.                                            |
| `InvokeAnimationToTexture`                  | Démarre la conversion principale d'animation en texture. Paramètres : `DataAsset`. Valeur de retour : `bool`.                                                                              |
| `InvokeSetLightMapIndex`                    | Définit l'indice de canal UV de la carte d'éclairage de la maille statique. Paramètres : `StaticMesh`, `LODIndex`, `LightmapIndex`, `bGenerateLightmapUVs`. Valeur de retour : `bool`.     |
| `InvokeUpdateMaterialInstanceFromDataAsset` | Met à jour l'instance de matériau en fonction de l'actif de données. Paramètres : `DataAsset`, `MaterialInstance`, `MaterialParameterAssociation`.                                         |
| `FindActiveSkeletalMesh`                    | Recherche la maille squelettique active actuelle dans l'éditeur. Valeur de retour : `USkeletalMesh*`.                                                                                      |

### Actif de données : UAnimToTextureDataAsset

`UAnimToTextureDataAsset` est la structure de données centrale qui stocke toutes les informations nécessaires à la génération de la VAT :

| Propriété             | Type                     | Description                                                               |
| --------------------- | ------------------------ | ------------------------------------------------------------------------- |
| `AnimSequences`       | `TArray<UAnimSequence*>` | Tableau des séquences d'animation incluses dans la VAT.                   |
| `SkeletalMesh`        | `USkeletalMesh*`         | Référence à la maille squelettique source.                                |
| `StaticMesh`          | `UStaticMesh*`           | Référence à la maille statique générée.                                   |
| `BoneRotationTexture` | `UTexture2D*`            | Texture d'animation de rotation d'os.                                     |
| `BonePositionTexture` | `UTexture2D*`            | Texture d'animation de position d'os.                                     |
| `BoneWeightTexture`   | `UTexture2D*`            | Texture d'animation de poids d'os.                                        |
| `SampleRate`          | `float`                  | Taux d'échantillonnage des images (images par seconde au format décimal). |
| `UVChannel`           | `int`                    | Indice du canal UV utilisé par la maille statique.                        |

### Structure des modules

| Fichier                             | Description                                                                                                                                                                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AnimToTextureGenerator.cpp`        | Point d'entrée principal du module. Gère le démarrage/l'arrêt, l'enregistrement des boutons de barre d'outils, le menu contextuel du navigateur de contenu et l'extension de la barre d'outils de l'éditeur de mailles squelettiques. |
| `AnimToTextureGeneratorLibrary.cpp` | Fonctions de bibliothèque accessibles depuis Blueprints. Fournit des fonctions utilitaires pour ouvrir le sélecteur d'animations, invoquer la conversion, gérer les matériaux et afficher des notifications.                          |
| `Processor.cpp`                     | Logique de traitement principale. Coordonne le flux complet de génération VAT: création de mailles statiques, extraction de textures d'os, clonage de matériaux, création d'instances de matériau et génération de VAT.               |
| `AnimSequencePicker.cpp`            | Contrôle d'interface utilisateur Slate pour la boîte de dialogue du sélecteur de séquences d'animation. Fournit une sélection de ressources filtrées avec prise en charge des niveaux de détail (LOD).                                |

### Compatibilité des versions

Le plugin utilise la compilation conditionnelle pour prendre en charge plusieurs versions d'UE :

- **UE 5.4 - 5.6** : Utilise `UAnimToTextureGeneratorLibrary` pour les appels de fonctions internes, et `LayerParameter` comme association de paramètres de matériau.
- **UE 5.7+** : Utilise `UAnimToTextureBPLibrary` pour les appels de fonctions internes, et `GlobalParameter` comme association de paramètres de matériau.

### Licence

Droit d'auteur (c) qq292. Tous droits réservés.

---

|                                                                                       |                                                                                                              |                                                                                                       |                                                                                                                                                            |
| :-----------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [![Github](https://cdn.simpleicons.org/github/24292e =x30)](https://github.com/qq292) | [![Bilibili](https://cdn.simpleicons.org/bilibili/fb7299 =x30)](https://space.bilibili.com/3707016472169438) | [![Youtube](https://cdn.simpleicons.org/youtube/ff0000 =x30) ](https://www.youtube.com/@gaojiangchen) | [![Fab](https://img.shields.io/badge/Fab-007EFF?style=flat-square&logo=epicgames&logoColor=white =x30)](https://www.fab.com/sellers/gaojiang%20chen/about) |
