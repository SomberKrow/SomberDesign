<script setup>
import { projectsData } from '../data/inProjectsData'
import inProjectCard from './inProjectCard.vue'
</script>

<template>
  <section class="projectsSection">
    <div class="shell-grid projectsSection__inner">
      <header class="projectsSection__header">
        <div>
          <p class="kicker">Selected Projects</p>
          <h2>Websites, tools, and ongoing builds.</h2>
        </div>
        <p>
          Finished client work, creator sites, personal projects, and prototypes collected in one place.
        </p>
      </header>

      <div class="projectsSection__bar">
        <span>{{ projectsData.length }} projects</span>
        <a href="#contact">Discuss a project →</a>
      </div>

      <div class="projectsSection__grid">
        <inProjectCard
          v-for="(project, index) in projectsData"
          :key="project.title"
          :project="project"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.projectsSection {
  border-bottom: 1px solid var(--color-line);
  background:
    linear-gradient(180deg, rgba(166, 186, 199, 0.025), transparent 32%),
    var(--color-bg);
  color: var(--color-ink);
}

.projectsSection__inner {
  padding-block: var(--section-pad-y);
}

.projectsSection__header {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(260px, 0.7fr);
  gap: 2rem;
  align-items: end;
}

.projectsSection__header h2 {
  max-width: 16ch;
  margin-top: 0.85rem;
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.7vw, 3.8rem);
  font-weight: 600;
  letter-spacing: -0.05em;
  line-height: 0.98;
}

.projectsSection__header > p {
  max-width: 46ch;
  justify-self: end;
  color: var(--color-ink-dim);
  font-size: 0.9rem;
  line-height: 1.68;
}

.projectsSection__bar {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.75rem;
  padding-block: 0.75rem;
  border-top: 1px solid var(--color-line);
  border-bottom: 1px solid var(--color-line);
  color: var(--color-ink-muted);
  font-family: var(--font-mono);
  font-size: 0.57rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.projectsSection__bar a {
  color: var(--color-accent);
}

.projectsSection__grid {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
  margin-top: 0.9rem;
}

@media (max-width: 1100px) {
  .projectsSection__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .projectsSection__header {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .projectsSection__header > p {
    justify-self: start;
  }

  .projectsSection__grid {
    grid-template-columns: 1fr;
  }
}
