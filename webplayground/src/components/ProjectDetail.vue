<script setup>
defineProps({
  projectMeta: Object,
  projectLogs: Object
})
</script>
<template>
  <div class="projectDetails">
    <div class="title">
      <span>Project Title :</span>
      <p>{{ projectMeta.title }}</p>
    </div>
    <div class="author">
      <span>Project Author :</span>
      <p>{{ projectMeta.author }}</p>
    </div>
    <div class="created">
      <span>Created At :</span>
      <p>{{ projectMeta.created }}</p>
    </div>
    <div class="isForked">
      <span>Forked :</span>
      <p>{{ projectMeta.isForked }}</p>
    </div>
    <span>Forked Logs :</span>
    <ul class="forkedLogs">
      <li v-for="meta in projectLogs"><img :src="meta.photo" alt="" />{{ meta.name }} <a :href="meta.url"> >> </a></li>
    </ul>
  </div>
</template>
<style scoped>
a {
  color: #aaa;
}
.projectDetails {
  width: 100%;
  max-width: 26rem;
  height: 100vh;
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
