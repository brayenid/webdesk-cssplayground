<script setup>
import { onMounted, ref, onUnmounted, computed } from 'vue'
import { collection, query, limit, getDocs, getCountFromServer, orderBy, where } from '@firebase/firestore'
import { db } from '../firebase'
import EyesLoading from '../components/EyesLoading.vue'
import { RouterLink } from 'vue-router'
import { useAuthState } from '../stores/auth'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { useLoadButton } from '../stores/project'

const showcase = ref([])
const projectByUserId = ref([])
const isLoading = ref(true)
const limitPost = ref(8)
const isReachFullPosts = ref(false)
const isShowLoader = ref(false)
const getDatabaseLength = collection(db, 'showcase')
const isShowModalLoad = ref(false)
let databaseLength

const getDatas = async (number) => {
  let data = []
  const q = query(collection(db, 'showcase'), limit(number), orderBy('dateCreated', 'desc'))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    const { projectId, projectAuthor, projectTitle, projectAuthorPhoto, originAuthorMeta, code } = doc.data()
    const project = {
      id: projectId,
      author: projectAuthor,
      title: projectTitle,
      authorPhoto: projectAuthorPhoto,
      isForked: originAuthorMeta.isForked,
      code: {
        html: code.html,
        css: code.css,
        js: code.js
      }
    }
    data.push(project)
  })
  showcase.value = data
}
const addLimit = ({ limitNumber }) => {
  limitPost.value += limitNumber
  getDatas(limitPost.value)
  if (limitPost.value >= databaseLength) {
    isReachFullPosts.value = true
  }
}
const getProjectByUserId = async (userId) => {
  let data = []
  const q = query(collection(db, 'showcase'), where('projectAuthorId', '==', userId))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((project) => {
    data.push(project.data())
  })
  projectByUserId.value = data
}
const openModal = () => {
  isShowModalLoad.value = !isShowModalLoad.value
}
const closeModal = (e) => {
  if (!e.target.closest('.contents') && isShowModalLoad.value && !e.target.closest('.loadButton')) {
    isShowModalLoad.value = false
  }
}
const isAnyProject = computed(() => {
  return projectByUserId.value.length < 1
})
console.log(isAnyProject.value)
onMounted(() => {
  const loadButton = useLoadButton().loadProgress
  loadButton.addEventListener('click', openModal)
  document.addEventListener('click', closeModal)
  onAuthStateChanged(getAuth(), () => {
    getProjectByUserId(useAuthState().userId)
  })
  getCountFromServer(getDatabaseLength).then((res) => {
    databaseLength = res.data().count
    if (limitPost.value >= databaseLength) {
      isReachFullPosts.value = true
    }
  })

  getDatas(limitPost.value).then(() => {
    isShowLoader.value = true
    isLoading.value = false
  })
})
onUnmounted(() => {
  const loadButton = useLoadButton().loadProgress
  loadButton.removeEventListener('click', openModal)
  document.removeEventListener('click', closeModal)
})
</script>
<template>
  <main>
    <h2>Showcase</h2>
    <Teleport to="body">
      <div v-show="isShowModalLoad" class="loadProjects">
        <div class="contents">
          <h3 v-if="!isAnyProject">Load Your Projects :</h3>
          <ol class="list">
            <li v-for="item in projectByUserId" :key="item">
              <div class="liCon">
                <font-awesome-icon icon="fa-solid fa-file" />
              </div>
              <RouterLink :to="`/code/${item.projectId}`">{{ item.projectTitle }}</RouterLink>
            </li>
            <div class="noProjectLoad" v-if="isAnyProject">
              <p>No Project Found</p>
              <p class="link"><RouterLink to="/code">Make One!</RouterLink></p>
            </div>
          </ol>
        </div>
      </div>
    </Teleport>
    <div v-show="isLoading" class="loading">
      <EyesLoading />
    </div>
    <div class="project" v-for="project in showcase">
      <div class="projectItem">
        <div class="authorProfilePhoto">
          <a :href="`/code/${project.id}`"><img :src="project.authorPhoto" :alt="project.author" /></a>
        </div>
        <div class="projectTitle">
          <RouterLink :to="`/code/${project.id}`">{{ project.title }}</RouterLink>
          <span title="Forked" class="isForked" v-show="project.isForked"><font-awesome-icon icon="fa-solid fa-code-fork" /></span>
          <p>{{ project.author }}</p>
        </div>
      </div>
    </div>
    <button @click="addLimit({ limitNumber: 8 })" v-if="!isReachFullPosts && isShowLoader" class="load">Load</button>
  </main>
</template>
<style scoped>
a {
  color: #fff;
}
a:focus {
  color: #fff;
}
main {
  background-color: #111;
  padding: 1rem;
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  max-width: var(--maxwidthContainer);
  margin: auto;
  min-height: var(--minheightContainer);
  overflow: hidden;
}
h2 {
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
  margin: 1rem 0 3rem;
  font-weight: 700;
}
.projectTitle {
  text-align: left;
  border-bottom: 1px dotted #222;
  width: 100%;
  color: white;
}
.projectTitle a {
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
  font-weight: 500;
  line-height: 1.3rem;
}
.projectTitle p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: #bbb;
}
.project {
  min-height: 30px;
  width: 100%;
  margin-bottom: 1rem;
  font-weight: lighter;
}
.loading {
  width: 100%;
}
.projectItem {
  display: flex;
  width: 100%;
  gap: 1rem;
}
.authorProfilePhoto img {
  width: 45px;
  height: 45px;
  border-radius: 0.3rem;
}
.load {
  background-color: transparent;
  border: 1px solid #333;
  color: #666;
  cursor: pointer;
  padding: 0.3rem 1rem;
  border-radius: 0.2rem;
}
.load:hover {
  color: #eee;
}
.isForked {
  margin-left: 1rem;
  color: rgb(12, 110, 195);
}
.root {
  position: relative;
}
.loadProjects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}
.loadProjects .contents {
  background-color: #222;
  padding: 2rem;
  border-radius: 0.3rem;
}
.loadProjects .contents h3 {
  margin-bottom: 2rem;
  color: #aaa;
}
.loadProjects .list {
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
  line-height: 2rem;
}
.loadProjects .list li {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.2rem;
}
.loadProjects .list li:last-child {
  border-bottom: none;
}
.loadProjects .list li a {
  color: #ddd;
}
.loadProjects .list li a:hover {
  color: #fff;
}
.liCon {
  color: #666;
}
.noProjectLoad {
  text-align: center;
  color: #aaa;
  font-size: 0.9rem;
}
.noProjectLoad a {
  background-color: #333;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
}
.noProjectLoad .link {
  margin-top: 0.5rem;
}
@media screen and (min-width: 700px) {
  .loadProjects .list {
    width: 500px;
    box-sizing: border-box;
    line-height: 2rem;
  }
}
</style>
