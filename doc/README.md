[lag]{简体中文}
[简体中文]{README.md}
[English]{README-en.md}
[Deutsch]{README-de.md}
[한국어]{README-ko.md}

---

[./相对路径](./fab/AnimToTextureGenerator-zh.md)
|
[/绝对路径](/data/re.md)

---

|                                                                                       |                                                                                                              |                                                                                                       |                                                                                                                                                            |
| :-----------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [![Github](https://cdn.simpleicons.org/github/24292e =x60)](https://github.com/qq292) | [![Bilibili](https://cdn.simpleicons.org/bilibili/fb7299 =x60)](https://space.bilibili.com/3707016472169438) | [![Youtube](https://cdn.simpleicons.org/youtube/ff0000 =x60) ](https://www.youtube.com/@gaojiangchen) | [![Fab](https://img.shields.io/badge/Fab-007EFF?style=flat-square&logo=epicgames&logoColor=white =x60)](https://www.fab.com/sellers/gaojiang%20chen/about) |

---

## 你可能感兴趣的

1. [GASDocumentation 中文](blog/GASDocumentation-zh.md)
2. [GASDocumentation 英文](blog/GASDocumentation-en.md)
3. [AnimToTextureGenerator 插件](https://www.fab.com/listings/15d6c399-885b-46c2-86e8-18b7ef6fddb3) [^anim]

| Markdown                     |                                                                             |
| ---------------------------- | --------------------------------------------------------------------------- |
| tagData                      | `[tag]{data1,data2,data3, ...}`                                             |
| 基于`tagData`多语言支持 [^1] | `[lag]{en}`<br>`[en]{en-url}`<br>`[zh]{zh-url}`<br>`[ja]{ja-url}`<br>...... |

> 你选择我的时候，我也选择了你。<br> —— 孤零零的工业革命

[^1]: **`tagData`使用示例**：

    ````js
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

    ````

---

[^anim]:
    **虚幻引擎插件**
    <br>`AnimToTextureGenerator`是一款全自动顶点动画生成插件,
    <br>它将繁琐的制作流程压缩到**3**步，整个过程耗时仅**3-5**秒钟,
    <br>它可以帮你节省**8-15**天的工作时间。
