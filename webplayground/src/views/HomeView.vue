<script setup>
import { onMounted, ref } from 'vue'
import { collection, query, limit, getDocs, getCountFromServer, orderBy } from '@firebase/firestore'
import { db } from '../firebase'
import EyesLoading from '../components/EyesLoading.vue'
import { useAuthState } from '../stores/auth'

const showcase = ref([])
const isLoading = ref(true)
const limitPost = ref(4)
const isReachFullPosts = ref(false)
const isShowLoader = ref(false)
const getDatabaseLength = collection(db, 'showcase')
let databaseLength

const getDatas = async (number) => {
  let data = []
  const q = query(collection(db, 'showcase'), limit(number), orderBy('dateCreated', 'desc'))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    const { projectId, projectAuthor, projectTitle, projectAuthorPhoto, code } = doc.data()
    const project = {
      id: projectId,
      author: projectAuthor,
      title: projectTitle,
      authorPhoto: projectAuthorPhoto,
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
  console.log(limitPost.value, databaseLength)
  if (limitPost.value >= databaseLength) {
    console.log('reached')
    isReachFullPosts.value = true
  }
}
onMounted(() => {
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
</script>
<template>
  <main>
    <h2>Showcase</h2>
    <div v-show="isLoading" class="loading">
      <EyesLoading />
    </div>
    <div class="project" v-for="project in showcase">
      <div class="projectItem">
        <div class="authorProfilePhoto">
          <a :href="`/code/${project.id}`"><img :src="project.authorPhoto" :alt="project.author" /></a>
        </div>
        <div class="projectTitle">
          <a :href="`/code/${project.id}`"
            ><h3>{{ project.title }}</h3></a
          >
          <p>{{ project.author }}</p>
        </div>
      </div>
    </div>
    <button @click="addLimit({ limitNumber: 4 })" v-if="!isReachFullPosts && isShowLoader" class="load">Load</button>
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
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  text-align: center;
}
h2 {
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
}
.projectTitle {
  text-align: left;
  border-bottom: 1px dotted #222;
  width: 100%;
  color: white;
}
.projectTitle h3 {
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  font-weight: 500;
}
.projectTitle p {
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
</style>
