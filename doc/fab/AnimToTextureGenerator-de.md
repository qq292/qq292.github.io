[lag]{Deutsch}
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

# AnimToTextureGenerator Plugin Dokumentation

---

### Übersicht

**AnimToTextureGenerator** ist ein Unreal Engine 5-Plugin, das automatisch Skelett Animationssequenzen in **Vertex Animation Textures (VAT)** umwandelt und alle zugehörigen Ressourcen erzeugt, einschließlich statischer Meshes, Materialinstanzen und Datenassets. Es vereinfacht den VAT-Arbeitsablauf durch die Integration von Editor-Tools und ermöglicht eine Ein-Klick-Umwandlung von Animation zu Textur.

Dieses Plugin unterstützt **Unreal Engine 5.4 bis 5.8** und ist mit den UE 5.4-5.6 sowie UE 5.7+ APIs kompatibel.

### Funktionen

- **Ein-Klick-VAT-Generierung**: Wandelt Skelett Animationssequenzen mit einem Klick in Vertex-Animations-Texturen um.
- **Automatische Erstellung statischer Meshes**: Erzeugt automatisch statische Meshes aus Skelett-Meshes für die VAT-Rendierung.
- **Materialinstanz-Verwaltung**: Kloniert und verwaltet automatisch Materialinstanzen und erhält dabei die ursprüngliche Materialhierarchie.
- **Knochen-Textur-Extraktion**: Extrahiert Rotations-, Positions- und Gewichtungstexturen der Knochen zur Speicherung der Animationsdaten.
- **Animationssequenz-Auswahl**: Eingebetteter Dialog zum Filtern und Auswählen von Animationssequenzen, der nur die mit dem Skelett des ausgewählten Skelett-Meshes kompatiblen Animationen anzeigt.
- **LOD-Unterstützung**: Bei der Auswahl von Animationen kann die zu verarbeitende Detailstufe (LOD) gewählt werden.
- **Abtastrate-Validierung**: Prüft automatisch die Abtastrate der Animationssequenzen und warnt bei Inkonsistenzen (was zu Ruckeln in der Animation führen kann).
- **Integration im Inhaltsbrowser**: Bei Auswahl eines Skelett-Meshes im Inhaltsbrowser wird ein Eintrag im Rechtsklick-Menü hinzugefügt.
- **Toolbar-Schaltfläche im Skelett-Mesh-Editor**: Fügt eine Schaltfläche in der Toolbar des Skelett-Mesh-Editors hinzu für schnellen Zugriff.
- **UE 5.4-5.8-Kompatibilität**: Durch bedingte Kompilierung wird die Kompatibilität zwischen UE 5.4 und 5.8 sichergestellt, wobei API-Änderungen zwischen den Versionen berücksichtigt werden.

### Umgebungsvoraussetzungen

- **Unreal Engine**: 5.4, 5.5, 5.6, 5.7 oder 5.8
- **IDE**: Visual Studio 2019 oder höher (empfohlen für C++-Projekte)
- **Projekttyp**: Nur Editor-Plugin (kann nicht zur Laufzeit gepackt werden)

### Installationsschritte

1. Klone oder kopiere den Plugin-Ordner in das Verzeichnis `Plugins/` deines Projekts.
2. Wenn dein Projekt keinen Ordner `Plugins` hat, erstelle ihn im Stammverzeichnis des Projekts.
3. Klicke mit der rechten Maustaste auf die `.uproject`-Datei, wähle **Projektdateien generieren (Generate Project Files)** (oder führe `Setup.sh` / `GenerateProjectFiles.sh` aus).
4. Öffne das Projekt im Unreal Engine-Editor.
5. Gehe zu **Bearbeiten > Plugins (Edit > Plugins)**, suche nach **AnimToTextureGenerator** und aktiviere es.
6. Wenn der Editor einen Neustart anbietet, führe ihn durch.

### Verwendung

#### Methode eins: Rechtsklick-Menü im Inhaltsbrowser

1. Wähle im **Inhaltsbrowser (Content Browser)** ein **Skelett-Mesh (Skeletal Mesh)**-Ressourcenobjekt aus.
2. Klicke mit der rechten Maustaste auf die ausgewählte Ressource, um das Kontextmenü zu öffnen.
3. Klicke auf **Animationen in Textur umwandeln (VAT)**.
4. Es öffnet sich ein Dialog zur Ordnerauswahl: Wähle den Speicherpfad und klicke auf **Ordner auswählen**.
5. Es öffnet sich der **Animationssequenz-Auswahldialog**, der nur die mit dem Skelett des ausgewählten Skelett-Meshes kompatiblen Animationen anzeigt.
6. Wähle **mehrere** Animationssequenzen zur Umwandlung aus.
7. Verwende das Dropdown-Menü **LOD**, um die zu verarbeitende Detailstufe zu wählen.
8. Klicke auf **Auswahl bestätigen (Confirm Selection)**.
9. Wenn die Abtastraten der ausgewählten Animationen inkonsistent sind, erscheint eine Warnung: Klicke auf **Ja**, um fortzufahren, oder **Nein**, um abzubrechen.
10. Das Plugin führt den Umwandlungsprozess durch und zeigt nach Abschluss eine Erfolgsbenachrichtigung an.

#### Methode zwei: Toolbar-Schaltfläche im Skelett-Mesh-Editor

1. Öffne den **Skelett-Mesh-Editor (Skeletal Mesh Editor)** mit einem Skelett-Mesh.
2. Klicke auf die Schaltfläche **AnimToTextureGenerator** in der Toolbar des Editors (Symbol: Texture2D-Klassenicon).
3. Folge den Schritte 4-10 aus Methode eins.

#### Methode drei: Plugin-Schaltfläche (aktives Skelett-Mesh)

1. Stelle sicher, dass ein Skelett-Mesh im **Skelett-Mesh-Editor** geöffnet ist (aktive Ressource).
2. Verwende die Plugin-Schaltfläche (verfügbar über die Toolbar oder eine benutzerdefinierte Verknüpfung).
3. Folge den Schritte 4-10 aus Methode eins.

#### Vollständige Video-Demonstration

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

### Generierte Ressourcen

Nach Abschluss der Umwandlung werden im gewählten Speicherpfad die folgenden Ressourcen erstellt:

| Ressourcentyp                                        | Beschreibung                                                                                                                                       |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Statisches Mesh (Static Mesh)**                    | Vom Skelett-Mesh abgeleitetes statisches Mesh, verwendet für die VAT-Rendierung.                                                                   |
| **Wurzelmaterial (Material)**                        | Wurzelmaterial, das VAT-Shading-Knoten für das Abtasten der Animations-Texturen enthält.                                                           |
| **Materialinstanz (Material Instance)**              | Materialinstanzen für jeden Materialkanal, verknüpft mit dem Wurzelmaterial.                                                                       |
| **Datenasset (Data Asset)**                          | `UAnimToTextureDataAsset` — enthält Verweise auf alle generierten Ressourcen, Animationssequenzen, Knochen-Texturen und Abtastraten-Informationen. |
| **Knochen-Rotations-Textur (Bone Rotation Texture)** | Textur, die die Animationsdaten der Knochenrotation speichert.                                                                                     |
| **Knochen-Positions-Textur (Bone Position Texture)** | Textur, die die Animationsdaten der Knochenposition speichert.                                                                                     |
| **Knochen-Gewichtungs-Textur (Bone Weight Texture)** | Textur, die die Animationsdaten der Knochengewichtung speichert.                                                                                   |

### Blueprint-API

Das Plugin stellt die folgenden Funktionen bereit, die über `AnimToTextureGeneratorLibrary` aus Blueprints heraus aufgerufen werden können:

| Funktion                                    | Beschreibung                                                                                                                                                                        |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OpenFilteredAnimSequencePicker`            | Öffnet den Dialog für die Auswahl gefilterter Animationssequenzen. Parameter: `FilterSkeletalMesh` (zum Filtern verwendetes Skelett-Mesh), `OnAssetsPicked` (Callback-Delegierter). |
| `ShowSimpleSuccessToast`                    | Zeigt eine einfache Erfolgsbenachrichtigung an. Parameter: `Message` (anzuzeigender Text), `Duration` (Anzeigezeit in Sekunden).                                                    |
| `InvokeConvertSkeletalMeshToStaticMesh`     | Wandelt ein Skelett-Mesh in ein statisches Mesh um. Parameter: `SkeletalMesh`, `NamePrefix`, `LODIndex`. Rückgabewert: `UStaticMesh*`.                                              |
| `InvokeAnimationToTexture`                  | Startet die Hauptumwandlung von Animation zu Textur. Parameter: `DataAsset`. Rückgabewert: `bool`.                                                                                  |
| `InvokeSetLightMapIndex`                    | Setzt den UV-Kanal-Index der Lichtkarte des statischen Meshes. Parameter: `StaticMesh`, `LODIndex`, `LightmapIndex`, `bGenerateLightmapUVs`. Rückgabewert: `bool`.                  |
| `InvokeUpdateMaterialInstanceFromDataAsset` | Aktualisiert die Materialinstanz basierend auf dem Datenasset. Parameter: `DataAsset`, `MaterialInstance`, `MaterialParameterAssociation`.                                          |
| `FindActiveSkeletalMesh`                    | Sucht das aktuell aktive Skelett-Mesh im Editor. Rückgabewert: `USkeletalMesh*`.                                                                                                    |

### Datenasset: UAnimToTextureDataAsset

`UAnimToTextureDataAsset` ist die zentrale Datenstruktur, die alle für die VAT-Erzeugung erforderlichen Informationen speichert:

| Eigenschaft           | Typ                      | Beschreibung                                                 |
| --------------------- | ------------------------ | ------------------------------------------------------------ |
| `AnimSequences`       | `TArray<UAnimSequence*>` | Array der in die VAT aufgenommenen Animationssequenzen.      |
| `SkeletalMesh`        | `USkeletalMesh*`         | Verweis auf das Quelldaten-Skelett-Mesh.                     |
| `StaticMesh`          | `UStaticMesh*`           | Verweis auf das erzeugte statische Mesh.                     |
| `BoneRotationTexture` | `UTexture2D*`            | Knochen-Rotations Animations-Textur.                         |
| `BonePositionTexture` | `UTexture2D*`            | Knochen-Positions Animations-Textur.                         |
| `BoneWeightTexture`   | `UTexture2D*`            | Knochen-Gewichtungs Animations-Textur.                       |
| `SampleRate`          | `float`                  | Abtastrate der Frames (Bilder pro Sekunde im Dezimalformat). |
| `UVChannel`           | `int`                    | Index des vom statischen Mesh verwendeten UV-Kanals.         |

### Modulstruktur

| Datei                               | Beschreibung                                                                                                                                                                                                               |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AnimToTextureGenerator.cpp`        | Haupt-Einstiegspunkt des Moduls. Verwaltet Start/Stopp, Registrierung von Toolbar-Schaltflächen, Rechtsklick-Menü des Inhaltsbrowsers und Erweiterung der Skelett-Mesh-Editor-Toolbar.                                     |
| `AnimToTextureGeneratorLibrary.cpp` | Aus Blueprints heraus aufrufbare Bibliotheksfunktionen. Stellt Hilfsmethoden zum Öffnen des Animationsauswahldialogs, Aufrufen der Umwandlung, Verwalten von Materialien und Anzeigen von Benachrichtigungen bereit.       |
| `Processor.cpp`                     | Hauptverarbeitungslogik. Koordiniert den vollständigen VAT-Erzeugungsfluss: Erstellung statischer Meshes, Extraktion von Knochen-Texturen, Klonen von Materialien, Erstellen von Materialinstanzen und Generieren von VAT. |
| `AnimSequencePicker.cpp`            | Slate-UI-Steuerung für den Animationssequenz-Auswahldialog. Bietet filterbare Ressourcenauswahl mit LOD-Unterstützung.                                                                                                     |

### Versionskompatibilität

Das Plugin verwendet bedingte Kompilierung, um mehrere UE-Versionen zu unterstützen:

- **UE 5.4 - 5.6**: Verwendet `UAnimToTextureGeneratorLibrary` für interne Funktionsaufrufe und `LayerParameter` als Materialparameter-Zuordnung.
- **UE 5.7+**: Verwendet `UAnimToTextureBPLibrary` für interne Funktionsaufrufe und `GlobalParameter` als Materialparameter-Zuordnung.

### Lizenz

Urheberrecht (c) qq292. Alle Rechte vorbehalten.

---

|                                                                                                              |                                                                                                                                        |                                                                                                                               |                                                                                                                                                                                 |
| :----------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<br>![Github](https://cdn.simpleicons.org/github/24292e =x25) ](https://github.com/qq292)<br>Github<br><br> | [<br>![Bilibili](https://cdn.simpleicons.org/bilibili/fb7299 =x25) ](https://space.bilibili.com/3707016472169438) <br>Bilibili<br><br> | [<br>![Youtube](https://cdn.simpleicons.org/youtube/ff0000 =x25) ](https://www.youtube.com/@gaojiangchen) <br>Youtube<br><br> | [<br>![Fab](https://img.shields.io/badge/Fab-007EFF?style=flat-square&logo=epicgames&logoColor=white =x25) ](https://www.fab.com/sellers/gaojiang%20chen/about) <br>Fab<br><br> |
