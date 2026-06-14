<script setup>
const flakes = Array.from({ length: 24 }, (_, index) => {
  const lane = index / 24
  const wobble = index % 2 === 0 ? 1 : -1

  return {
    id: index,
    left: `${(lane * 100 + index * 6.1) % 100}%`,
    duration: `${22 + (index % 8) * 2.7}s`,
    delay: `${-1 * ((index * 2.15) % 30)}s`,
    size: `${1 + (index % 3) * 0.5}px`,
    opacity: 0.1 + (index % 4) * 0.025,
    drift: `${wobble * (2.5 + (index % 4) * 0.75)}vw`,
  }
})
</script>

<template>
  <div class="snowLayer" aria-hidden="true">
    <span
      v-for="flake in flakes"
      :key="flake.id"
      class="snowLayer__flake"
      :style="{
        left: flake.left,
        '--flake-duration': flake.duration,
        '--flake-delay': flake.delay,
        '--flake-size': flake.size,
        '--flake-opacity': flake.opacity,
        '--flake-drift': flake.drift,
      }"
    ></span>
  </div>
</template>

<style scoped lang="scss">
.snowLayer {
  position: fixed;
  inset: 0;
  z-index: 70;
  overflow: hidden;
  pointer-events: none;
}

.snowLayer__flake {
  position: absolute;
  top: -7%;
  width: var(--flake-size);
  height: var(--flake-size);
  border-radius: 50%;
  background: rgba(237, 242, 246, var(--flake-opacity));
  box-shadow: 0 0 1px rgba(9, 16, 22, 0.18);
  animation: snowfall var(--flake-duration) linear infinite;
  animation-delay: var(--flake-delay);
}

@keyframes snowfall {
  0% {
    transform: translate3d(0, -8vh, 0);
  }

  48% {
    transform: translate3d(calc(var(--flake-drift) * 0.46), 50vh, 0);
  }

  100% {
    transform: translate3d(var(--flake-drift), 112vh, 0);
  }
}

@media (max-width: 900px) {
  .snowLayer {
    opacity: 0.45;
  }
}

@media (max-width: 700px), (prefers-reduced-motion: reduce) {
  .snowLayer {
    display: none;
  }
}
</style>
