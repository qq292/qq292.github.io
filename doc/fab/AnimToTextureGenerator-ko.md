[lag]{한국어}
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

# AnimToTextureGenerator 플러그인 문서

---

### 개요

**AnimToTextureGenerator** 는 스케르톤 메시의 애니메이션 시스를 **정점 애니메이션 텍스처(Vertex Animation Texture, VAT)**로 자동 변환하고, 정적 메시, 머티리얼 인스턴스, 데이터 어셋을 포함한 모든 관련 어셋을 생성하는 언리얼 엔진 5 플러그인입니다. 에디터 도구를 통합하여 VAT 워크플로우를 간소화하고 애니메이션에서 텍스처로의 원클릭 변환을 구현합니다.

이 플러그인은 **Unreal Engine 5.4 부터 5.8 까지** 지원하며, UE 5.4-5.6 및 UE 5.7+ API 호환성을 제공합니다.

### 기능 특성

- **원클릭 VAT 생성** : 원클릭으로 스케르톤 메시의 애니메이션 시스를 정점 애니메이션 텍스처로 변환합니다.
- **정적 메시 자동 생성** : VAT 렌더링을 위해 스케르톤 메시에서 정적 메시를 자동으로 생성합니다.
- **머티리얼 인스턴스 관리** : 원본 머티리얼의 계층 구조를 유지하면서 머티리얼 인스턴스를 자동으로 복제하고 관리합니다.
- **본 텍스처 추출** : 애니메이션 데이터를 저장하기 위해 본 회전, 위치, 가중치 텍스처를 추출합니다.
- **애니메이션 시스 피커** : 한 스케르톤 메시의 스케르톤과 호환되는 애니메이션만 표시하는 필터링 애니메이션 시스 다이얼로그를 내장했습니다.
- **LOD 지원** : 애니메이션 시 처리할 LOD 레벨을 할 수 있습니다.
- **샘플 레이트 검증** : 애니메이션 시스의 샘플 레이트를 자동으로 확인하고, 불일치할 경우 경고합니다(애니메이션 끊김의 원인이 될 수 있음).
- **컨텐츠 브라우저 통합** : 컨텐츠 브라우저에서 스케르톤 메시를 한 상태에서 오른쪽 클릭 메뉴에 바로 가기 항목을 추가합니다.
- **스케르톤 메시 에디터 도구 모음** : 스케르톤 메시 에디터에 도구 모음 버튼을 추가하여 빠른 접근을 지원합니다.
- **UE 5.4-5.8 호환성** : 조건부 컴파일을 통해 UE 5.4 에서 5.8 까지의 호환성을 보장하며, 버전 간 API 변경 사항을 처리합니다.

### 환경 요구 사항

- **언리얼 엔진** : 5.4, 5.5, 5.6, 5.7 또는 5.8
- **IDE** : Visual Studio 2019 이상 (C++ 프로젝트 권장)
- **프로젝트 유형** : 에디터 플러그인 전용 (런타임 패키징 불가)

### 설치 단계

1. 플러그인 폴더를 프로젝트의 `Plugins/` 디렉토리에 클론하거나 복사합니다.
2. 프로젝트에 `Plugins` 폴더가 없으면 프로젝트 루트 디렉토리에 생성합니다.
3. `.uproject` 파일을 오른쪽 클릭하고 **프로젝트 파일 생성(Generate Project Files)**을 합니다(또는 `Setup.sh` / `GenerateProjectFiles.sh` 를 합니다).
4. 언리얼 엔진 에디터에서 프로젝트를 니다.
5. **편집 > 플러그인(Edit > Plugins)** 으로 이동하여 **AnimToTextureGenerator** 를 검색하고 활성화합니다.
6. 에디터 재시작을 권장하면 재시작합니다.

### 사용 방법

#### 방법1: 컨텐츠 브라우저 오른쪽 클릭 메뉴

1. **컨텐츠 브라우저(Content Browser)** 에서 **스케르톤 메시(Skeletal Mesh)** 어셋을 합니다.
2. 한 어셋을 오른쪽 클릭하여 컨텍스트 메뉴를 니다.
3. **Convert Animations to Texture (VAT)** 을 클릭합니다.
4. 디렉토리 다이얼로그가 표시되면 저장 경로를 하고 **Select Folder** 를 클릭합니다.
5. **애니메이션 시스 피커** 다이얼로그가 열리며, 한 스케르톤 메시의 스케르톤과 일치하는 애니메이션만 표시됩니다.
6. 변환할 애니메이션 시스를 **여러 개 **합니다.
7. **LOD** 드롭다운을 사용하여 처리할 LOD 레벨을 합니다.
8. **Confirm Selection( 확인)** 을 클릭합니다.
9. 한 애니메이션의 샘플 레이트가 불일치할 경우 경고 다이얼로그가 표시되며, 계속하려면 **Yes**, 취소하려면 **No** 를 클릭합니다.
10. 플러그인이 변환 처리를 하고 완료되면 성공 알림이 표시됩니다.

#### 방법2: 스케르톤 메시 에디터 도구 모음

1. 스케르톤 메시로 **스케르톤 메시 에디터(Skeletal Mesh Editor)** 를 니다.
2. 에디터 도구 모음의 **AnimToTextureGenerator** 버튼(아이콘: Texture2D 클래스 아이콘) 을 클릭합니다.
3. 방법1의 단계 4-10 을 따릅니다.

#### 방법3: 플러그인 버튼(활성 스케르톤 메시)

1. **스케르톤 메시 에디터** 에 스케르톤 메시(활성 어셋) 가 열린 상태인지 확인합니다.
2. 플러그인 버튼(도구 모음이나 사용자 지정 단축키로 접근 가능) 을 사용합니다.
3. 방법1의 단계 4-10 을 따릅니다.

#### 완전 데모 영상

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

### 생성되는 어셋

변환이 완료되면 한 저장 경로에 다음 어셋이 생성됩니다:

| 어셋 유형                                 | 설명                                                                                                          |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **정적 메시(Static Mesh)**                | VAT 렌더링을 위해 스케르톤 메시에서 파생된 정적 메시.                                                         |
| **루트 머티리얼(Material)**               | 애니메이션 텍스처 샘플링을 위한 VAT 셰이더 노드를 포함하는 루트 머티리얼.                                     |
| **머티리얼 인스턴스(Material Instance)**  | 각 머티리얼 슬롯의 머티리얼 인스턴스로, 루트 머티리얼에 연결되어 있습니다.                                    |
| **데이터 어셋(Data Asset)**               | `UAnimToTextureDataAsset` — 모든 생성 어셋의 참조, 애니메이션 시스, 본 텍스처, 샘플 레이트 정보를 포함합니다. |
| **본 회전 텍스처(Bone Rotation Texture)** | 본 회전 애니메이션 데이터를 저장하는 텍스처.                                                                  |
| **본 위치 텍스처(Bone Position Texture)** | 본 위치 애니메이션 데이터를 저장하는 텍스처.                                                                  |
| **본 가중치 텍스처(Bone Weight Texture)** | 본 가중치 애니메이션 데이터를 저장하는 텍스처.                                                                |

### 블루프린트 API

플러그인은 `AnimToTextureGeneratorLibrary` 를 통해 다음 블루프린트 호출 가능 함수를 제공합니다:

| 함수                                        | 설명                                                                                                                                  |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `OpenFilteredAnimSequencePicker`            | 필터링 애니메이션 시스 피커 다이얼로그 열기. 매개변수: `FilterSkeletalMesh`(필터용 스케르톤 메시), `OnAssetsPicked`(콜백 델리게이트). |
| `ShowSimpleSuccessToast`                    | 간단한 성공 알림 토스트 표시. 매개변수: `Message`(표시 텍스트), `Duration`(표시 시간, 초).                                            |
| `InvokeConvertSkeletalMeshToStaticMesh`     | 스케르톤 메시를 정적 메시로 변환. 매개변수: `SkeletalMesh`, `NamePrefix`, `LODIndex`. 반환값: `UStaticMesh*`.                         |
| `InvokeAnimationToTexture`                  | 메인 애니메이션에서 텍스처로의 변환 시작. 매개변수: `DataAsset`. 반환값: `bool`.                                                      |
| `InvokeSetLightMapIndex`                    | 정적 메시의 라이팅 UV 인스 설정. 매개변수: `StaticMesh`, `LODIndex`, `LightmapIndex`, `bGenerateLightmapUVs`. 반환값: `bool`.         |
| `InvokeUpdateMaterialInstanceFromDataAsset` | 데이터 어셋에 기반하여 머티리얼 인스턴스 업데이트. 매개변수: `DataAsset`, `MaterialInstance`, `MaterialParameterAssociation`.         |
| `FindActiveSkeletalMesh`                    | 에디터에서 현재 활성 스케르톤 메시 찾기. 반환값: `USkeletalMesh*`.                                                                    |

### 데이터 어셋: UAnimToTextureDataAsset

`UAnimToTextureDataAsset` 은 생성된 VAT 의 모든 정보를 저장하는 중심 데이터 구조체입니다:

| 속성                  | 유형                     | 설명                                          |
| --------------------- | ------------------------ | --------------------------------------------- |
| `AnimSequences`       | `TArray<UAnimSequence*>` | VAT 에 포함된 애니메이션 시스 배열.           |
| `SkeletalMesh`        | `USkeletalMesh*`         | 소스 스케르톤 메시에 대한 참조.               |
| `StaticMesh`          | `UStaticMesh*`           | 생성된 정적 메시에 대한 참조.                 |
| `BoneRotationTexture` | `UTexture2D*`            | 본 회전 애니메이션 텍스처.                    |
| `BonePositionTexture` | `UTexture2D*`            | 본 위치 애니메이션 텍스처.                    |
| `BoneWeightTexture`   | `UTexture2D*`            | 본 가중치 애니메이션 텍스처.                  |
| `SampleRate`          | `float`                  | 프레임 샘플 레이트(초당 프레임 수의 소수 값). |
| `UVChannel`           | `int`                    | 정적 메시에서 사용되는 UV 채널 인스.          |

### 모듈 구조

| 파일                                | 설명                                                                                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `AnimToTextureGenerator.cpp`        | 메인 모듈 진입점. 시작/종료, 도구 모음 버튼 등록, 컨텐츠 브라우저 오른쪽 클릭 메뉴, 스케르톤 메시 에디터 도구 모음 확장을 처리합니다. |
| `AnimToTextureGeneratorLibrary.cpp` | 블루프린트에서 접근 가능한 라이브러리 함수. 애니메이션 피커 열기, 변환 호출, 머티리얼 관리, 알림 표시를 위한 리티 함수를 제공합니다.  |
| `Processor.cpp`                     | 핵심 처리 로직. 전체 VAT 생성 흐름의 오케스트레이션: 정적 메시 생성, 본 텍스처 추출, 머티리얼 복제, 머티리얼 인스턴스 생성, VAT 생성. |
| `AnimSequencePicker.cpp`            | 애니메이션 시스 피커 다이얼로그의 Slate UI 컨트롤. LOD 레벨 지원을 갖춘 필터링 리소스 을 제공합니다.                                  |

### 버전 호환성

플러그인은 조건부 컴파일을 사용하여 여러 UE 버전을 지원합니다:

- **UE 5.4 - 5.6** : 내부 함수 호출에 `UAnimToTextureGeneratorLibrary` 사용, 머티리얼 파라미터 연관성에 `LayerParameter` 사용.
- **UE 5.7+** : 내부 함수 호출에 `UAnimToTextureBPLibrary` 사용, 머티리얼 파라미터 연관성에 `GlobalParameter` 사용.

### 라이선스

Copyright (c) qq292. All rights reserved.

---

|                                                                                                              |                                                                                                                                        |                                                                                                                               |                                                                                                                                                                                 |
| :----------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<br>![Github](https://cdn.simpleicons.org/github/24292e =x25) ](https://github.com/qq292)<br>Github<br><br> | [<br>![Bilibili](https://cdn.simpleicons.org/bilibili/fb7299 =x25) ](https://space.bilibili.com/3707016472169438) <br>Bilibili<br><br> | [<br>![Youtube](https://cdn.simpleicons.org/youtube/ff0000 =x25) ](https://www.youtube.com/@gaojiangchen) <br>Youtube<br><br> | [<br>![Fab](https://img.shields.io/badge/Fab-007EFF?style=flat-square&logo=epicgames&logoColor=white =x25) ](https://www.fab.com/sellers/gaojiang%20chen/about) <br>Fab<br><br> |
