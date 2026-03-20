export type TMusicType = 'scale' | 'chord'

export type TInterval = {
  id: string
  name: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export type TScale = TInterval & {
  type: 'scale'
}

export type TChord = TInterval & {
  type: 'chord'
  suffix: string // e.g. "maj7", "m7", "7"
}
export type TPosition = {
  id: number
  label: string
  cagedShape?: 'C' | 'A' | 'G' | 'E' | 'D'
}
