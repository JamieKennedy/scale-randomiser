import * as randomiser from '#/lib/randomiser'

import { Card, CardContent } from '#/components/ui/card'
import { KEYS, POSITIONS } from '#/data/constants'

import { CHORDS } from '#/data/chords'
import { SCALES } from '#/data/scales'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { SettingsPanel } from './_components/-SettingsPanel'

const App = () => {
  const [challenge, setChallenge] = useState<randomiser.Challenge | null>(null)
  const [settings, setSettings] = useState<randomiser.PracticeSettings>({
    type: 'scale',
    selectedKeys: [...KEYS],
    selectedPositions: POSITIONS.map((p) => p.id),
    selectedScaleIds: SCALES.map((s) => s.id),
    selectedChordIds: CHORDS.map((c) => c.id),
  })

  const handleGenerate = () => {
    const newChallenge = randomiser.generateChallenge(settings, challenge)

    if (newChallenge) {
      setChallenge(newChallenge)
    } else {
      alert(
        'Please select at least one key, position, and scale/chord type in the settings.',
      )
    }
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-8 pt-4">
      <p className="mb-4">
        This is a tool to help guitarists practice scales and chords in a more
        randomised way. It generates random combinations of keys, positions, and
        scale/chord types based on your preferences.
      </p>
      <p className="mb-4">
        Use the settings panel to select which keys, positions, and
        scales/chords you want to include in the randomisation. Then click the
        "Generate Challenge" button to get a new practice challenge each time.
      </p>
      <SettingsPanel
        value={settings}
        onChange={setSettings}
        onGenerate={handleGenerate}
      />

      {challenge && (
        <Card className="mt-6 w-full rounded-2xl">
          <CardContent className="flex flex-col items-center py-12 text-center">
            <h2 className="text-5xl font-bold tracking-tight sm:text-6xl">
              {challenge.title}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Position {challenge.position.id}
            </p>
          </CardContent>
        </Card>
      )}
    </main>
  )
}

export const Route = createFileRoute('/')({ component: App })
