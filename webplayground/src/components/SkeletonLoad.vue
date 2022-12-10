<template>
  <div v-for="i in 8" :key="i" class="skeleton">
    <div class="skeletonImg"></div>
    <div class="titleAndAuthorSkeleton">
      <div class="titleSkeleton"></div>
      <div class="authorSkeleton"></div>
    </div>
  </div>
</template>
<style scoped>
.skeleton * {
  border-radius: 0.3rem;
}
.skeleton {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.3rem;
  width: 100%;
}
.skeletonImg {
  background-color: #333;
  width: 45px;
  height: 45px;
}
.titleAndAuthorSkeleton {
  height: 45px;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 100%;
}
.titleSkeleton {
  background-color: #333;
  height: 49%;
  width: 100%;
  max-width: 250px;
}
.skeleton:nth-child(2n + 1) .titleSkeleton {
  max-width: 390px;
}
.skeleton:nth-child(3n + 2) .titleSkeleton {
  max-width: 300px;
}

.authorSkeleton {
  background-color: #333;
  height: 49%;
  width: 100px;
}
</style>
