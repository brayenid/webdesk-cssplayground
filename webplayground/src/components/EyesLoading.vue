<template>
  <div class="loading">
    <div class="eye">
      <div class="pupil"></div>
    </div>
    <div class="eye">
      <div class="pupil"></div>
    </div>
  </div>
</template>
<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
}
.eye {
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.2);
}
.pupil {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #333;
  animation: pupilMoves 7s infinite;
}
@keyframes pupilMoves {
  0% {
    transform: translateX(0);
  }
  9% {
    transform: translateX(0);
  }
  10% {
    transform: translateX(0.3rem);
  }
  26% {
    transform: translateX(0.3rem);
  }
  27% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(0);
  }
  51% {
    transform: translateY(0.3rem);
  }
  62% {
    transform: translateY(0.3rem);
  }
  63% {
    transform: translateY(0);
  }
  70% {
    transform: translate(0);
  }
  72% {
    transform: translate(0.3rem, -0.3rem);
  }
  79% {
    transform: translate(0.3rem, -0.3rem);
  }
  86% {
    transform: translate(0.3rem, -0.3rem);
  }
  90% {
    transform: translate(-0.3rem, -0.3rem);
  }
  95% {
    transform: translate(0.3rem, -0.3rem);
  }
  98% {
    transform: translate(0);
  }
}
</style>
