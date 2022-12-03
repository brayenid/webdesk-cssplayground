<script setup>
import { ref } from 'vue'
import { collection, getDocs } from '@firebase/firestore'
import { onMounted } from 'vue'
import { db } from '../firebase'

const showcase = ref([])

onMounted(async () => {
  const getProjects = await getDocs(collection(db, 'showcase'))
  let projects = []
  getProjects.forEach((doc) => {
    const project = {
      id: doc.data().projectId,
      author: doc.data().projectAuthor,
      title: doc.data().projectTitle,
      code: {
        html: doc.data().code.html,
        css: doc.data().code.css,
        js: doc.data().code.js
      }
    }
    projects.push(project)
  })
  showcase.value = projects
})
</script>
<template>
  <main>
    <h2>Showcase</h2>
    <div class="project" v-for="project in showcase">
      <h3>
        <a :href="`/code/${project.id}`">{{ project.title }}</a>
      </h3>
    </div>
    <div class="writeCode">
      <a class="link" href="/code">Write One</a>
    </div>
  </main>
</template>
<style scoped>
main {
  background-color: #333;
  max-width: 800px;
  margin: 1rem auto 0;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  text-align: center;
}
h2 {
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.4rem;
  font-weight: 700;
}
.link {
  color: #fff;
  padding: 0.5rem 1.5rem;
  background-color: rgb(47, 146, 113);
  border-radius: 0.2rem;
  display: block;
}
.project {
  min-height: 30px;
  width: 100%;
  background-color: blanchedalmond;
}
.writeCode {
  margin-top: 1rem;
}
</style>
