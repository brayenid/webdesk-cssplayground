<script setup>
import { onMounted, reactive, ref, onUnmounted } from 'vue'
import Split from 'split.js'
import { PrismEditor } from 'vue-prism-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import { customAlphabet } from 'nanoid'
import { useRoute, useRouter } from 'vue-router'
import { doc, setDoc } from '@firebase/firestore'
import { db } from '../firebase'
import { useAuthState } from '../stores/auth'
import { useProjectInfo, useNavButton } from '../stores/project'
import { storeToRefs } from 'pinia'

import 'vue-prism-editor/dist/prismeditor.min.css'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup'
import 'prismjs/themes/prism-tomorrow.css'

const route = useRoute()
const router = useRouter()

const htmlCode = ref('')
const cssCode = ref('')
const jsCode = ref('')

const html = (code) => highlight(code, languages.html)
const css = (code) => highlight(code, languages.css)
const javascript = (code) => highlight(code, languages.js)

//elements
const codeAreaEl = ref(null)
const codePaneEl = ref(null)
const htmlViewerEl = ref(null)

const projectInfo = useProjectInfo()
const navButtons = useNavButton()

const { userId, userName, userPhotoUrl, isLoggedIn } = storeToRefs(useAuthState())
const getMonth = new Date().getMonth()
const getYear = new Date().getFullYear()
const nanoId = customAlphabet('1234567890abcdef', 5)
const generateId = `${nanoId()}${getMonth}${getYear}`
const projectId = route.params.id ? route.params.id : generateId

let codeAreaSplit
let codeAreaVerticalSplit
//Method
const saveToDb = async (collection, title, code) => {
  await setDoc(doc(db, collection, title), code)
}
//This codeSaver function is holding Save and Update function
const codeSaver = () => {
  const dateCreated = new Date()
  const dataProject = {
    projectId: projectId,
    projectTitle: projectInfo.projectTitle,
    projectAuthor: userName.value,
    projectAuthorId: userId.value,
    projectAuthorPhoto: userPhotoUrl.value,
    originAuthorMeta: {
      isForked: false,
      logs: [
        {
          name: userName.value,
          id: userId.value,
          photo: userPhotoUrl.value,
          url: `/code/${projectId}`
        }
      ]
    },
    dateCreated,
    code: {
      html: htmlCode.value,
      css: cssCode.value,
      js: jsCode.value
    }
  }
  if (isLoggedIn.value) {
    if (projectInfo.projectTitle) {
      if (htmlCode.value || cssCode.value || jsCode.value) {
        saveToDb('showcase', projectId, dataProject).then(() => {
          alert('Saved')
          if (route.params.id !== projectId) {
            router.replace(`/code/${projectId}`)
          }
        })
      } else {
        alert('Codes are empty, make at least one line code.')
      }
    } else {
      alert(`Title can't be empty`)
      return
    }
  } else {
    alert('To save your progress, please login.')
  }
}
const codeRunner = () => {
  const viewer = htmlViewerEl.value.contentWindow.document
  viewer.open()
  viewer.write(`<style>${cssCode.value}</style>${htmlCode.value}<script>${jsCode.value}<\/script>`)
  viewer.close()
}
const codeAreaCollapse = () => {
  const codePane = codePaneEl.value
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
  const codePane = codePaneEl.value
  const codeArea = codeAreaEl.value
  codePane.classList.remove('codePaneChangeViewHorizontal')
  codePane.classList.remove('codePaneHorizontalStatePos')
  codePane.classList.toggle('codePaneChangeViewVertical')
  codeArea.classList.remove('codeAreaOnHorizontalFlex')
}
const changeCodePositionHorizontalMode = () => {
  const codePane = codePaneEl.value
  const codeArea = codeAreaEl.value
  codePane.classList.remove('codePaneChangeViewVertical')
  codePane.classList.add('codePaneHorizontalStatePos')
  codePane.classList.toggle('codePaneChangeViewHorizontal')
  codeArea.classList.add('codeAreaOnHorizontalFlex')
}

const keyListener = (e) => {
  if (e.key === '.' && e.ctrlKey) {
    codeRunner()
  }
  if (e.ctrlKey && e.key === '0') {
    codeAreaCollapse()
  }
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault()
    codeSaver()
  }
}

onMounted(() => {
  codeAreaVerticalSplit = Split(['#html', '#css', '#js'], {
    minSize: [0, 0, 0],
    gutterSize: 4,
    direction: 'horizontal'
  })

  codeAreaSplit = Split(['.codeArea', '.codeViewer'], {
    direction: 'vertical',
    gutterSize: 4,
    minSize: 0
  })

  const collapseMenu = navButtons.collapseMenu
  const runner = navButtons.codeRunner
  const codePaneButtonVertical = navButtons.codePaneButtonVertical
  const codePaneButtonHorizontal = navButtons.codePaneButtonHorizontal
  const saveButton = navButtons.saveButton

  //Button listener
  collapseMenu.addEventListener('click', codeAreaCollapse)
  runner.addEventListener('click', codeRunner)
  codePaneButtonVertical.addEventListener('click', changeViewVertical)
  codePaneButtonHorizontal.addEventListener('click', changeViewHorizontal)
  saveButton.addEventListener('click', codeSaver)
  //Key listener
  document.addEventListener('keydown', keyListener)
  //after CodeView opened
  setTimeout(() => {
    codeRunner()
  }, 100)
})
onUnmounted(() => {
  const runner = navButtons.codeRunner
  const codePaneButtonVertical = navButtons.codePaneButtonVertical
  const codePaneButtonHorizontal = navButtons.codePaneButtonHorizontal
  const saveButton = navButtons.saveButton
  const collapseMenu = navButtons.collapseMenu

  collapseMenu.removeEventListener('click', codeAreaCollapse)
  runner.removeEventListener('click', codeRunner)
  codePaneButtonVertical.removeEventListener('click', changeViewVertical)
  codePaneButtonHorizontal.removeEventListener('click', changeViewHorizontal)
  saveButton.removeEventListener('click', codeSaver)
  document.removeEventListener('keydown', keyListener)
})
</script>
<template>
  <main>
    <div class="codePane" ref="codePaneEl">
      <div class="codeArea split" ref="codeAreaEl">
        <div id="html" class="htmlArea">
          <h3>
            <font-awesome-icon icon="fa-brands fa-html5" />
          </h3>
          <PrismEditor class="editorField" v-model="htmlCode" :highlight="html" line-numbers></PrismEditor>
        </div>
        <div id="css" class="cssArea">
          <h3>
            <font-awesome-icon icon="fa-brands fa-css3-alt" />
          </h3>
          <PrismEditor class="editorField" v-model="cssCode" :highlight="css" line-numbers></PrismEditor>
        </div>
        <div id="js" class="jsArea">
          <h3>
            <font-awesome-icon icon="fa-brands fa-js" />
          </h3>
          <PrismEditor class="editorField" v-model="jsCode" :highlight="javascript" line-numbers></PrismEditor>
        </div>
      </div>
      <div class="codeViewer">
        <iframe ref="htmlViewerEl" id="htmlViewer" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation"></iframe>
      </div>
    </div>
  </main>
</template>
<style scoped>
a {
  color: #aaa;
}
h3 {
  position: absolute;
  top: 0.4rem;
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
  padding: 2rem 0.6rem 1rem 0.5rem;
  box-sizing: border-box;
  border-radius: 0.3rem;
  width: 100%;
  overflow: hidden;
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
.editorField {
  color: #ccc;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}
.projectDetails {
  position: absolute;
  width: 100%;
  max-width: 26rem;
  height: 100vh;
  z-index: 30;
  right: 0;
  background-color: #222;
  color: #bbb;
  box-sizing: border-box;
  padding: 1rem;
  line-height: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.projectDetails img {
  width: 20px;
  height: 20px;
}
.projectDetails span {
  color: #444;
}
.title,
.author,
.created,
.isForked {
  margin-bottom: 1rem;
}
.projectDetails ul li {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.forkedLogs li {
  margin-bottom: 0.3rem;
}
</style>
