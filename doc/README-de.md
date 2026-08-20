



[lag]{Deutsch}
[简体中文]{README.md}
[English]{README-en.md}
[Deutsch]{README-de.md}
[한국어]{README-ko.md}


---
|||||
|:---:|:---:|:---:|:---:|
|[![Github](https://cdn.simpleicons.org/github/24292e =x60)](https://github.com/qq292)|[![Bilibili](https://cdn.simpleicons.org/bilibili/fb7299 =x60)](https://space.bilibili.com/3707016472169438)|[![Youtube](https://cdn.simpleicons.org/youtube/ff0000 =x60) ](https://www.youtube.com/@gaojiangchen)|[![Fab](https://img.shields.io/badge/Fab-007EFF?style=flat-square&logo=epicgames&logoColor=white =x60)](https://www.fab.com/sellers/gaojiang%20chen/about)|


---

## Für Sie von Interesse
1. [GASDocumentation Chinesisch](blog/GASDocumentation-zh.md)
2. [GASDocumentation Englisch](blog/GASDocumentation-en.md)
3. [AnimToTextureGenerator Plugins](https://www.fab.com/listings/15d6c399-885b-46c2-86e8-18b7ef6fddb3) [^anim]



|Markdown       |                        |
|---------------|------------------------|
|tagData        |`[tag]{data1,data2,data3, ...}`    |
|Mehrsprachigkeitsunterstützung auf Basis von `tagData` [^1]|`[lag]{en}`<br>`[en]{en-url}`<br>`[zh]{zh-url}`<br>`[ja]{ja-url}`<br>......|

> Wenn du mich wählst, wähle ich auch dich.<br>         —‑ Die Solitäre Industrielle Revolution



[^1]:**`tagData`Verwendungsbeispiele**：
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

---




[^anim]: **Unreal‑Engine‑Plugin**
        <br>`AnimToTextureGenerator` ist ein vollautomatisches Plugin zur Generierung von Vertex‑Animationen.
        <br>Es reduziert den aufwändigen Arbeitsablauf auf nur **3 Schritte**, der gesamte Vorgang dauert lediglich **3‑5 Sekunden**.
        <br>Es spart Ihnen **8‑15 Tage** an Arbeitszeit.
















