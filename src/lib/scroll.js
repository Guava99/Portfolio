let lenis = null

export const setLenis = (instance) => {
  lenis = instance
}

export const getLenis = () => lenis

export function scrollToId(id) {
  const target = id === 'home' ? 0 : document.getElementById(id)
  if (target === null) return

  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4, offset: 0 })
  } else if (target === 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}
