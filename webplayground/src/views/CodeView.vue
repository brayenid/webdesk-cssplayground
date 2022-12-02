<script setup>
import { onMounted, ref } from 'vue'
import Split from 'split.js'
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup'

// import 'prismjs/components/prism-cshtml'
import 'prismjs/themes/prism-tomorrow.css'

const htmlCode = ref('')
const cssCode = ref('')
const jsCode = ref('')

const html = (code) => highlight(code, languages.html)
const css = (code) => highlight(code, languages.css)
const javascript = (code) => highlight(code, languages.js)

onMounted(() => {
  let codeAreaVerticalSplit
  codeAreaVerticalSplit = Split(['#html', '#css', '#js'], {
    minSize: [0, 0, 0],
    gutterSize: 4,
    direction: 'horizontal'
  })

  let codeAreaSplit
  codeAreaSplit = Split(['.codeArea', '.codeViewer'], {
    direction: 'vertical',
    gutterSize: 4,
    minSize: 0
  })

  const viewer = document.querySelector('#htmlViewer').contentWindow.document
  const runner = document.querySelector('#runner')
  const collapseMenu = document.querySelector('#collapseMenu')
  const codePaneButtonVertical = document.querySelector('.codeViewVertical')
  const codePaneButtonHorizontal = document.querySelector('.codeViewHorizontal')
  const codePane = document.querySelector('.codePane')
  const codeArea = document.querySelector('.codeArea')

  const codeRunner = () => {
    viewer.open()
    viewer.write(`<style>${cssCode.value}</style>${htmlCode.value}<script>${jsCode.value}<\/script>`)
    viewer.close()
  }
  const codeAreaCollapse = () => {
    const isCodePaneAtBottom = codePane.className.includes('codePaneChangeViewVertical')
    const isCodePaneAtRight = codePane.className.includes('codePaneChangeViewHorizontal')
    if (isCodePaneAtBottom) {
      const isCollapsed = codeAreaSplit.getSizes()[0] > 1
      !isCollapsed ? codeAreaSplit.setSizes([50, 50]) : codeAreaSplit.setSizes([100, 0])
    } else if (!isCodePaneAtBottom) {
      const isCollapsed = codeAreaSplit.getSizes()[0] <= 1
      if (isCodePaneAtRight) {
        !isCollapsed ? codeAreaSplit.collapse(1) : codeAreaSplit.setSizes([50, 50])
      } else {
        !isCollapsed ? codeAreaSplit.collapse(0) : codeAreaSplit.setSizes([50, 50])
      }
    }
  }
  const changeViewVertical = () => {
    //To change the view of codePane, we need to destroy Split Js first
    if (codeAreaSplit) {
      codeAreaSplit.destroy()
      codeAreaVerticalSplit.destroy()
    }
    changeCodePositionVerticalMode()
    //Then we reinitialized it
    setTimeout(() => {
      reInitializeSplitJs('vertical')
      reInitializeSplitJsHorizontal('horizontal')
    }, 0)
  }
  const changeViewHorizontal = () => {
    //To change the view of codePane, we need to destroy Split Js first
    if (codeAreaSplit) {
      codeAreaSplit.destroy()
      codeAreaVerticalSplit.destroy()
    }
    changeCodePositionHorizontalMode()
    //Then we reinitialized it
    setTimeout(() => {
      reInitializeSplitJs('horizontal')
      reInitializeSplitJsHorizontal('vertical')
    }, 0)
  }

  const reInitializeSplitJs = (direction) => {
    codeAreaSplit = Split(['.codeArea', '.codeViewer'], {
      gutterSize: 4,
      minSize: 0,
      direction
    })
  }
  const reInitializeSplitJsHorizontal = (direction) => {
    codeAreaVerticalSplit = Split(['#html', '#css', '#js'], {
      gutterSize: 4,
      minSize: [0, 0, 0],
      direction
    })
  }
  const changeCodePositionVerticalMode = () => {
    codePane.classList.remove('codePaneChangeViewHorizontal')
    codePane.classList.remove('codePaneHorizontalStatePos')
    codePane.classList.toggle('codePaneChangeViewVertical')
    codeArea.classList.remove('codeAreaOnHorizontalFlex')
  }
  const changeCodePositionHorizontalMode = () => {
    codePane.classList.remove('codePaneChangeViewVertical')
    codePane.classList.add('codePaneHorizontalStatePos')
    codePane.classList.toggle('codePaneChangeViewHorizontal')
    codeArea.classList.add('codeAreaOnHorizontalFlex')
  }

  //Button listener
  collapseMenu.addEventListener('click', codeAreaCollapse)
  runner.addEventListener('click', codeRunner)
  codePaneButtonVertical.addEventListener('click', changeViewVertical)
  codePaneButtonHorizontal.addEventListener('click', changeViewHorizontal)

  //Key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      codeRunner()
    }
  })
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === '0') {
      codeAreaCollapse()
    }
  })
})
</script>
<template>
  <main>
    <div class="codePane">
      <div class="codeArea split">
        <div id="html" class="htmlArea">
          <h3>
            <i class="devicon-html5-plain colored"></i>
          </h3>
          <PrismEditor class="my-editor" v-model="htmlCode" :highlight="html" line-numbers></PrismEditor>
        </div>
        <div id="css" class="cssArea">
          <h3>
            <i class="devicon-css3-plain colored"></i>
          </h3>
          <PrismEditor class="my-editor" v-model="cssCode" :highlight="css" line-numbers></PrismEditor>
        </div>
        <div id="js" class="jsArea">
          <h3>
            <i class="devicon-javascript-plain colored"></i>
          </h3>
          <PrismEditor class="my-editor" v-model="jsCode" :highlight="javascript" line-numbers></PrismEditor>
        </div>
      </div>
      <div class="codeViewer">
        <iframe id="htmlViewer" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation"></iframe>
      </div>
    </div>
  </main>
</template>
<style scoped>
h3 {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  z-index: 10;
  width: 100%;
  text-align: right;
  color: #eee;
  font-size: 1.5rem;
}
.codePane {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.codeArea {
  display: flex;
  flex-direction: row;
  position: relative;
  overflow: hidden;
  padding-top: 0.3rem;
}
.codeViewer {
  background-color: #fff;
  width: 100%;
}
iframe {
  width: 100%;
  height: 100%;
}
.htmlArea,
.cssArea,
.jsArea {
  position: relative;
  background-color: #222;
  color: #fff;
  overflow-y: auto;
  padding: 3rem 1rem 0;
  box-sizing: border-box;
  border-radius: 0.3rem;
}
.codePaneChangeViewVertical {
  flex-direction: column-reverse;
}
.codePaneChangeViewHorizontal {
  flex-direction: row-reverse !important;
}
.codePaneHorizontalStatePos {
  flex-direction: row;
}
.codeAreaOnHorizontalFlex {
  flex-direction: column !important;
}

/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}
/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none !important;
}
</style>
