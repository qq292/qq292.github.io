

[lag]{한국어}
[简体中文]{README.md}
[English]{README-en.md}
[Deutsch]{README-de.md}
[한국어]{README-ko.md}


---
|||||
|:---:|:---:|:---:|:---:|
|[![Github](https://cdn.simpleicons.org/github/24292e =x60)](https://github.com/qq292)|[![Bilibili](https://cdn.simpleicons.org/bilibili/fb7299 =x60)](https://space.bilibili.com/3707016472169438)|[![Youtube](https://cdn.simpleicons.org/youtube/ff0000 =x60) ](https://www.youtube.com/@gaojiangchen)|[![Fab](https://img.shields.io/badge/Fab-007EFF?style=flat-square&logo=epicgames&logoColor=white =x60)](https://www.fab.com/sellers/gaojiang%20chen/about)|


---

## 관심 있을 만한 내용
1. [GASDocumentation 중국어](blog/GASDocumentation-zh.md)
2. [GASDocumentation 영어](blog/GASDocumentation-en.md)
3. [AnimToTextureGenerator 플러그인](https://www.fab.com/listings/15d6c399-885b-46c2-86e8-18b7ef6fddb3) [^anim]



|Markdown       |                        |
|---------------|------------------------|
|tagData        |`[tag]{data1,data2,data3, ...}`    |
|`tagData` 기반 다국어 지원 [^1]     |`[lag]{en}`<br>`[en]{en-url}`<br>`[zh]{zh-url}`<br>`[ja]{ja-url}`<br>......|

>  너가 나를 선택할 때, 나도 너를 선택한다.<br>         —— 고독한 산업혁명


[^1]:**`tagData` 사용 예시**：
    ```js
        function onTagData() {
            const select = document.getElementById("languageSelect");
            const opstions = document.getElementById("language-dropdown");
            const selected = document.querySelector("#languageSelect .selected-text");

            if (Object.keys(tagData).length === 0) {
                select.style.display = "none";
                return;
            } else {
                select.style.display = "";
            }
            const currentLag = tagData["lag"]!==undefined?tagData["lag"][0]:Object.values(tagData)[0][0];
            opstions.innerHTML = "";
            for (const [lag, url] of Object.entries(tagData)) {
                if (lag === "lag") {
                continue;
                }
                const option = document.createElement("div");
                option.dataset["value"] = url;
                option.innerText = lag;
                if (currentLag === lag) {
                selected.innerHTML = currentLag;
                
                }
                opstions.appendChild(option);
            }
        }
















        
        
        ```




[^anim]: **언리얼 엔진 플러그인**
        <br>`AnimToTextureGenerator`는 완전 자동 정점 애니메이션 생성 플러그인으로,
        <br>번거로운 제작 과정을 **3**단계로 압축하며, 전체 소요 시간은 단 **3~5**초입니다.
        <br>이를 통해 **8~15**일의 작업 시간을 절약할 수 있습니다.


















