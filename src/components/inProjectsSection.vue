<script setup>
import { projectsData } from '../data/inProjectsData'
import inProjectCard from './inProjectCard.vue'
</script>

<template>
  <section class="projectsSection">
    <div class="shell-grid projectsSection__inner">
      <header class="projectsSection__intro">
        <p class="kicker">Portfolio</p>
        <h2 class="section-title">Websites, tools, and projects I’ve worked on.</h2>
        <p class="section-body">
          Some are finished client or creator sites. Others are active personal projects, prototypes, or experiments.
        </p>
      </header>

      <p class="projectsSection__count" aria-label="Number of listed projects">{{ projectsData.length }} projects</p>

      <div class="projectsSection__rail">
        <inProjectCard v-for="project in projectsData" :key="project.title" :project="project" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.projectsSection {
  padding: var(--section-pad-y) 0;
}

.projectsSection__inner {
  align-items: end;
}

.projectsSection__intro {
  grid-column: 1 / span 8;
  display: grid;
  gap: 1rem;
}

.projectsSection__count {
  grid-column: 10 / -1;
  justify-self: end;
  color: var(--color-ink-muted);
  font-family: var(--font-mono);
  font-size: 0.64rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.projectsSection__rail {
  grid-column: 1 / -1;
  display: grid;
  gap: 0.75rem;
  margin-top: 0.4rem;
}

@media (max-width: 900px) {
  .projectsSection__intro,
  .projectsSection__count {
    grid-column: 1 / -1;
    justify-self: start;
  }
}
</style>
