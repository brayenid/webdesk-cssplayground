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
        <RouterLink :to="`/code/${project.id}`">{{ project.title }} - {{ project.author }}</RouterLink>
      </h3>
    </div>
    <div class="writeCode">
      <a class="link" href="/code">Write One</a>
    </div>
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
h3 {
  text-align: left;
  border-bottom: 1px dotted rgba(0, 0, 0, 0.5);
  padding: 1rem 0;
}
.project {
  min-height: 30px;
  width: 100%;
}
.writeCode {
  margin-top: 1rem;
}
.writeCode a {
  background-color: rgb(23, 143, 143);
  padding: 0.5rem 1.5rem;
  color: #fff;
  border-radius: 0.3rem;
}
</style>
