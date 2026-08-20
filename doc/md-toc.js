// md-toc.js — ES Module

let md = null;
let tocItems = [];
let options = {};
let isbind = false;
let tagData = {};
// 默认配置
const defaults = {
  tocContainer: "#toc-container",
  contentContainer: "#content",
  headingSelector: "h1, h2, h3, h4, h5, h6",
  slugify: (s) =>
    encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, "-")),
  scrollBehavior: -100, //0 = 直接跳转， 负数 = 恒定毫秒时间滚动，大于0 = 超过阈值直接跳转，未超过平滑滚动
  scrollOffset: 0,
  activeClass: "active",
  collapsible: true, // 是否启用折叠功能（生成折叠按钮）
  collapseDepth: -1, // 初始折叠深度（负数=展开全部, 0 = 不展开，1 = 只展开第一级，2 = 展开到第二级...）
  maxDepth: 2, //目录最大深度
};

function getSaveKey(key) {
  return savePrefixion + ":" + key;
}

export function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash = hash & hash;
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function setLoading(isOpon) {
  const dialog = document.getElementById("loading");
  if (isOpon) {
    dialog.showModal();
  } else {
    dialog.close();
  }
}
function isAnchorLink(el) {
  if (el.tagName !== "A") return false;
  const href = el.getAttribute("href");
  if (!href) return false;
  return href.startsWith("#");
}

// 处理多语言
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

function tagDataPlugin(md, options = {}) {
  const getStore = options.getStore;

  md.inline.ruler.after("link", "tag_data", (state, silent) => {
    const start = state.pos;
    const max = state.posMax;
    const src = state.src;

    // 1. 检查是否以 [ 开头
    if (src.charCodeAt(start) !== 0x5b /* [ */) return false;

    // 2. 查找 ] 的位置，提取 tag 名
    let bracketEnd = -1;
    let pos = start + 1;
    while (pos < max) {
      const ch = src.charCodeAt(pos);
      if (ch === 0x5d /* ] */) {
        bracketEnd = pos;
        break;
      }
      if (ch === 0x0a) return false; // 不允许换行
      pos++;
    }

    if (bracketEnd === -1) return false;

    const tag = src.slice(start + 1, bracketEnd).trim();
    if (!tag) return false;

    // 3. ] 后面必须紧跟 {
    if (bracketEnd + 1 >= max) return false;
    if (src.charCodeAt(bracketEnd + 1) !== 0x7b /* { */) return false;

    // 4. 查找匹配的 }（支持嵌套花括号）
    let depth = 0;
    let braceEnd = -1;
    pos = bracketEnd + 1;
    while (pos < max) {
      const ch = src.charCodeAt(pos);
      if (ch === 0x7b /* { */) depth++;
      else if (ch === 0x7d /* } */) {
        depth--;
        if (depth === 0) {
          braceEnd = pos;
          break;
        }
      }
      pos++;
    }

    if (braceEnd === -1) return false;

    // 5. 提取并解析值
    const rawStr = src.slice(bracketEnd + 2, braceEnd);
    const values = rawStr
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "");

    // 6. 静默模式只验证
    if (silent) return true;

    // 7. 收集到 store 对象中（每次实时获取最新的 store）
    if (getStore) {
      const store = getStore();
      if (!store[tag]) {
        store[tag] = [];
      }
      store[tag].push(...values);
    }

    // 8. 生成 token
    const token = state.push("tag_data", "", 0);
    token.meta = { tag, values };

    state.pos = braceEnd + 1;
    return true;
  });

  // 自定义渲染
  md.renderer.rules.tag_data = function (tokens, idx) {
    return "";
  };
}

// 处理a标签为md文件链接
export async function onLinkMD(targetUrl) {
  if (targetUrl) {
    if (window.location.hostname === "127.0.0.1") {
        const hostname = new URL(targetUrl, window.location.href).hostname;
        if (hostname === "127.0.0.1") {
          savePrefixion = simpleHash(targetUrl);
          const response = await fetch(targetUrl);
          const markdownContent = await response.text();
          render(markdownContent);
        }else{
            gmd(targetUrl);
        }

    } else {
      savePrefixion = simpleHash(targetUrl);
      const response = await fetch(targetUrl);
      const markdownContent = await response.text();
      render(markdownContent);
    }
    const url = new URL(window.location);
    url.searchParams.set("url", targetUrl);
    history.pushState(null, "", url);
  }
}

/**
 * 渲染目录到指定容器（支持折叠）
 */
export function renderTOC(items, container) {
  const nav =
    typeof container === "string"
      ? document.querySelector(container)
      : container;

  if (!nav) return;

  nav.innerHTML = "";
  if (items.length === 0) return;
  const rootUl = document.createElement("ul");
  const normalizedItems = [];
  let rootLevel = null;
  let currentLevel = null;
  items.forEach((item) => {
    const rawLevel = item.level;
    if (rootLevel === null) {
      rootLevel = rawLevel;
      currentLevel = rawLevel;

      normalizedItems.push({
        ...item,
        effectiveLevel: 1,
      });
      return;
    }

    if (rawLevel < rootLevel) {
      rootLevel = rawLevel;
      currentLevel = rawLevel;

      normalizedItems.push({
        ...item,
        effectiveLevel: 1,
      });
      return;
    }

    let effectiveLevel = rawLevel - rootLevel + 1;
    if (options.maxDepth > 0) {
      effectiveLevel = Math.min(effectiveLevel, options.maxDepth);
    }

    effectiveLevel = Math.max(1, effectiveLevel);
    currentLevel = rawLevel;
    normalizedItems.push({
      ...item,
      effectiveLevel,
    });
  });

  const stack = [
    {
      level: 0,
      ul: rootUl,
    },
  ];

  normalizedItems.forEach((item, index) => {
    const effectiveLevel = item.effectiveLevel;

    const li = document.createElement("li");
    li.dataset.level = effectiveLevel;

    const a = document.createElement("a");
    a.href = "#" + item.slug;
    a.textContent = item.title;
    a.dataset.slug = item.slug;

    const nextItem = normalizedItems[index + 1];

    const hasChildren = nextItem && nextItem.effectiveLevel > effectiveLevel;

    const wrapper = document.createElement("div");
    wrapper.className = "toc-item-wrapper";

    if (hasChildren && options.collapsible) {
      const toggle = document.createElement("span");
      toggle.className = "toc-toggle";

      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle("collapsed");
        localStorage.setItem(
          getSaveKey(a.dataset.slug),
          li.classList.contains("collapsed") ? 1 : 0,
        );
      });

      wrapper.appendChild(toggle);
    }

    wrapper.appendChild(a);
    li.appendChild(wrapper);
    while (
      stack.length > 1 &&
      stack[stack.length - 1].level >= effectiveLevel
    ) {
      stack.pop();
    }

    const parent = stack[stack.length - 1];

    parent.ul.appendChild(li);
    const childUl = document.createElement("ul");
    li.appendChild(childUl);

    stack.push({
      level: effectiveLevel,
      ul: childUl,
    });
  });

  nav.appendChild(rootUl);
  nav.querySelectorAll("ul").forEach((ul) => {
    if (ul.children.length === 0) {
      ul.remove();
    }
  });

  if (options.collapsible) {
    applyInitialCollapse(nav, normalizedItems);
  }
}

/**
 * 根据 collapseDepth 应用初始折叠
 */
function applyInitialCollapse(nav, items) {
  if (options.collapseDepth < 0) return;
  const minLevel = Math.min(...items.map((i) => i.level));
  nav.querySelectorAll("li").forEach((li) => {
    const level = parseInt(li.dataset.level);
    const depth = level - minLevel + 1;
    if (li.querySelector(":scope > ul") && depth > options.collapseDepth) {
      li.classList.add("collapsed");
    }
  });
}

/**
 * 给正文 HTML 中的标题手动添加 id（备用方案）
 */
export function addHeadingIds(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const headings = doc.querySelectorAll(options.headingSelector);

  headings.forEach((h) => {
    const slug = options.slugify(h.textContent);
    h.setAttribute("id", slug);
  });

  return doc.body.innerHTML;
}

/**
 * 设置滚动高亮
 */

let SCROLL_POSITION_KEY = "test";
let saveScrollTimer = null;
let headings = [];
function setupScrollSpy() {
  const scrollContainer = document.querySelector(options.contentContainer);
  if (!scrollContainer) return;
  headings = document.querySelectorAll(options.headingSelector);
  // 设置滚动高亮

  function update() {
    const containerTop = scrollContainer.getBoundingClientRect().top;
    let currentHeading = null;

    // 从头遍历，找最后一个 top <= 偏移量的标题
    for (const h of headings) {
      const rect = h.getBoundingClientRect();
      const relativeTop = rect.top - containerTop;
      if (relativeTop <= options.scrollOffset + 10) {
        currentHeading = h;
      }
    }
    // 如果没找到，默认选中第一个标题
    if (!currentHeading && headings.length > 0) {
      currentHeading = headings[0];
    }

    if (!currentHeading) return;

    const id = currentHeading.getAttribute("id");

    document
      .querySelectorAll(".catalog .toc-item-wrapper a")
      .forEach((a) => a.classList.remove(options.activeClass));

    const activeLink = document.querySelector(
      `.catalog .toc-item-wrapper a[data-slug="${id}"]`,
    );
    if (activeLink) {
      activeLink.classList.add(options.activeClass);
    }
  }

  /**
   * 设置目录点击平滑滚动 (保存滚动条位置)
   */
  if (isbind == false) {
    let ticking = false;
    scrollContainer.addEventListener("scroll", () => {
      // UI更新：节流，每帧最多一次
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }

      // 保存位置：防抖，停止滚动200ms才写入localStorage
      if (!processing) {
        clearTimeout(saveScrollTimer);
        saveScrollTimer = setTimeout(() => {
          if (!processing) {
            localStorage.setItem(
              SCROLL_POSITION_KEY,
              scrollContainer.scrollTop,
            );
          }
        }, 150);
      }
    });
  }
  // 初始执行一次
//   update();
}
// 恒定时间滚动
function animateScroll(container, targetTop, duration) {
  const startTop = container.scrollTop;
  const distance = targetTop - startTop;
  const startTime = performance.now();

  // 缓动函数：easeInOutCubic，开始和结束慢，中间快
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    container.scrollTop = startTop + distance * easedProgress;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function setupSmoothScroll() {
  document.querySelectorAll(".catalog .toc-item-wrapper").forEach((div) => {
    div.addEventListener("click", (e) => {
      let a = e.currentTarget.querySelector("a");
      if (!a) return;

      e.preventDefault();

      const slug = a.getAttribute("href").slice(1);
      const target = document.getElementById(slug);
      if (!target) return;

      const scrollContainer = document.querySelector(".content");

      const top =
        target.getBoundingClientRect().top +
        scrollContainer.scrollTop -
        scrollContainer.getBoundingClientRect().top -
        options.scrollOffset;

      // 根据 scrollBehavior 参数决定滚动方式
      if (options.scrollBehavior === 0) {
        // 直接跳转
        scrollContainer.scrollTo({ top, behavior: "instant" });
      } else if (options.scrollBehavior < 0) {
        // 恒定时间滚动，取绝对值作为时长（毫秒）
        animateScroll(scrollContainer, top, Math.abs(options.scrollBehavior));
      } else {
        // 按距离阈值判断
        const distance = Math.abs(top - scrollContainer.scrollTop);
        const behavior =
          distance > options.scrollBehavior ? "instant" : "smooth";
        scrollContainer.scrollTo({ top, behavior });
      }
    });
  });
}

let imgResizeObserver = null;
function _waitAllImgBoxExpand(contentEl, allBoxReadyCb) {
  if (imgResizeObserver) {
    imgResizeObserver.disconnect();
    imgResizeObserver = null;
  }

  const imgs = Array.from(contentEl.querySelectorAll("img"));
  if (imgs.length === 0) {
    allBoxReadyCb();
    return;
  }

  const total = imgs.length;
  let doneCount = 0;
  let finished = false;
  /** @type {Set<HTMLImageElement>} */
  const observingSet = new Set();
  // 全部待处理图片，用于超时打印url
  const pendingImgs = [...imgs];

  function checkAllDone() {
    if (finished) return;
    if (doneCount >= total) {
      finished = true;
      if (imgResizeObserver) {
        imgResizeObserver.disconnect();
        imgResizeObserver = null;
      }
      observingSet.clear();
      pendingImgs.length = 0;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          allBoxReadyCb();
        });
      });
    }
  }

  function markImgDone(el) {
    if (finished) return;
    doneCount++;
    // 从待处理列表移除
    const idx = pendingImgs.indexOf(el);
    if (idx > -1) pendingImgs.splice(idx, 1);

    if (observingSet.has(el)) {
      imgResizeObserver.unobserve(el);
      observingSet.delete(el);
    }
    checkAllDone();
  }

  imgResizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const el = entry.target;
      const boxHeight = entry.contentRect.height;
      if (boxHeight > 10) {
        markImgDone(el);
      }
    }
  });

  imgs.forEach((img) => {
    if (img.offsetHeight > 10) {
      markImgDone(img);
      return;
    }

    img.addEventListener(
      "error",
      () => {
        if (img.offsetHeight <= 10) {
          img.style.minHeight = "120px";
        }
        markImgDone(img);
      },
      { once: true },
    );

    img.addEventListener(
      "load",
      () => {
        requestAnimationFrame(() => {
          if (img.offsetHeight > 10) {
            markImgDone(img);
          }
        });
      },
      { once: true },
    );

    observingSet.add(img);
    imgResizeObserver.observe(img);
  });

  requestAnimationFrame(() => {
    for (const img of observingSet) {
      if (img.offsetHeight > 10) {
        markImgDone(img);
      }
    }
  });

  checkAllDone();

  setTimeout(() => {
    if (!finished) {
      finished = true;
      if (imgResizeObserver) {
        imgResizeObserver.disconnect();
        imgResizeObserver = null;
      }
      observingSet.clear();

      // 打印没有完成的图片url
      const unfinishedUrls = pendingImgs.map(
        (x) => x.src || x.getAttribute("src"),
      );
      console.warn(
        "waitAllImgBoxExpand 超时兜底，部分图片未撑开",
        unfinishedUrls,
      );

      pendingImgs.length = 0;
      requestAnimationFrame(() => requestAnimationFrame(allBoxReadyCb));
    }
  }, 8000);
}

function waitAllImgBoxExpand(contentEl, allBoxReadyCb) {
  const imgs = Array.from(contentEl.querySelectorAll("img"));
  if (imgs.length === 0) {
    allBoxReadyCb();
    return;
  }

  let remain = imgs.length;

  function doneOne() {
    remain -= 1;
    if (remain <= 0) {
      // 图片资源全部就绪，双层rAF，留给浏览器重排布局
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          allBoxReadyCb();
        });
      });
    }
  }

  imgs.forEach((img) => {
    // 图片已经加载完毕（缓存）
    if (img.complete) {
      doneOne();
      return;
    }
    img.addEventListener("load", doneOne, { once: true });
    img.addEventListener("error", doneOne, { once: true });
  });
}

/**
 * 一键渲染：目录 + 正文 + 滚动高亮 + 平滑滚动
 */
let processing = false;
export function render(markdown) {
  if (!md) throw new Error("请先调用 setMarkdownInstance() 初始化");
  SCROLL_POSITION_KEY = getSaveKey("sp");
  clearTimeout(saveScrollTimer);
  processing = true;
  setLoading(true);

  //自定义渲染
  let i = 0;
  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const lang = token.info.trim();
    if (lang === "mermaid") {
      const code = token.content.trim();
      return `<div class="mermaid">${code}</div>`;
    }

    let highlighted = "";
    if (lang && typeof hljs !== "undefined" && hljs.getLanguage(lang)) {
      try {
        highlighted = hljs.highlight(token.content, {
          language: lang,
          ignoreIllegals: true,
        }).value;
      } catch (__) {
        highlighted = md.utils.escapeHtml(token.content);
      }
    } else {
      highlighted = md.utils.escapeHtml(token.content);
    }
    i++;
    const rawCode = encodeURIComponent(token.content);
    const langLabel = lang ? `<span class="code-lang">${lang}</span>` : "";
    const detailsId = "cd" + i;
    return `
    <details class="code-details" id=${detailsId}  open>
        <summary class="code-summary hljs" >
            <div>
                ${langLabel}
            </div>
            <div style="display: flex;align-items: center;justify-content: center;">
                <div style="width:10px">
                    <span class="code-number-btn" onclick=" switchCodeNimberVisible(event)"></span>
                </div>
                <div style="width:80px">
                    <span class="copy-btn" style="margin-left: 10px; cursor: pointer;" data-code="${rawCode}" data-tips="copy code">copy</span>
                </div>

            </div>

            
        </summary>
<pre class="hljs"><span class="code-block"><code class="language-html">${highlighted}</code></span></pre></details>`;
  };

  // 清空目录数据并重新渲染
  tocItems = [];
  tagData = {};
  // 渲染正文
  const contentEl = document.querySelector(options.contentContainer);
  if (contentEl) {
    contentEl.innerHTML = md.render(markdown);
    if (tocItems.length > 0) {
      document.title = tocItems[0]["title"];
    }
    onTagData();
  }

  // 渲染目录
  renderTOC(tocItems, document.querySelector(options.tocContainer));

  setupScrollSpy();

  //设置滚动事件
  setupSmoothScroll();

  //==========================================渲染之后==================================================================================
  mermaid.initialize({ startOnLoad: false });
  mermaid.run();
  document.querySelectorAll("pre code").forEach((block) => {
    hljs.lineNumbersBlock(block, { singleLine: true });
  });
  //设置代码折叠
  document.querySelectorAll("details.code-details").forEach((details) => {
    const detailsId = details.id;
    if (!detailsId) return;
    const saved = localStorage.getItem(getSaveKey(detailsId));
    if (saved !== null) {
      details.open = saved === "1";
    }
  });

  if (isbind == false) {
    // 全局点击事件监听
    document.addEventListener("click", async (e) => {
      // a标签事件拦截
      const link = e.target.closest("a");
      if (link) {
        const href = link.getAttribute("href");
        if (href && !isAnchorLink(link)) {
          const isMd = href.split("?")[0].split("#")[0].endsWith(".md");
          if (isMd) {
            e.preventDefault();
            onLinkMD(href);
          }
        }
        return;
      }

      // //复制代码监听
      const btn = e.target.closest(".copy-btn");
      if (!btn) return;
      e.preventDefault();
      if (btn.textContent === "copied ✓") {
        return;
      }

      const code = decodeURIComponent(btn.dataset.code);
      try {
        await navigator.clipboard.writeText(code);
        btn.textContent = "copied ✓";
      } catch (err) {
        const textarea = document.createElement("textarea");
        textarea.value = code;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);

        btn.textContent = "copied ✓";
      }
      setTimeout(() => {
        btn.textContent = "copy";
      }, 400);
    });
    // 折叠代码监听
    document.addEventListener(
      "toggle",
      (e) => {
        const target = e.target;
        if (!target.matches("details.code-details")) return;

        const detailsId = target.id;
        if (!detailsId) return;

        localStorage.setItem(getSaveKey(detailsId), target.open ? "1" : "0");
      },
      true,
    );
  }

  //设置目录折叠
  document.querySelectorAll("span.toc-toggle").forEach((span) => {
    const Id = span.nextElementSibling.dataset.slug;
    if (!Id) return;
    const saved = localStorage.getItem(getSaveKey(Id));
    if (saved !== null) {
      if (saved === "1") {
        span.parentElement.parentElement.classList.add("collapsed");
      } else if (saved === "0") {
        span.parentElement.parentElement.classList.remove("collapsed");
      }
    }
  });

  // 图片全部加载完成后回调 (设置滚动条上次缓存位置)
  function doLayoutWork() {
    const savedPos = localStorage.getItem(SCROLL_POSITION_KEY);
    if (savedPos) {
      contentEl.scrollTop = savedPos;
    }
    processing = false;
    setLoading(false);
  }

  //图片全部加载完毕
  waitAllImgBoxExpand(document, () => {
    doLayoutWork();
  });
  flotFootnote();

  isbind = true;
}

// 渲染本地md文件
window.rmd = async function openLocalMdFile() {
  let file;
  if (window.showOpenFilePicker) {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [
          {
            description: "Markdown file",
            accept: { "text/markdown": [".md"] },
          },
        ],
      });
      file = await handle.getFile();
    } catch (e) {
      if (e.name === "AbortError") return;
      console.error("showOpenFilePicker error", e);
      return;
    }
  } else {
    file = await new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".md";
      input.onchange = (ev) => {
        const f = ev.target.files?.[0];
        resolve(f);
      };
      input.click();
    });
    if (!file) return;
  }
  savePrefixion = simpleHash(file.name);
  const mdText = await file.text();
  render(mdText);
};

// 渲染github md文件
window.gmd = async function fetchGithubMd(githubUrl) {
  savePrefixion = simpleHash(githubUrl);
  function base64ToUtf8(b64) {
    const bytes = atob(b64);
    const buf = new Uint8Array([...bytes].map((c) => c.charCodeAt(0)));
    return new TextDecoder("utf-8").decode(buf);
  }

  const reg =
    /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)$/;
  const match = githubUrl.match(reg);
  if (!match) {
    throw new Error("链接格式不对,请传入github blob网页链接");
  }
  const [, owner, repo, ref, filePath] = match;

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${ref}`;
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error(`请求失败 status:${res.status}`);
  }
  const json = await res.json();

  if (!json.content) {
    throw new Error("文件超过1MB,无法读取");
  }

  const b64Str = json.content.replace(/\n/g, "");
  const mdText = base64ToUtf8(b64Str);

  render(mdText);
};

// ===== 2. 悬浮脚注逻辑 =====
export function flotFootnote() {
  const popover = document.getElementById("footnote-popover");
  let hideTimer = null;

  function showPopover(refLink) {
    clearTimeout(hideTimer);

    const href = refLink.getAttribute("href");
    const fnEl = document.querySelector(href);
    if (!fnEl) return;

    const clone = fnEl.cloneNode(true);
    const backRef = clone.querySelector(".footnote-backref");
    if (backRef) backRef.remove();

    clone.querySelectorAll("img").forEach((img) => {
      img.setAttribute("draggable", "false");
    });

    const contentEl = popover.querySelector(".popover-content");
    if (contentEl) {
      contentEl.innerHTML = clone.innerHTML.trim();
    } else {
      popover.innerHTML = clone.innerHTML.trim(); // 兜底
    }

    const rect = refLink.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    let left = rect.left + scrollLeft;
    let top = rect.bottom + scrollTop + 8;

    if (left + 360 > window.innerWidth) {
      left = window.innerWidth - 370;
    }

    popover.style.left = left + "px";
    popover.style.top = top + "px";
    popover.classList.add("visible");
  }

  function hidePopover() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      popover.classList.remove("visible");
    }, 150);
  }

  document.querySelectorAll(".footnote-ref a").forEach((link) => {
    link.addEventListener("mouseleave", function () {
      hidePopover();
    });
  });

  if (isbind == false) {
    document.addEventListener("click", function (e) {
      const refLink = e.target.closest(".footnote-ref a");
      if (refLink) {
        e.preventDefault();
        e.stopPropagation();
        clearTimeout(hideTimer);
        showPopover(refLink);
        return;
      }

      if (!e.target.closest(".footnote-popover")) {
        hidePopover();
      }
    });
  }

  popover.addEventListener("dragstart", function (e) {
    e.preventDefault();
  });

  popover.addEventListener("mousedown", function (e) {
    if (e.target.tagName === "IMG") {
      e.preventDefault();
    }
  });

  popover.addEventListener("mouseenter", () => clearTimeout(hideTimer));
  popover.addEventListener("mouseleave", hidePopover);
}

/**
 * 初始化 markdown-it 实例并注册 anchor 插件
 */
export function setMarkdownInstance(mdInstance, anchorPlugin, opts = {}) {
  md = mdInstance;
  options = { ...defaults, ...opts };
  tocItems = [];
  tagData = {};
  options.levels = options.headingSelector
    .split(",")
    .map((s) => parseInt(s.trim().replace(/^h/i, "")))
    .filter((n) => !isNaN(n));
  md.use(anchorPlugin, {
    level: options.levels,
    slugify: options.slugify,
    callback: (token, info) => {
      tocItems.push({
        level: parseInt(token.tag.slice(1)),
        title: info.title,
        slug: info.slug,
      });
    },
  });
  md.use(tagDataPlugin, { getStore: () => tagData });

  return { md, tocItems };
}


window.getHitokoto =async function () {
  try {
    const res = await fetch("https://v1.hitokoto.cn/");
    const json = await res.json();
    return `${json.hitokoto}<br> —— ${json.from}`;
  } catch (e) {
    return "保持热爱，奔赴山海";
  }
}















