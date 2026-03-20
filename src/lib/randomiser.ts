import type { TMusicType, TPosition } from '../data/types'

import { CHORDS } from '../data/chords'
import type { TKey } from '../data/constants'
import { POSITIONS } from '../data/constants'
import { SCALES } from '../data/scales'

// Define what the user has "checked" in the UI
export interface PracticeSettings {
  type: TMusicType
  selectedKeys: TKey[]
  selectedPositions: number[] // Array of IDs (1-5)
  selectedScaleIds: string[]
  selectedChordIds: string[]
}

export interface Challenge {
  title: string
  key: TKey
  position: TPosition
  type: TMusicType
}

/**
 * Helper to grab a random item from an array
 */
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

const isSameChallenge = (a: Challenge, b: Challenge) => {
  return (
    a.type === b.type &&
    a.key === b.key &&
    a.position.id === b.position.id &&
    a.title === b.title
  )
}

/**
 * Generate a challenge based on selected music type
 */
export const generateChallenge = (
  settings: PracticeSettings,
  previousChallenge?: Challenge | null,
): Challenge | null => {
  const {
    type,
    selectedKeys,
    selectedPositions,
    selectedScaleIds,
    selectedChordIds,
  } = settings

  const availablePositions = POSITIONS.filter((p) =>
    selectedPositions.includes(p.id),
  )

  if (!selectedKeys.length || !availablePositions.length) {
    return null
  }

  if (type === 'scale') {
    const availableScales = SCALES.filter((s) =>
      selectedScaleIds.includes(s.id),
    )

    if (!availableScales.length) {
      return null
    }

    const allChallenges: Challenge[] = selectedKeys.flatMap((key) =>
      availablePositions.flatMap((position) =>
        availableScales.map((scale) => ({
          title: `${key} ${scale.name}`,
          key,
          position,
          type: 'scale' as const,
        })),
      ),
    )

    const candidateChallenges =
      previousChallenge && allChallenges.length > 1
        ? allChallenges.filter(
            (challenge) => !isSameChallenge(challenge, previousChallenge),
          )
        : allChallenges

    return getRandomElement(candidateChallenges)
  }

  const availableChords = CHORDS.filter((c) => selectedChordIds.includes(c.id))

  if (!availableChords.length) {
    return null
  }

  const allChallenges: Challenge[] = selectedKeys.flatMap((key) =>
    availablePositions.flatMap((position) =>
      availableChords.map((chord) => ({
        title: `${key}${chord.suffix}`,
        key,
        position,
        type: 'chord' as const,
      })),
    ),
  )

  const candidateChallenges =
    previousChallenge && allChallenges.length > 1
      ? allChallenges.filter(
          (challenge) => !isSameChallenge(challenge, previousChallenge),
        )
      : allChallenges

  return getRandomElement(candidateChallenges)
}
