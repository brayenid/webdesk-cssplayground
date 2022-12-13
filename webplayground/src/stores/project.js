import { defineStore } from 'pinia'

export const useProjectInfo = defineStore('project', {
  state: () => {
    return {
      projectTitle: null
    }
  }
})

export const useNavButton = defineStore('button', {
  state: () => {
    return {
      codeRunner: null,
      collapseMenu: null,
      codePaneButtonVertical: null,
      codePaneButtonHorizontal: null,
      saveButton: null,
      deleteButton: null,
      forkButton: null,
      detailButton: null,
      buttonArea: null,
      loadProgress: null
    }
  }
})

export const useLoadButton = defineStore('loadbutton', {
  state: () => {
    return {
      loadProgress: null
    }
  }
})
