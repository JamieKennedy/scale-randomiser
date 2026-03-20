import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '#/components/ui/collapsible'
import { RadioGroup, RadioGroupItem } from '#/components/ui/radio-group'
import { KEYS, POSITIONS } from '#/data/constants'
import type { Dispatch, SetStateAction } from 'react'

import { Button } from '#/components/ui/button'
import { Label } from '#/components/ui/label'
import { Separator } from '#/components/ui/separator'
import { CHORDS } from '#/data/chords'
import { SCALES } from '#/data/scales'
import type { TMusicType } from '#/data/types'
import type { PracticeSettings } from '#/lib/randomiser'
import { useForm } from '@tanstack/react-form'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface ISettingsPanelProps {
  value: PracticeSettings
  onChange: Dispatch<SetStateAction<PracticeSettings>>
  onGenerate: () => void
}

const toggleInArray = <T,>(value: T, values: T[]) => {
  if (values.includes(value)) {
    return values.filter((currentValue) => currentValue !== value)
  }

  return [...values, value]
}

const getToggleButtonClassName = (isActive: boolean) =>
  isActive
    ? 'border-primary bg-background text-foreground ring-2 ring-primary/30 hover:bg-accent hover:text-accent-foreground dark:border-primary dark:bg-input/30 dark:text-foreground dark:hover:bg-input/50 dark:hover:text-foreground'
    : 'border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:text-foreground dark:hover:bg-input/50 dark:hover:text-foreground'

export const SettingsPanel = ({
  value,
  onChange,
  onGenerate,
}: ISettingsPanelProps) => {
  const [isOpen, setIsOpen] = useState(true)

  const form = useForm({
    defaultValues: value,
  })

  return (
    <Collapsible
      defaultOpen
      open={isOpen}
      onOpenChange={setIsOpen}
      className="mb-4 w-full"
    >
      <Card className="w-full gap-2 rounded-2xl bg-background">
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
          <div className="space-y-1">
            <CardTitle className="text-xl tracking-tight">
              Challenge Settings
            </CardTitle>
            <CardDescription>
              Choose type, positions, keys, and scale/chord options.
            </CardDescription>
          </div>
          <CollapsibleTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-expanded={isOpen}
              aria-label={
                isOpen ? 'Collapse settings panel' : 'Expand settings panel'
              }
              className="gap-1.5"
            >
              {isOpen ? 'Hide' : 'Show'}
              <ChevronDown
                className={`size-4 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </Button>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <Separator />
          <CardContent className="space-y-6">
            <form.Field name="type">
              {(typeField) => {
                const selectedType = typeField.state.value

                return (
                  <>
                    <div className="space-y-3 mt-2">
                      <RadioGroup
                        value={selectedType}
                        onValueChange={(nextValue) => {
                          const nextType = nextValue as TMusicType
                          typeField.handleChange(nextType)
                          onChange((previousValue) => ({
                            ...previousValue,
                            type: nextType,
                          }))
                        }}
                        className="flex items-center gap-6"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="scale" id="type-scale" />
                          <Label htmlFor="type-scale">Scale</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="chord" id="type-chord" />
                          <Label htmlFor="type-chord">Chord</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <form.Field name="selectedPositions">
                      {(field) => (
                        <div className="space-y-3">
                          <Label>Positions</Label>
                          <div className="flex flex-wrap gap-2">
                            {POSITIONS.map((position) => {
                              const isActive = field.state.value.includes(
                                position.id,
                              )

                              return (
                                <Button
                                  key={position.id}
                                  type="button"
                                  variant="outline"
                                  className={getToggleButtonClassName(isActive)}
                                  size="sm"
                                  onClick={() => {
                                    const nextPositions = toggleInArray(
                                      position.id,
                                      field.state.value,
                                    )

                                    field.handleChange(nextPositions)
                                    onChange((previousValue) => ({
                                      ...previousValue,
                                      selectedPositions: nextPositions,
                                    }))
                                  }}
                                >
                                  {position.label}
                                </Button>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </form.Field>

                    <form.Field name="selectedKeys">
                      {(field) => (
                        <div className="space-y-3">
                          <Label>Keys</Label>
                          <div className="flex flex-wrap gap-2">
                            {KEYS.map((key) => {
                              const isActive = field.state.value.includes(key)

                              return (
                                <Button
                                  key={key}
                                  type="button"
                                  variant="outline"
                                  className={getToggleButtonClassName(isActive)}
                                  size="sm"
                                  onClick={() => {
                                    const nextKeys = toggleInArray(
                                      key,
                                      field.state.value,
                                    )

                                    field.handleChange(nextKeys)
                                    onChange((previousValue) => ({
                                      ...previousValue,
                                      selectedKeys: nextKeys,
                                    }))
                                  }}
                                >
                                  {key}
                                </Button>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </form.Field>

                    {selectedType === 'scale' ? (
                      <form.Field name="selectedScaleIds">
                        {(field) => (
                          <div className="space-y-3">
                            <Label>Scales</Label>
                            <div className="flex flex-wrap gap-2">
                              {SCALES.map((scale) => {
                                const isActive = field.state.value.includes(
                                  scale.id,
                                )

                                return (
                                  <Button
                                    key={scale.id}
                                    type="button"
                                    variant="outline"
                                    className={getToggleButtonClassName(
                                      isActive,
                                    )}
                                    size="sm"
                                    onClick={() => {
                                      const nextScaleIds = toggleInArray(
                                        scale.id,
                                        field.state.value,
                                      )

                                      field.handleChange(nextScaleIds)
                                      onChange((previousValue) => ({
                                        ...previousValue,
                                        selectedScaleIds: nextScaleIds,
                                      }))
                                    }}
                                  >
                                    {scale.name}
                                  </Button>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </form.Field>
                    ) : (
                      <form.Field name="selectedChordIds">
                        {(field) => (
                          <div className="space-y-3">
                            <Label>Chords</Label>
                            <div className="flex flex-wrap gap-2">
                              {CHORDS.map((chord) => {
                                const isActive = field.state.value.includes(
                                  chord.id,
                                )

                                return (
                                  <Button
                                    key={chord.id}
                                    type="button"
                                    variant="outline"
                                    className={getToggleButtonClassName(
                                      isActive,
                                    )}
                                    size="sm"
                                    onClick={() => {
                                      const nextChordIds = toggleInArray(
                                        chord.id,
                                        field.state.value,
                                      )

                                      field.handleChange(nextChordIds)
                                      onChange((previousValue) => ({
                                        ...previousValue,
                                        selectedChordIds: nextChordIds,
                                      }))
                                    }}
                                  >
                                    {chord.name}
                                  </Button>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </form.Field>
                    )}
                  </>
                )
              }}
            </form.Field>
          </CardContent>
        </CollapsibleContent>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex justify-end">
            <Button type="button" onClick={onGenerate} className="min-w-44">
              Generate Challenge
            </Button>
          </div>
        </CardContent>
      </Card>
    </Collapsible>
  )
}
