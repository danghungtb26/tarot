import { sizes } from '@configs'

const size = sizes.width / 2 / Math.sin(Math.PI / 3)

export const deg = 6
export const rCard = size * Math.sin((deg * Math.PI) / 3 / 60)

export const r = size + (rCard / 15) * 29

console.log('🚀 ~ file: defines.ts ~ line 7 ~ rCard', rCard)
