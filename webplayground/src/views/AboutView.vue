<template>
  <div class="container">
    <div class="about">
      <h1>Hello World!</h1>
      <article>
        Welcome to Websdeck. I just wanted to create something with my text editor, so I created Websdeck, a CSS Playground. Websdeck is a simple project inspired by CSSDeck but in a lighter version. You will only find HTML, CSS, Javascript
        fields and a results panel. But so far, Websdeck is reliable enough to just play with CSS and JS.
      </article>
      <div class="socials">
        <ul>
          <li>
            <a href="https://github.com/brayenid" target="_blank" rel="nofollow"><font-awesome-icon icon="fa-brands fa-github" /></a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/brayenluhat/" target="_blank" rel="nofollow"><font-awesome-icon icon="fa-brands fa-linkedin" /></a>
          </li>
          <li>
            <a target="_blank" href="https://brayenluhat.xyz"><font-awesome-icon icon="fa-solid fa-globe" /></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
a {
  color: #fff;
}
.container {
  background-color: #111;
  padding: 3rem;
}
.about {
  max-width: 700px;
  margin: auto;
  color: #fff;
  font-weight: lighter;
  font-size: 1.5rem;
  line-height: 2rem;
}
.about h1 {
  font-weight: bold;
  font-size: 2rem;
  padding: 2rem 0;
}

.socials {
  margin: 3rem 0;
}
.socials ul {
  display: flex;
  gap: 1rem;
  flex-direction: row-reverse;
}
</style>
