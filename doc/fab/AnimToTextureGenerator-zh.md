[lag]{简体中文}
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

# AnimToTextureGenerator 插件文档

---

### 概述

**AnimToTextureGenerator** 是一款虚幻引擎 5 插件，可自动将骨骼网格体的动画序列转换为 **顶点动画纹理（Vertex Animation Texture, VAT）**，并生成所有相关资源，包括静态网格体、材质实例和数据资产。它通过集成编辑器工具简化了 VAT 工作流，实现从动画到纹理的一键转换。

本插件支持 **Unreal Engine 5.4 至 5.8**，兼容 UE 5.4-5.6 和 UE 5.7+ 的 API。

### 功能特性

- **一键生成 VAT**：通过一次点击即可将骨骼网格体的动画序列转换为顶点动画纹理。
- **自动创建静态网格体**：自动从骨骼网格体生成用于 VAT 渲染的静态网格体。
- **材质实例管理**：自动克隆和管理材质实例，保留原始材质层级关系。
- **骨骼纹理提取**：提取骨骼旋转、位置和权重纹理，用于存储动画数据。
- **动画序列选择器**：内置过滤动画序列选择器对话框，仅显示与所选骨骼网格体骨架兼容的动画。
- **LOD 支持**：在选择动画时可选择要处理的 LOD 层级。
- **采样率验证**：自动检查动画序列的采样率，如果不一致则发出警告（可能导致动画卡顿）。
- **内容浏览器集成**：在内容浏览器中选中骨骼网格体时，右键菜单中添加快捷入口。
- **骨骼网格体编辑器工具栏**：在骨骼网格体编辑器中添加工具栏按钮，方便快速访问。
- **UE 5.4-5.8 兼容性**：通过条件编译确保在 UE 5.4 到 5.8 之间的兼容性，处理不同版本间的 API 变更。

### 环境要求

- **虚幻引擎**：5.4、5.5、5.6、5.7 或 5.8
- **IDE**：Visual Studio 2019 或更高版本（C++ 项目推荐）
- **项目类型**：仅编辑器插件（无法打包到运行时中）

### 安装步骤

1. 将插件文件夹克隆或复制到项目的 `Plugins/` 目录中。
2. 如果项目没有 `Plugins` 文件夹，请在项目根目录创建一个。
3. 右键点击 `.uproject` 文件，选择 **生成项目文件（Generate Project Files）**（或运行 `Setup.sh` / `GenerateProjectFiles.sh`）。
4. 在虚幻引擎编辑器中打开项目。
5. 进入 **编辑 > 插件（Edit > Plugins）**，搜索 **AnimToTextureGenerator** 并启用它。
6. 如果提示重启编辑器，请重启。

### 使用方法

#### 方法一：内容浏览器右键菜单

1. 在 **内容浏览器（Content Browser）** 中，选中一个 **骨骼网格体（Skeletal Mesh）** 资源。
2. 右键点击选中的资源，打开上下文菜单。
3. 点击 **Convert Animations to Texture (VAT)**。
4. 将弹出目录选择对话框 — 选择保存路径并点击 **Select Folder**。
5. **动画序列选择器** 对话框将打开，仅显示与所选骨骼网格体骨架匹配的动画。
6. **多选** 要转换的动画序列。
7. 使用 **LOD** 下拉菜单选择要处理的 LOD 层级。
8. 点击 **Confirm Selection（确认选择）**。
9. 如果所选动画的采样率不一致，将弹出警告对话框 — 点击 **Yes** 继续或 **No** 取消。
10. 插件将执行转换处理，完成后显示成功通知。

#### 方法二：骨骼网格体编辑器工具栏

1. 用骨骼网格体打开 **骨骼网格体编辑器（Skeletal Mesh Editor）**。
2. 点击编辑器工具栏中的 **AnimToTextureGenerator** 按钮（图标：Texture2D 类图标）。
3. 按照方法一的第 4-10 步操作。

#### 方法三：插件按钮（活动骨骼网格体）

1. 确保在 **骨骼网格体编辑器** 中打开了一个骨骼网格体（活动资源）。
2. 使用插件按钮（可通过工具栏或自定义快捷键访问）。
3. 按照方法一的第 4-10 步操作。

#### 视频完整演示

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe src="https://player.bilibili.com/player.html?isOutside=true&bvid=BV1NrMQ61E85&p=1&autoplay=0"
        scrolling="no"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
        width="640"
        height="480">
</iframe>
</div>

### 生成的资源

转换完成后，将在所选保存路径中创建以下资源：

| 资源类型                                  | 说明                                                                                 |
| ----------------------------------------- | ------------------------------------------------------------------------------------ |
| **静态网格体（Static Mesh）**             | 从骨骼网格体派生的静态网格体，用于 VAT 渲染。                                        |
| **根材质（Material）**                    | 包含 VAT 着色器节点用于动画纹理采样的根材质。                                        |
| **材质实例（Material Instance）**         | 每个材质槽的材质实例，链接到根材质。                                                 |
| **数据资产（Data Asset）**                | `UAnimToTextureDataAsset` — 包含所有生成资源的引用、动画序列、骨骼纹理和采样率信息。 |
| **骨骼旋转纹理（Bone Rotation Texture）** | 存储骨骼旋转动画数据的纹理。                                                         |
| **骨骼位置纹理（Bone Position Texture）** | 存储骨骼位置动画数据的纹理。                                                         |
| **骨骼权重纹理（Bone Weight Texture）**   | 存储骨骼权重动画数据的纹理。                                                         |

### 蓝图 API

插件通过 `AnimToTextureGeneratorLibrary` 提供以下蓝图可调用函数：

| 函数                                        | 说明                                                                                                                        |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `OpenFilteredAnimSequencePicker`            | 打开过滤动画序列选择器对话框。参数：`FilterSkeletalMesh`（用于过滤的骨骼网格体）、`OnAssetsPicked`（回调委托）。            |
| `ShowSimpleSuccessToast`                    | 显示简单的成功通知提示。参数：`Message`（显示文本）、`Duration`（显示持续时间，秒）。                                       |
| `InvokeConvertSkeletalMeshToStaticMesh`     | 将骨骼网格体转换为静态网格体。参数：`SkeletalMesh`、`NamePrefix`、`LODIndex`。返回值：`UStaticMesh*`。                      |
| `InvokeAnimationToTexture`                  | 启动主要的动画到纹理转换。参数：`DataAsset`。返回值：`bool`。                                                               |
| `InvokeSetLightMapIndex`                    | 设置静态网格体的光照贴图 UV 索引。参数：`StaticMesh`、`LODIndex`、`LightmapIndex`、`bGenerateLightmapUVs`。返回值：`bool`。 |
| `InvokeUpdateMaterialInstanceFromDataAsset` | 根据数据资产更新材质实例。参数：`DataAsset`、`MaterialInstance`、`MaterialParameterAssociation`。                           |
| `FindActiveSkeletalMesh`                    | 查找编辑器中当前活动的骨骼网格体。返回值：`USkeletalMesh*`。                                                                |

### 数据资产：UAnimToTextureDataAsset

`UAnimToTextureDataAsset` 是保存生成 VAT 所有信息的中心数据结构：

| 属性                  | 类型                     | 说明                             |
| --------------------- | ------------------------ | -------------------------------- |
| `AnimSequences`       | `TArray<UAnimSequence*>` | 包含在 VAT 中的动画序列数组。    |
| `SkeletalMesh`        | `USkeletalMesh*`         | 源骨骼网格体的引用。             |
| `StaticMesh`          | `UStaticMesh*`           | 生成的静态网格体的引用。         |
| `BoneRotationTexture` | `UTexture2D*`            | 骨骼旋转动画纹理。               |
| `BonePositionTexture` | `UTexture2D*`            | 骨骼位置动画纹理。               |
| `BoneWeightTexture`   | `UTexture2D*`            | 骨骼权重动画纹理。               |
| `SampleRate`          | `float`                  | 帧采样率（小数形式的每秒帧数）。 |
| `UVChannel`           | `int`                    | 静态网格体使用的 UV 通道索引。   |

### 模块结构

| 文件                                | 说明                                                                                                     |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `AnimToTextureGenerator.cpp`        | 主模块入口点。处理启动/关闭、注册工具栏按钮、内容浏览器右键菜单，以及扩展骨骼网格体编辑器工具栏。        |
| `AnimToTextureGeneratorLibrary.cpp` | 蓝图可访问的库函数。提供用于打开动画选择器、调用转换、管理材质和显示通知的实用函数。                     |
| `Processor.cpp`                     | 核心处理逻辑。编排完整的 VAT 生成流程：静态网格体创建、骨骼纹理提取、材质克隆、材质实例创建和 VAT 生成。 |
| `AnimSequencePicker.cpp`            | 动画序列选择器对话框的 Slate UI 控件。提供带 LOD 层级支持的过滤资源选择。                                |

### 版本兼容性

插件使用条件编译来支持多个 UE 版本：

- **UE 5.4 - 5.6**：使用 `UAnimToTextureGeneratorLibrary` 进行内部函数调用，使用 `LayerParameter` 作为材质参数关联。
- **UE 5.7+**：使用 `UAnimToTextureBPLibrary` 进行内部函数调用，使用 `GlobalParameter` 作为材质参数关联。

### 许可证

版权所有 (c) qq292。保留所有权利。

---

|                                                                                                              |                                                                                                                                        |                                                                                                                               |                                                                                                                                                                                 |
| :----------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<br>![Github](https://cdn.simpleicons.org/github/24292e =x25) ](https://github.com/qq292)<br>Github<br><br> | [<br>![Bilibili](https://cdn.simpleicons.org/bilibili/fb7299 =x25) ](https://space.bilibili.com/3707016472169438) <br>Bilibili<br><br> | [<br>![Youtube](https://cdn.simpleicons.org/youtube/ff0000 =x25) ](https://www.youtube.com/@gaojiangchen) <br>Youtube<br><br> | [<br>![Fab](https://img.shields.io/badge/Fab-007EFF?style=flat-square&logo=epicgames&logoColor=white =x25) ](https://www.fab.com/sellers/gaojiang%20chen/about) <br>Fab<br><br> |
