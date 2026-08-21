[lang]{Español}
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

# AnimToTextureGenerator Documentación del Plugin

---

### Descripción general

**AnimToTextureGenerator** es un complemento de Unreal Engine 5 que convierte automáticamente las secuencias de animación de mallas esqueléticas en **Texturas de Animación de Vértices (Vertex Animation Texture, VAT)**, y genera todos los recursos relacionados, incluyendo mallas estáticas, instancias de material y activos de datos. Simplifica el flujo de trabajo de VAT integrando herramientas del editor, logrando una conversión de animación a textura con un solo clic.

Este complemento es compatible con **Unreal Engine 5.4 a 5.8**, compatible con las APIs de UE 5.4-5.6 y UE 5.7+.

### Características

- **Generación de VAT con un clic**: Convierte las secuencias de animación de mallas esqueléticas en texturas de animación de vértices con un solo clic.
- **Creación automática de mallas estáticas**: Genera automáticamente mallas estáticas a partir de mallas esqueléticas para la renderización VAT.
- **Gestión de instancias de material**: Clona y gestiona automáticamente las instancias de material, conservando la jerarquía de materiales originales.
- **Extracción de texturas de huesos**: Extrae las texturas de rotación, posición y peso de los huesos para almacenar los datos de animación.
- **Selector de secuencias de animación**: Diálogo integrado para filtrar y seleccionar secuencias de animación, mostrando solo las compatibles con el esqueleto de la malla esquelética seleccionada.
- **Soporte LOD**: Al seleccionar animaciones, se puede elegir el nivel de detalle (LOD) a procesar.
- **Validación de tasa de muestreo**: Verifica automáticamente la tasa de muestreo de las secuencias de animación y emite una advertencia si no son consistentes (lo que puede causar tirones en la animación).
- **Integración con el navegador de contenido**: Al seleccionar una malla esquelética en el navegador de contenido, añade una entrada en el menú contextual del botón derecho.
- **Barra de herramientas del editor de mallas esqueléticas**: Añade un botón de barra de herramientas en el editor de mallas esqueléticas para un acceso rápido conveniente.
- **Compatibilidad UE 5.4-5.8**: A través de compilación condicional, asegura la compatibilidad entre UE 5.4 y 5.8, manejando los cambios de API entre versiones.

### Requisitos del entorno

- **Unreal Engine**: 5.4, 5.5, 5.6, 5.7 o 5.8
- **IDE**: Visual Studio 2019 o posterior (recomendado para proyectos C++)
- **Tipo de proyecto**: Solo complemento de editor (no se puede empaquetar en el tiempo de ejecución)

### Pasos de instalación

1. Clona o copia la carpeta del complemento en el directorio `Plugins/` de tu proyecto.
2. Si tu proyecto no tiene una carpeta `Plugins`, créala en la raíz del proyecto.
3. Haz clic derecho en el archivo `.uproject`, selecciona **Generar archivos de proyecto (Generate Project Files)** (o ejecuta `Setup.sh` / `GenerateProjectFiles.sh`).
4. Abre el proyecto en el editor de Unreal Engine.
5. Ve a **Edición > Complementos (Edit > Plugins)**, busca **AnimToTextureGenerator** y actívalo.
6. Si se te pide reiniciar el editor, hazlo.

### Cómo usar

#### Método uno: Menú contextual del navegador de contenido

1. En el **Navegador de contenido (Content Browser)**, selecciona un recurso de **Malla esquelética (Skeletal Mesh)**.
2. Haz clic derecho en el recurso seleccionado para abrir el menú contextual.
3. Haz clic en **Convert Animations to Texture (VAT)**.
4. Se abrirá un cuadro de diálogo para seleccionar el directorio: elige la ruta de guardado y haz clic en **Select Folder**.
5. Se abrirá el cuadro de diálogo del **Selector de secuencias de animación**, mostrando solo las animaciones compatibles con el esqueleto de la malla esquelética seleccionada.
6. Selecciona **múltiples** secuencias de animación para convertir.
7. Usa el menú desplegable **LOD** para elegir el nivel de detalle a procesar.
8. Haz clic en **Confirm Selection (Confirmar selección)**.
9. Si las tasas de muestreo de las animaciones seleccionadas no son consistentes, aparecerá un cuadro de diálogo de advertencia: haz clic en **Sí** para continuar o **No** para cancelar.
10. El complemento ejecutará el proceso de conversión y, al finalizar, mostrará una notificación de éxito.

#### Método dos: Barra de herramientas del editor de mallas esqueléticas

1. Abre el **Editor de mallas esqueléticas (Skeletal Mesh Editor)** con una malla esquelética.
2. Haz clic en el botón **AnimToTextureGenerator** en la barra de herramientas del editor (icono: icono de clase Texture2D).
3. Sigue los pasos 4-10 del Método uno.

#### Método tres: Botón del complemento (malla esquelética activa)

1. Asegúrate de que hay una malla esquelética abierta en el **Editor de mallas esqueléticas** (recurso activo).
2. Usa el botón del complemento (accesible desde la barra de herramientas o un acceso directo personalizado).
3. Sigue los pasos 4-10 del Método uno.

#### Demostración completa en vídeo

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

### Recursos generados

Después de completar la conversión, se crearán los siguientes recursos en la ruta de guardado seleccionada:

| Tipo de recurso                                           | Descripción                                                                                                                                                     |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Malla estática (Static Mesh)**                          | Malla estática derivada de la malla esquelética, utilizada para la renderización VAT.                                                                           |
| **Material raíz (Material)**                              | Material raíz que contiene nodos de sombreado VAT para el muestreo de texturas de animación.                                                                    |
| **Instancia de material (Material Instance)**             | Instancias de material para cada canal de material, vinculadas al material raíz.                                                                                |
| **Activo de datos (Data Asset)**                          | `UAnimToTextureDataAsset` — contiene referencias a todos los recursos generados, secuencias de animación, texturas de huesos e información de tasa de muestreo. |
| **Textura de rotación de huesos (Bone Rotation Texture)** | Textura que almacena los datos de animación de rotación de huesos.                                                                                              |
| **Textura de posición de huesos (Bone Position Texture)** | Textura que almacena los datos de animación de posición de huesos.                                                                                              |
| **Textura de peso de huesos (Bone Weight Texture)**       | Textura que almacena los datos de animación de peso de huesos.                                                                                                  |

### API de Blueprints

El complemento proporciona las siguientes funciones llamables desde Blueprints a través de `AnimToTextureGeneratorLibrary`:

| Función                                     | Descripción                                                                                                                                                                                           |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OpenFilteredAnimSequencePicker`            | Abre el cuadro de diálogo del selector de secuencias de animación filtradas. Parámetros: `FilterSkeletalMesh` (malla esquelética para filtrar), `OnAssetsPicked` (delegado de devolución de llamada). |
| `ShowSimpleSuccessToast`                    | Muestra una notificación de éxito simple. Parámetros: `Message` (texto a mostrar), `Duration` (duración de visualización en segundos).                                                                |
| `InvokeConvertSkeletalMeshToStaticMesh`     | Convierte una malla esquelética en una malla estática. Parámetros: `SkeletalMesh`, `NamePrefix`, `LODIndex`. Valor de retorno: `UStaticMesh*`.                                                        |
| `InvokeAnimationToTexture`                  | Inicia la conversión principal de animación a textura. Parámetros: `DataAsset`. Valor de retorno: `bool`.                                                                                             |
| `InvokeSetLightMapIndex`                    | Establece el índice de UV de mapa de luces de la malla estática. Parámetros: `StaticMesh`, `LODIndex`, `LightmapIndex`, `bGenerateLightmapUVs`. Valor de retorno: `bool`.                             |
| `InvokeUpdateMaterialInstanceFromDataAsset` | Actualiza la instancia de material según el activo de datos. Parámetros: `DataAsset`, `MaterialInstance`, `MaterialParameterAssociation`.                                                             |
| `FindActiveSkeletalMesh`                    | Busca la malla esquelética activa actual en el editor. Valor de retorno: `USkeletalMesh*`.                                                                                                            |

### Activo de datos: UAnimToTextureDataAsset

`UAnimToTextureDataAsset` es la estructura de datos central que almacena toda la información necesaria para generar la VAT:

| Propiedad             | Tipo                     | Descripción                                                                 |
| --------------------- | ------------------------ | --------------------------------------------------------------------------- |
| `AnimSequences`       | `TArray<UAnimSequence*>` | Arreglo de secuencias de animación incluidas en la VAT.                     |
| `SkeletalMesh`        | `USkeletalMesh*`         | Referencia a la malla esquelética origen.                                   |
| `StaticMesh`          | `UStaticMesh*`           | Referencia a la malla estática generada.                                    |
| `BoneRotationTexture` | `UTexture2D*`            | Textura de animación de rotación de huesos.                                 |
| `BonePositionTexture` | `UTexture2D*`            | Textura de animación de posición de huesos.                                 |
| `BoneWeightTexture`   | `UTexture2D*`            | Textura de animación de peso de huesos.                                     |
| `SampleRate`          | `float`                  | Tasa de muestreo de fotogramas (fotogramas por segundo en formato decimal). |
| `UVChannel`           | `int`                    | Índice del canal UV utilizado por la malla estática.                        |

### Estructura de módulos

| Archivo                             | Descripción                                                                                                                                                                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `AnimToTextureGenerator.cpp`        | Punto de entrada principal del módulo. Maneja el inicio/cierre, registro de botones de barra de herramientas, menú contextual del navegador de contenido y extensión de la barra de herramientas del editor de mallas esqueléticas.  |
| `AnimToTextureGeneratorLibrary.cpp` | Funciones de biblioteca accesibles desde Blueprints. Proporciona funciones utilitarias para abrir el selector de animaciones, invocar la conversión, gestionar materiales y mostrar notificaciones.                                  |
| `Processor.cpp`                     | Lógica de procesamiento principal. Coordena el flujo completo de generación de VAT: creación de mallas estáticas, extracción de texturas de huesos, clonación de materiales, creación de instancias de material y generación de VAT. |
| `AnimSequencePicker.cpp`            | Control de interfaz de usuario Slate para el cuadro de diálogo del selector de secuencias de animación. Proporciona selección de recursos filtrados con soporte para niveles de detalle (LOD).                                       |

### Compatibilidad de versiones

El complemento utiliza compilación condicional para admitir múltiples versiones de UE:

- **UE 5.4 - 5.6**: Utiliza `UAnimToTextureGeneratorLibrary` para llamadas a funciones internas, y `LayerParameter` como asociación de parámetros de material.
- **UE 5.7+**: Utiliza `UAnimToTextureBPLibrary` para llamadas a funciones internas, y `GlobalParameter` como asociación de parámetros de material.

### Licencia

Derechos de autor (c) qq292. Todos los derechos reservados.

---

|                                                                                       |                                                                                                              |                                                                                                       |                                                                                                                                                            |
| :-----------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [![Github](https://cdn.simpleicons.org/github/24292e =x30)](https://github.com/qq292) | [![Bilibili](https://cdn.simpleicons.org/bilibili/fb7299 =x30)](https://space.bilibili.com/3707016472169438) | [![Youtube](https://cdn.simpleicons.org/youtube/ff0000 =x30) ](https://www.youtube.com/@gaojiangchen) | [![Fab](https://img.shields.io/badge/Fab-007EFF?style=flat-square&logo=epicgames&logoColor=white =x30)](https://www.fab.com/sellers/gaojiang%20chen/about) |
