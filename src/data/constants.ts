import type { TPosition } from './types'

export type TKey = (typeof KEYS)[number]
export const KEYS = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
] as const

export const POSITIONS: TPosition[] = [
  { id: 1, label: 'Position 1', cagedShape: 'E' },
  { id: 2, label: 'Position 2', cagedShape: 'D' },
  { id: 3, label: 'Position 3', cagedShape: 'C' },
  { id: 4, label: 'Position 4', cagedShape: 'A' },
  { id: 5, label: 'Position 5', cagedShape: 'G' },
]
