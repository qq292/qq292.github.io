[lag]{日本語}
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

# AnimToTextureGenerator プラグインドキュメント

---

### 概要

**AnimToTextureGenerator** は、スケルトンメッシュのアニメーションシーケンスを**頂点アニメーションテクスチャ（Vertex Animation Texture, VAT）**に自動的に変換し、ステティックメッシュ、マテリアルインスタンス、データアシストを含むすべての関連アセットを生成する Unreal Engine 5 プラグインです。エディタツールを統合して VAT ワークフローを簡素化し、アニメーションからテクスチャへのワンクリック変換を実現します。

このプラグインは **Unreal Engine 5.4 から 5.8** に対応しており、UE 5.4-5.6 および UE 5.7+ の API 互換性をサポートしています。

### 機能特性

- **ワンクリック VAT 生成**：ワンクリックでスケルトンメッシュのアニメーションシーケンスを頂点アニメーションテクスチャに変換。
- **ステティックメッシュの自動作成**：VAT レンダリング用にスケルトンメッシュからステティックメッシュを自動的に生成。
- **マテリアルインスタンス管理**：オリジナルのマテリアルの階層関係を維持しながらマテリアルインスタンスを自動的にクローンおよび管理。
- **ボーンテクスチャ抽出**：アニメーションデータを保存するためのボーンの回転、位置、ウェイトテクスチャを抽出。
- **アニメーションシーケンスピッカー**：選択したスケルトンメッシュのスケルトンと互換性のあるアニメーションのみを表示するフィルター付きアニメーションシーケンス選択ダイアログを内蔵。
- **LOD サポート**：アニメーション選択時に処理する LOD レベルを選択可能。
- **サンプルレート検証**：アニメーションシーケンスのサンプルレートを自動的にチェックし、不一致の場合は警告を発信（アニメーションのスタッタリングの原因になる可能性あり）。
- **コンテンツブラウザ統合**：コンテンツブラウザでスケルトンメッシュを選択している際に、右クリックメニューにショートカットエントリを追加。
- **スケルトンメッシュエディタツールバー**：スケルトンメッシュエディタにツールバーボタンを追加し、クイックアクセスを容易に。
- **UE 5.4-5.8 互換性**：条件付きコンパイルによって UE 5.4 から 5.8 までの互換性を確保し、バージョン間の API 変更に対応。

### 環境要件

- **Unreal Engine**：5.4、5.5、5.6、5.7 または 5.8
- **IDE**：Visual Studio 2019 以降（C++ プロジェクト推奨）
- **プロジェクトタイプ**：エディタプラグインのみ（ランタイムへのパッケージ化は不可）

### インストール手順

1. プラグインフォルダをプロジェクトの `Plugins/` ディレクトリにクローンまたはコピーします。
2. プロジェクトに `Plugins` フォルダが存在しない場合は、プロジェクトのルートディレクトリに作成してください。
3. `.uproject` ファイルを右クリックして、**プロジェクトファイルの生成（Generate Project Files）**を選択します（または `Setup.sh` / `GenerateProjectFiles.sh` を実行します）。
4. Unreal Engine エディタでプロジェクトを開きます。
5. **編集 > プラグイン（Edit > Plugins）**に移動し、**AnimToTextureGenerator** を検索して有効にします。
6. エディタの再起動を促された場合は、再起動してください。

### 使用方法

#### 方法1：コンテンツブラウザの右クリックメニュー

1. **コンテンツブラウザ（Content Browser）**で**スケルトンメッシュ（Skeletal Mesh）**アセットを選択します。
2. 選択したアセットを右クリックしてコンテキストメニューを開きます。
3. **Convert Animations to Texture (VAT)** をクリックします。
4. ディレクトリ選択ダイアログが表示されるので、保存先を選択して **Select Folder** をクリックします。
5. **アニメーションシーケンスピッカー**ダイアログが開き、選択したスケルトンメッシュのスケルトンに一致するアニメーションのみが表示されます。
6. 変換するアニメーションシーケンスを**マルチ選択**します。
7. **LOD** ドロップダウンを使用して処理する LOD レベルを選択します。
8. **Confirm Selection（選択を確認）**をクリックします。
9. 選択したアニメーションのサンプルレートが不一致の場合、警告ダイアログが表示されるので、続行するには **Yes**、キャンセルするには **No** をクリックします。
10. プラグインが変換処理を実行し、完了すると成功通知が表示されます。

#### 方法2：スケルトンメッシュエディタツールバー

1. スケルトンメッシュで**スケルトンメッシュエディタ（Skeletal Mesh Editor）**を開きます。
2. エディタのツールバーにある **AnimToTextureGenerator** ボタン（アイコン：Texture2D クラスのアイコン）をクリックします。
3. 方法1の手順4-10に従ってください。

#### 方法3：プラグインボタン（アクティブなスケルトンメッシュ）

1. **スケルトンメッシュエディタ**でスケルトンメッシュ（アクティブアセット）が開かれていることを確認します。
2. プラグインボタン（ツールバーまたはカスタムショートカットキーからアクセス可能）を使用します。
3. 方法1の手順4-10に従ってください。

#### 完全デモ動画

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

### 生成されるアセット

変換が完了すると、選択した保存先に以下のアセットが作成されます：

| アセットタイプ                                      | 説明                                                                                                                           |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **ステティックメッシュ（Static Mesh）**             | VAT レンダリング用にスケルトンメッシュから派生したステティックメッシュ。                                                       |
| **ルートマテリアル（Material）**                    | アニメーションテクスチャのサンプリングに VAT シェーダーノードを含むルートマテリアル。                                          |
| **マテリアルインスタンス（Material Instance）**     | 各マテリアルスロットのマテリアルインスタンスで、ルートマテリアルにリンクされています。                                         |
| **データアシスト（Data Asset）**                    | `UAnimToTextureDataAsset` — すべての生成アセットの参照、アニメーションシーケンス、ボーンテクスチャ、サンプルレート情報を含む。 |
| **ボーン回転テクスチャ（Bone Rotation Texture）**   | ボーンの回転アニメーションデータを保存するテクスチャ。                                                                         |
| **ボーン位置テクスチャ（Bone Position Texture）**   | ボーンの位置アニメーションデータを保存するテクスチャ。                                                                         |
| **ボーンウェイトテクスチャ（Bone Weight Texture）** | ボーンのウェイトアニメーションデータを保存するテクスチャ。                                                                     |

### ブループリント API

プラグインは `AnimToTextureGeneratorLibrary` を介して以下のブループリント呼び出し可能関数を提供します：

| 関数                                        | 説明                                                                                                                                                                               |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OpenFilteredAnimSequencePicker`            | フィルター付きアニメーションシーケンスピッカーダイアログを開く。パラメータ：`FilterSkeletalMesh`（フィルター用のスケルトンメッシュ）、`OnAssetsPicked`（コールバックデリゲート）。 |
| `ShowSimpleSuccessToast`                    | シンプルな成功通知トーストを表示。パラメータ：`Message`（表示テキスト）、`Duration`（表示時間（秒））。                                                                            |
| `InvokeConvertSkeletalMeshToStaticMesh`     | スケルトンメッシュをステティックメッシュに変換。パラメータ：`SkeletalMesh`、`NamePrefix`、`LODIndex`。戻り値：`UStaticMesh*`。                                                     |
| `InvokeAnimationToTexture`                  | メインのアニメーションからテクスチャへの変換を開始。パラメータ：`DataAsset`。戻り値：`bool`。                                                                                      |
| `InvokeSetLightMapIndex`                    | ステティックメッシュのライティングマップ UV インデックスを設定。パラメータ：`StaticMesh`、`LODIndex`、`LightmapIndex`、`bGenerateLightmapUVs`。戻り値：`bool`。                    |
| `InvokeUpdateMaterialInstanceFromDataAsset` | データアシストに基づいてマテリアルインスタンスを更新。パラメータ：`DataAsset`、`MaterialInstance`、`MaterialParameterAssociation`。                                                |
| `FindActiveSkeletalMesh`                    | エディタで現在アクティブなスケルトンメッシュを検索。戻り値：`USkeletalMesh*`。                                                                                                     |

### データアシスト：UAnimToTextureDataAsset

`UAnimToTextureDataAsset` は、生成された VAT のすべての情報を保存する中心的なデータ構造体です：

| プロパティ            | 型                       | 説明                                                         |
| --------------------- | ------------------------ | ------------------------------------------------------------ |
| `AnimSequences`       | `TArray<UAnimSequence*>` | VAT に含まれるアニメーションシーケンスの配列。               |
| `SkeletalMesh`        | `USkeletalMesh*`         | ソーススケルトンメッシュへの参照。                           |
| `StaticMesh`          | `UStaticMesh*`           | 生成されたステティックメッシュへの参照。                     |
| `BoneRotationTexture` | `UTexture2D*`            | ボーンの回転アニメーションテクスチャ。                       |
| `BonePositionTexture` | `UTexture2D*`            | ボーンの位置アニメーションテクスチャ。                       |
| `BoneWeightTexture`   | `UTexture2D*`            | ボーンのウェイトアニメーションテクスチャ。                   |
| `SampleRate`          | `float`                  | フレームサンプルレート（1秒あたりのフレーム数の小数値）。    |
| `UVChannel`           | `int`                    | ステティックメッシュで使用される UV チャンネルインデックス。 |

### モジュール構造

| ファイル                            | 説明                                                                                                                                                                                    |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AnimToTextureGenerator.cpp`        | メインモジュールのエントリポイント。起動/終了、ツールバーボタンの登録、コンテンツブラウザの右クリックメニュー、スケルトンメッシュエディタツールバーの拡張を処理。                       |
| `AnimToTextureGeneratorLibrary.cpp` | ブループリントからアクセス可能なライブラリ関数。アニメーションピッカーの開く、変換の呼び出し、マテリアルの管理、通知の表示を行うユーティリティ関数を提供。                              |
| `Processor.cpp`                     | コア処理ロジック。完全な VAT 生成フローのオーケストレーション：ステティックメッシュの作成、ボーンテクスチャの抽出、マテリアルのクローン作成、マテリアルインスタンスの作成、VAT の生成。 |
| `AnimSequencePicker.cpp`            | アニメーションシーケンスピッカーダイアログの Slate UI コントロール。LOD レベルのサポート付きのフィルター付きリソース選択を提供。                                                        |

### バージョン互換性

プラグインは条件付きコンパイルを使用して複数の UE バージョンをサポートしています：

- **UE 5.4 - 5.6**：内部関数呼び出しに `UAnimToTextureGeneratorLibrary` を使用し、マテリアルパラメータの関連付けに `LayerParameter` を使用。
- **UE 5.7+**：内部関数呼び出しに `UAnimToTextureBPLibrary` を使用し、マテリアルパラメータの関連付けに `GlobalParameter` を使用。

### ライセンス

Copyright (c) qq292. All rights reserved.

---

|                                                                                                              |                                                                                                                                        |                                                                                                                               |                                                                                                                                                                                 |
| :----------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<br>![Github](https://cdn.simpleicons.org/github/24292e =x25) ](https://github.com/qq292)<br>Github<br><br> | [<br>![Bilibili](https://cdn.simpleicons.org/bilibili/fb7299 =x25) ](https://space.bilibili.com/3707016472169438) <br>Bilibili<br><br> | [<br>![Youtube](https://cdn.simpleicons.org/youtube/ff0000 =x25) ](https://www.youtube.com/@gaojiangchen) <br>Youtube<br><br> | [<br>![Fab](https://img.shields.io/badge/Fab-007EFF?style=flat-square&logo=epicgames&logoColor=white =x25) ](https://www.fab.com/sellers/gaojiang%20chen/about) <br>Fab<br><br> |
