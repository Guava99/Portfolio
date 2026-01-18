/**
 * SVG displacement filters used by `.lg--liquid` / `.lg--live` as a
 * backdrop-filter. Only applied in Chromium (see main.jsx) — other
 * browsers fall back to the plain frosted blur.
 */
export default function GlassFilters() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="lg-distort" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="2" seed="11" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2.5" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="48" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="lg-distort-live" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.014" numOctaves="2" seed="4" result="noise">
            <animate
              attributeName="baseFrequency"
              dur="14s"
              values="0.010 0.014;0.016 0.009;0.010 0.014"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="90" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}
