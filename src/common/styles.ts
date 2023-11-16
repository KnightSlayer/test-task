import { css } from '@emotion/react'

const breakpoints = [1200]

export const [desktopMediaQuery] = breakpoints.map(bp => `@media (min-width: ${bp}px)`)

export const colors = {
  pink: "#FF006B"
}