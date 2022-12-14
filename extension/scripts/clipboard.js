// ref: https://github.com/tjjfvi/aoc-2021/blob/main/host/userscript.js

// Click codeblock to copy
for (const pre of document.querySelectorAll("pre > code") ?? []) {
    pre.style.transition = "color .1s"
    pre.addEventListener("click", async e => {
        await navigator.clipboard.writeText(pre.textContent)
        pre.style.color = "#009900"
        setTimeout(() => { pre.style.color = "" }, 200)
    })
}
