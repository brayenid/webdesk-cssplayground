<script setup>
import EyesLoading from '../components/EyesLoading.vue'
import LoadModal from '../components/LoadModal.vue'
import { onMounted, ref, onUnmounted, computed } from 'vue'
import { collection, query, limit, getDocs, getCountFromServer, orderBy, where } from '@firebase/firestore'
import { db } from '../firebase'
import { RouterLink } from 'vue-router'
import { useAuthState } from '../stores/auth'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { useLoadButton } from '../stores/project'

const showcase = ref([])
const sortByDate = ref('desc')
const projectByUserId = ref([])
const isLoading = ref(true)
const limitPost = ref(8)
const isReachFullPosts = ref(false)
const isShowLoader = ref(false)
const getDatabaseLength = collection(db, 'showcase')
const isShowModalLoad = ref(false)
let databaseLength

const getDatas = async (number, sortBy) => {
  let data = []
  const q = query(collection(db, 'showcase'), limit(number), orderBy('dateCreated', sortBy))
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
const addLimit = ({ limitNumber, sortByDate }) => {
  limitPost.value += limitNumber
  getDatas(limitPost.value, sortByDate)
  if (limitPost.value >= databaseLength) {
    isReachFullPosts.value = true
  }
}
const getProjectByUserId = async (userId) => {
  let data = []
  const q = query(collection(db, 'showcase'), where('projectAuthorId', '==', userId), orderBy('dateCreated', 'desc'))
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
  getDatas(limitPost.value, sortByDate.value).then(() => {
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
    <div class="sorter">
      <label for="sorter">Sort By Date :</label>
      <select v-model="sortByDate" id="sorter" @change="getDatas(limitPost, sortByDate)">
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
    <Teleport to="body">
      <LoadModal v-show="isShowModalLoad" :data="projectByUserId" :is-any-project="isAnyProject" title="Load Your Projects" />
    </Teleport>
    <div v-show="isLoading" class="loading">
      <EyesLoading />
    </div>
    <div class="project" v-for="project in showcase" :key="project.id">
      <div class="projectItem">
        <div class="authorProfilePhoto">
          <RouterLink :to="`/code/${project.id}`"><img :src="project.authorPhoto" :alt="project.author" /></RouterLink>
        </div>
        <div class="projectTitle">
          <RouterLink :to="`/code/${project.id}`">{{ project.title }}</RouterLink>
          <span title="Forked" class="isForked" v-show="project.isForked"><font-awesome-icon icon="fa-solid fa-code-fork" /></span>
          <p>{{ project.author }}</p>
        </div>
      </div>
    </div>
    <button @click="addLimit({ limitNumber: 8, sortByDate: sortByDate })" v-if="!isReachFullPosts && isShowLoader" class="load">Load</button>
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
  color: #eee;
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
  color: #ddd;
}
.projectTitle a:hover {
  color: #fff;
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
.sorter {
  margin: 1.5rem 0;
  text-align: right;
  color: #aaa;
  font-size: 0.8rem;
}
.sorter select {
  background-color: #222;
  border: 1px solid #111;
  color: #aaa;
  padding: 0.3rem;
  border-radius: 0.3rem;
}
.sorter label {
  margin-right: 1rem;
}
</style>
