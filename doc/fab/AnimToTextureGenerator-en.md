[lag]{English}
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

# AnimToTextureGenerator Plugin Documentation

---

### Overview

**AnimToTextureGenerator** is an Unreal Engine 5 plugin that automatically converts skeletal mesh animation sequences into **Vertex Animation Textures (VAT)**, and generates all related assets including static meshes, material instances, and data assets. It streamlines the VAT workflow by providing an integrated editor tool with one-click conversion from animation to texture.

This plugin supports **Unreal Engine 5.4 through 5.8** and is compatible with both UE 5.4-5.6 and UE 5.7+ APIs.

### Features

- **One-Click VAT Generation**: Convert skeletal mesh animation sequences to Vertex Animation Textures with a single click.
- **Automatic Static Mesh Creation**: Automatically generates a static mesh from the skeletal mesh for VAT rendering.
- **Material Instance Management**: Automatically clones and manages material instances, preserving the original material hierarchy.
- **Bone Texture Extraction**: Extracts bone rotation, position, and weight textures for animation data storage.
- **Animation Sequence Picker**: Built-in filtered animation sequence picker dialog that only shows animations compatible with the selected skeletal mesh's skeleton.
- **LOD Support**: Select which LOD level to process when picking animations.
- **Sample Rate Validation**: Automatically checks animation sequence sample rates and warns if they are inconsistent (which may cause animation stuttering).
- **Content Browser Integration**: Right-click context menu entry in the Content Browser when a skeletal mesh is selected.
- **Skeletal Mesh Editor Toolbar**: Toolbar button added to the Skeletal Mesh Editor for quick access.
- **UE 5.4-5.8 Compatibility**: Conditional compilation ensures compatibility across UE 5.4 to 5.8, handling API changes between versions.

### Requirements

- **Unreal Engine**: 5.4, 5.5, 5.6, 5.7, or 5.8
- **IDE**: Visual Studio 2019 or later (recommended for C++ projects)
- **Project Type**: Editor-only plugin (cannot be packaged for runtime)

### Installation

1. Clone or copy the plugin folder into your project's `Plugins/` directory.
2. If your project does not have a `Plugins` folder, create one at the project root level.
3. Right-click the `.uproject` file and select **Generate Project Files** (or run `Setup.sh` / `GenerateProjectFiles.sh`).
4. Open the project in the Unreal Engine Editor.
5. Go to **Edit > Plugins**, search for **AnimToTextureGenerator**, and enable it.
6. Restart the editor if prompted.

### Usage

#### Method 1: Content Browser Context Menu

1. In the **Content Browser**, select a **Skeletal Mesh** asset.
2. Right-click the selected asset to open the context menu.
3. Click **Convert Animations to Texture (VAT)**.
4. A directory selection dialog will appear — choose the save path and click **Select Folder**.
5. The **Animation Sequence Picker** dialog will open, showing only animations that match the selected skeletal mesh's skeleton.
6. **Multi-select** the animation sequences you want to convert.
7. Use the **LOD** dropdown to select the LOD level to process.
8. Click **Confirm Selection**.
9. If the selected animations have inconsistent sample rates, a warning dialog will appear — click **Yes** to continue or **No** to cancel.
10. The plugin will process the conversion and display a success notification when complete.

#### Method 2: Skeletal Mesh Editor Toolbar

1. Open the **Skeletal Mesh Editor** with a skeletal mesh.
2. Click the **AnimToTextureGenerator** button in the editor toolbar (icon: Texture2D class icon).
3. Follow steps 4-10 from Method 1 above.

#### Method 3: Plugin Button (Active Skeletal Mesh)

1. Ensure a skeletal mesh is open in the **Skeletal Mesh Editor** (the active asset).
2. Use the plugin button (accessible via the toolbar or a custom keybind if configured).
3. Follow steps 4-10 from Method 1 above.

#### Full Video Demo

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

### Generated Assets

After the conversion completes, the following assets will be created in the selected save path:

| Asset Type                | Description                                                                                                                               |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Static Mesh**           | A static mesh derived from the skeletal mesh, used for VAT rendering.                                                                     |
| **Material (Root)**       | Root material with VAT shader nodes for animation texture sampling.                                                                       |
| **Material Instance**     | Material instances for each material slot, linked to the root material.                                                                   |
| **Data Asset**            | `UAnimToTextureDataAsset` — contains references to all generated assets, animation sequences, bone textures, and sample rate information. |
| **Bone Rotation Texture** | Texture storing bone rotation data for animation.                                                                                         |
| **Bone Position Texture** | Texture storing bone position data for animation.                                                                                         |
| **Bone Weight Texture**   | Texture storing bone weight data for animation.                                                                                           |

### Blueprint API

The plugin exposes the following Blueprint-callable functions via `AnimToTextureGeneratorLibrary`:

| Function                                    | Description                                                                                                                                             |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OpenFilteredAnimSequencePicker`            | Opens a filtered animation sequence picker dialog. Parameters: `FilterSkeletalMesh` (Skeletal Mesh to filter by), `OnAssetsPicked` (Callback delegate). |
| `ShowSimpleSuccessToast`                    | Displays a simple success notification toast. Parameters: `Message` (Text to display), `Duration` (Display duration in seconds).                        |
| `InvokeConvertSkeletalMeshToStaticMesh`     | Converts a skeletal mesh to a static mesh. Parameters: `SkeletalMesh`, `NamePrefix`, `LODIndex`. Returns: `UStaticMesh*`.                               |
| `InvokeAnimationToTexture`                  | Initiates the main animation-to-texture conversion. Parameters: `DataAsset`. Returns: `bool`.                                                           |
| `InvokeSetLightMapIndex`                    | Sets the lightmap UV index for a static mesh. Parameters: `StaticMesh`, `LODIndex`, `LightmapIndex`, `bGenerateLightmapUVs`. Returns: `bool`.           |
| `InvokeUpdateMaterialInstanceFromDataAsset` | Updates a material instance from a data asset. Parameters: `DataAsset`, `MaterialInstance`, `MaterialParameterAssociation`.                             |
| `FindActiveSkeletalMesh`                    | Finds the currently active skeletal mesh in the editor. Returns: `USkeletalMesh*`.                                                                      |

### Data Asset: UAnimToTextureDataAsset

The `UAnimToTextureDataAsset` is the central data structure that holds all information about the generated VAT:

| Property              | Type                     | Description                                       |
| --------------------- | ------------------------ | ------------------------------------------------- |
| `AnimSequences`       | `TArray<UAnimSequence*>` | Array of animation sequences included in the VAT. |
| `SkeletalMesh`        | `USkeletalMesh*`         | Reference to the source skeletal mesh.            |
| `StaticMesh`          | `UStaticMesh*`           | Reference to the generated static mesh.           |
| `BoneRotationTexture` | `UTexture2D*`            | Bone rotation animation texture.                  |
| `BonePositionTexture` | `UTexture2D*`            | Bone position animation texture.                  |
| `BoneWeightTexture`   | `UTexture2D*`            | Bone weight animation texture.                    |
| `SampleRate`          | `float`                  | Frame sampling rate (decimal frames per second).  |
| `UVChannel`           | `int`                    | UV channel index used for the static mesh.        |

### Module Structure

| File                                | Purpose                                                                                                                                                                                |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AnimToTextureGenerator.cpp`        | Main module entry point. Handles startup/shutdown, registers toolbar buttons, content browser context menu, and extends the Skeletal Mesh Editor toolbar.                              |
| `AnimToTextureGeneratorLibrary.cpp` | Blueprint-accessible library functions. Provides utility functions for opening the animation picker, invoking conversion, managing materials, and showing notifications.               |
| `Processor.cpp`                     | Core processing logic. Orchestrates the full VAT generation pipeline: static mesh creation, bone texture extraction, material cloning, material instance creation, and VAT generation. |
| `AnimSequencePicker.cpp`            | Slate UI widget for the animation sequence picker dialog. Provides filtered asset selection with LOD level support.                                                                    |

### Version Compatibility

The plugin uses conditional compilation to support multiple UE versions:

- **UE 5.4 - 5.6**: Uses `UAnimToTextureGeneratorLibrary` for internal function calls and `LayerParameter` for material parameter association.
- **UE 5.7+**: Uses `UAnimToTextureBPLibrary` for internal function calls and `GlobalParameter` for material parameter association.

### License

Copyright (c) qq292. All Rights Reserved.

---

|                                                                                                              |                                                                                                                                        |                                                                                                                               |                                                                                                                                                                                 |
| :----------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<br>![Github](https://cdn.simpleicons.org/github/24292e =x25) ](https://github.com/qq292)<br>Github<br><br> | [<br>![Bilibili](https://cdn.simpleicons.org/bilibili/fb7299 =x25) ](https://space.bilibili.com/3707016472169438) <br>Bilibili<br><br> | [<br>![Youtube](https://cdn.simpleicons.org/youtube/ff0000 =x25) ](https://www.youtube.com/@gaojiangchen) <br>Youtube<br><br> | [<br>![Fab](https://img.shields.io/badge/Fab-007EFF?style=flat-square&logo=epicgames&logoColor=white =x25) ](https://www.fab.com/sellers/gaojiang%20chen/about) <br>Fab<br><br> |
