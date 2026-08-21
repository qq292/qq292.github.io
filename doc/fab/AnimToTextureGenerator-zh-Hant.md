[lag]{繁體中文}
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

# AnimToTextureGenerator 外掛程式說明文件

---

### 概述

**AnimToTextureGenerator** 是一款 Unreal Engine 5 外掛程式，可自動將骨架動畫序列轉換為**頂點動畫紋理（VAT）**，並生成所有相關資源，包括靜態網格、材質實例和數據資產。它通過整合編輯器工具簡化了 VAT 工作流程，實現一鍵將動畫轉換為紋理。

此外掛程式支援 **Unreal Engine 5.4 至 5.8**，並與 UE 5.4-5.6 及 UE 5.7+ API 相容。

### 功能特性

- **一鍵 VAT 生成**：一鍵將骨架動畫序列轉換為頂點動畫紋理。
- **自動建立靜態網格**：自動從骨架網格生成靜態網格，用於 VAT 渲染。
- **材質實例管理**：自動複製和管理材質實例，同時保留原始材質層級結構。
- **骨骼紋理提取**：提取骨骼的旋轉、位置和權重紋理，用於儲存動畫數據。
- **動畫序列選擇**：內建對話方塊，可篩選並選擇動畫序列，僅顯示與所選骨架網格骨架相容的動畫。
- **LOD 支援**：在選擇動畫時，可選擇要處理的細節層級（LOD）。
- **取樣率驗證**：自動檢查動畫序列的取樣率，在不一致時發出警告（可能導致動畫卡頓）。
- **內容瀏覽器整合**：在內容瀏覽器中選取骨架網格時，右鍵選單會新增選項。
- **骨架網格編輯器工具列按鈕**：在骨架網格編輯器的工具列中新增按鈕，快速存取。
- **UE 5.4-5.8 相容性**：透過條件編譯確保 UE 5.4 至 5.8 之間的相容性，並處理各版本間的 API 變更。

### 環境要求

- **Unreal Engine**：5.4、5.5、5.6、5.7 或 5.8
- **IDE**：Visual Studio 2019 或更高版本（建議用於 C++ 專案）
- **專案類型**：僅編輯器外掛程式（無法在執行時打包）

### 安裝步驟

1. 將外掛程式資料夾複製到專案的 `Plugins/` 目錄中。
2. 如果專案中沒有 `Plugins` 資料夾，請在專案根目錄中建立。
3. 右鍵點擊 `.uproject` 檔案，選擇 **產生專案檔案（Generate Project Files）**（或執行 `Setup.sh` / `GenerateProjectFiles.sh`）。
4. 在 Unreal Engine 編輯器中開啟專案。
5. 前往 **編輯 > 外掛程式（Edit > Plugins）**，搜尋 **AnimToTextureGenerator** 並啟用。
6. 如果編輯器提示重新啟動，請執行重新啟動。

### 使用方法

#### 方法一：內容瀏覽器右鍵選單

1. 在 **內容瀏覽器（Content Browser）** 中選取一個 **骨架網格（Skeletal Mesh）** 資源物件。
2. 右鍵點擊所選資源以開啟內容選單。
3. 點擊 **將動畫轉換為紋理（VAT）**。
4. 將開啟資料夾選擇對話方塊：選擇儲存路徑並點擊 **選擇資料夾**。
5. 將開啟 **動畫序列選擇對話方塊**，僅顯示與所選骨架網格骨架相容的動畫。
6. 選取 **多個** 要轉換的動畫序列。
7. 使用 **LOD** 下拉選單選擇要處理的細節層級。
8. 點擊 **確認選擇（Confirm Selection）**。
9. 如果所選動畫的取樣率不一致，將出現警告：點擊 **是** 繼續，或 **否** 取消。
10. 外掛程式將執行轉換程序，完成後顯示成功通知。

#### 方法二：骨架網格編輯器工具列按鈕

1. 使用骨架網格開啟 **骨架網格編輯器（Skeletal Mesh Editor）**。
2. 點擊編輯器工具列中的 **AnimToTextureGenerator** 按鈕（圖示：Texture2D 類別圖示）。
3. 依序執行方法一的第 4-10 步驟。

#### 方法三：外掛程式按鈕（作用中骨架網格）

1. 確保 **骨架網格編輯器** 中已開啟一個骨架網格（作用中資源）。
2. 使用外掛程式按鈕（可透過工具列或自訂快捷鍵存取）。
3. 依序執行方法一的第 4-10 步驟。

#### 完整影片示範

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

### 生成的資源

轉換完成後，在所選儲存路徑下將建立以下資源：

| 資源類型                                  | 描述                                                                                 |
| ----------------------------------------- | ------------------------------------------------------------------------------------ |
| **靜態網格（Static Mesh）**               | 由骨架網格派生的靜態網格，用於 VAT 渲染。                                            |
| **根材質（Material）**                    | 包含 VAT 著色節點以取樣動畫紋理的根材質。                                            |
| **材質實例（Material Instance）**         | 每個材質通道的材質實例，連結至根材質。                                               |
| **數據資產（Data Asset）**                | `UAnimToTextureDataAsset` — 包含所有生成資源的參照、動畫序列、骨骼紋理和取樣率資訊。 |
| **骨骼旋轉紋理（Bone Rotation Texture）** | 儲存骨骼旋轉動畫數據的紋理。                                                         |
| **骨骼位置紋理（Bone Position Texture）** | 儲存骨骼位置動畫數據的紋理。                                                         |
| **骨骼權重紋理（Bone Weight Texture）**   | 儲存骨骼權重動畫數據的紋理。                                                         |

### 藍圖 API

外掛程式提供以下函式，可透過 `AnimToTextureGeneratorLibrary` 從藍圖中呼叫：

| 函式                                        | 描述                                                                                                                          |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `OpenFilteredAnimSequencePicker`            | 開啟篩選動畫序列選擇對話方塊。參數：`FilterSkeletalMesh`（用於篩選的骨架網格），`OnAssetsPicked`（回呼委派）。                |
| `ShowSimpleSuccessToast`                    | 顯示簡單的成功通知。參數：`Message`（要顯示的文字），`Duration`（顯示時間，以秒為單位）。                                     |
| `InvokeConvertSkeletalMeshToStaticMesh`     | 將骨架網格轉換為靜態網格。參數：`SkeletalMesh`、`NamePrefix`、`LODIndex`。傳回值：`UStaticMesh*`。                            |
| `InvokeAnimationToTexture`                  | 啟動主要的動畫轉紋理轉換。參數：`DataAsset`。傳回值：`bool`。                                                                 |
| `InvokeSetLightMapIndex`                    | 設定靜態網格的燈光貼圖 UV 通道索引。參數：`StaticMesh`、`LODIndex`、`LightmapIndex`、`bGenerateLightmapUVs`。傳回值：`bool`。 |
| `InvokeUpdateMaterialInstanceFromDataAsset` | 根據數據資產更新材質實例。參數：`DataAsset`、`MaterialInstance`、`MaterialParameterAssociation`。                             |
| `FindActiveSkeletalMesh`                    | 尋找編輯器中目前作用的骨架網格。傳回值：`USkeletalMesh*`。                                                                    |

### 數據資產：UAnimToTextureDataAsset

`UAnimToTextureDataAsset` 是儲存 VAT 生成所需所有資訊的核心資料結構：

| 屬性                  | 類型                     | 描述                               |
| --------------------- | ------------------------ | ---------------------------------- |
| `AnimSequences`       | `TArray<UAnimSequence*>` | 納入 VAT 的動畫序列陣列。          |
| `SkeletalMesh`        | `USkeletalMesh*`         | 參照來源骨架網格。                 |
| `StaticMesh`          | `UStaticMesh*`           | 參照生成的靜態網格。               |
| `BoneRotationTexture` | `UTexture2D*`            | 骨骼旋轉動畫紋理。                 |
| `BonePositionTexture` | `UTexture2D*`            | 骨骼位置動畫紋理。                 |
| `BoneWeightTexture`   | `UTexture2D*`            | 骨骼權重動畫紋理。                 |
| `SampleRate`          | `float`                  | 框架取樣率（每秒數，浮點數格式）。 |
| `UVChannel`           | `int`                    | 靜態網格使用的 UV 通道索引。       |

### 模組結構

| 檔案                                | 描述                                                                                                  |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `AnimToTextureGenerator.cpp`        | 模組主要進入點。管理啟動/停止、工具列按鈕註冊、內容瀏覽器右鍵選單和骨架網格編輯器工具列擴展。         |
| `AnimToTextureGeneratorLibrary.cpp` | 可從藍圖呼叫的庫函式。提供開啟動畫選擇對話方塊、呼叫轉換、管理材質和顯示通知等輔助方法。              |
| `Processor.cpp`                     | 主要處理邏輯。協調完整的 VAT 生成流程：建立靜態網格、提取骨骼紋理、複製材質、建立材質實例和生成 VAT。 |
| `AnimSequencePicker.cpp`            | 動畫序列選擇對話方塊的 Slate UI 控制項。提供可篩選的資源選擇，支援 LOD。                              |

### 版本相容性

此外掛程式使用條件編譯來支援多個 UE 版本：

- **UE 5.4 - 5.6**：使用 `UAnimToTextureGeneratorLibrary` 進行內部函式呼叫，並使用 `LayerParameter` 作為材質參數關聯。
- **UE 5.7+**：使用 `UAnimToTextureBPLibrary` 進行內部函式呼叫，並使用 `GlobalParameter` 作為材質參數關聯。

### 授權

版權所有 (c) qq292。保留所有權利。

---

|                                                                                       |                                                                                                              |                                                                                                       |                                                                                                                                                            |
| :-----------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [![Github](https://cdn.simpleicons.org/github/24292e =x30)](https://github.com/qq292) | [![Bilibili](https://cdn.simpleicons.org/bilibili/fb7299 =x30)](https://space.bilibili.com/3707016472169438) | [![Youtube](https://cdn.simpleicons.org/youtube/ff0000 =x30) ](https://www.youtube.com/@gaojiangchen) | [![Fab](https://img.shields.io/badge/Fab-007EFF?style=flat-square&logo=epicgames&logoColor=white =x30)](https://www.fab.com/sellers/gaojiang%20chen/about) |
