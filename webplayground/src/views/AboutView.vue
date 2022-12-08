<template>
  <div class="about">
    <h1>Hello World!</h1>
    <article>
      Welcome to Websdeck. I just wanted to create something with my text editor, so I created Websdeck, a CSS Playground. Websdeck is a low-budget project inspired by CSSDeck but in a lighter version. You will only find HTML, CSS,
      Javascript fields and a results panel. But so far, Websdeck is reliable enough to just play with CSS and JS.
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
</template>
<style scoped>
a {
  color: #fff;
}
.about {
  width: 100%;
  max-width: var(--maxwidthContainer);
  background-color: #111;
  margin: auto;
  color: #fff;
  font-weight: lighter;
  font-size: 1.3rem;
  box-sizing: border-box;
  padding: 1.5rem 5rem;
  min-height: var(--minheightContainer);
}
.about h1 {
  font-weight: bold;
  font-size: 2rem;
  padding: 2rem 0;
}
.about article {
  line-height: 2rem;
  margin-bottom: 3rem;
}
.socials {
  margin: 3rem 0;
}
.socials a {
  font-size: 1.5rem;
}
.socials ul {
  display: flex;
  gap: 1.5rem;
  flex-direction: row-reverse;
}
</style>
