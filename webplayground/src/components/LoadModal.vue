<script setup>
defineProps({
  title: String,
  data: Object,
  isAnyProject: Boolean
})
</script>
<template>
  <div class="loadProjects">
    <div class="contents">
      <h3 v-if="!isAnyProject">{{ title }}</h3>
      <ol class="list">
        <li v-for="item in data" :key="item">
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
</template>
<style scoped>
a {
  color: #eee;
}
a:hover {
  color: #fff;
}
.loadProjects {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
}
.loadProjects .contents {
  background-color: #222;
  padding: 2rem;
  border-radius: 0.3rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
}
.loadProjects .contents h3 {
  margin-bottom: 2rem;
  color: #aaa;
}
.loadProjects .list {
  width: 100%;
  min-width: 250px;
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
