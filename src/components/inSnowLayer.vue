<script setup>
const flakes = Array.from({ length: 34 }, (_, index) => {
  const lane = index / 34
  const depth = index % 5
  const wobble = index % 2 === 0 ? 1 : -1

  return {
    id: index,
    left: `${(lane * 100 + index * 5.7) % 100}%`,
    duration: `${24 + (index % 9) * 2.8 + depth * 1.4}s`,
    delay: `${-1 * ((index * 2.35) % 36)}s`,
    size: `${0.8 + depth * 0.42}px`,
    opacity: 0.07 + depth * 0.024,
    drift: `${wobble * (2.2 + depth * 0.9)}vw`,
    blur: `${Math.max(0, depth - 2) * 0.42}px`,
    sway: `${wobble * (0.35 + depth * 0.16)}rem`,
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
        '--flake-blur': flake.blur,
        '--flake-sway': flake.sway,
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
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.94), rgba(0, 0, 0, 0.62) 58%, rgba(0, 0, 0, 0.24));
}

.snowLayer__flake {
  position: absolute;
  top: -8%;
  width: var(--flake-size);
  height: var(--flake-size);
  border-radius: 50%;
  background: rgba(237, 242, 246, var(--flake-opacity));
  box-shadow: 0 0 2px rgba(9, 16, 22, 0.16);
  filter: blur(var(--flake-blur));
  animation: snowfall var(--flake-duration) linear infinite;
  animation-delay: var(--flake-delay);
  will-change: transform;
}

@keyframes snowfall {
  0% {
    transform: translate3d(0, -8vh, 0) rotate(0deg);
  }

  28% {
    transform: translate3d(var(--flake-sway), 28vh, 0) rotate(40deg);
  }

  58% {
    transform: translate3d(calc(var(--flake-drift) * 0.58), 62vh, 0) rotate(92deg);
  }

  100% {
    transform: translate3d(var(--flake-drift), 112vh, 0) rotate(150deg);
  }
}

@media (max-width: 900px) {
  .snowLayer {
    opacity: 0.42;
  }
}

@media (max-width: 700px), (prefers-reduced-motion: reduce) {
  .snowLayer {
    display: none;
  }
}
</style>
