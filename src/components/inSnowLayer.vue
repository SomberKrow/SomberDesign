<script setup>
const flakes = Array.from({ length: 34 }, (_, index) => {
  const lane = index / 34
  const wobble = index % 2 === 0 ? 1 : -1

  return {
    id: index,
    left: `${(lane * 100 + (index * 7.3)) % 100}%`,
    duration: `${18 + (index % 9) * 2.4}s`,
    delay: `${-1 * ((index * 1.9) % 28)}s`,
    size: `${1 + (index % 4) * 0.55}px`,
    opacity: 0.12 + (index % 5) * 0.035,
    drift: `${wobble * (2.5 + (index % 5) * 0.8)}vw`,
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
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}

.snowLayer__flake {
  position: absolute;
  top: -7%;
  width: var(--flake-size);
  height: var(--flake-size);
  border-radius: 50%;
  background: rgba(237, 242, 246, var(--flake-opacity));
  filter: blur(0.2px);
  animation: snowfall var(--flake-duration) linear infinite;
  animation-delay: var(--flake-delay);
}

@keyframes snowfall {
  0% {
    transform: translate3d(0, -8vh, 0);
  }

  45% {
    transform: translate3d(calc(var(--flake-drift) * 0.45), 48vh, 0);
  }

  100% {
    transform: translate3d(var(--flake-drift), 112vh, 0);
  }
}

@media (max-width: 900px) {
  .snowLayer {
    opacity: 0.5;
  }
}

@media (max-width: 700px), (prefers-reduced-motion: reduce) {
  .snowLayer {
    display: none;
  }
}
</style>
