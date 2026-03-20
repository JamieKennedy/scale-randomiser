import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Switch } from '#/components/ui/switch'

type ThemeMode = 'light' | 'dark' | 'auto'

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'auto'
  }

  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark' || stored === 'auto') {
    return stored
  }

  return 'auto'
}

function applyThemeMode(mode: ThemeMode) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const resolved = mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode

  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(resolved)

  if (mode === 'auto') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', mode)
  }

  document.documentElement.style.colorScheme = resolved
}

function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'auto') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  return mode
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('auto')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const initialMode = getInitialMode()
    const resolved = resolveTheme(initialMode)
    setMode(initialMode)
    setIsDark(resolved === 'dark')
    applyThemeMode(initialMode)
  }, [])

  useEffect(() => {
    if (mode !== 'auto') {
      return
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      setIsDark(media.matches)
      applyThemeMode('auto')
    }

    media.addEventListener('change', onChange)
    return () => {
      media.removeEventListener('change', onChange)
    }
  }, [mode])

  function toggleMode(checked: boolean) {
    const nextMode: ThemeMode = checked ? 'dark' : 'light'
    setMode(nextMode)
    setIsDark(checked)
    applyThemeMode(nextMode)
    window.localStorage.setItem('theme', nextMode)
  }

  const label = isDark
    ? 'Theme mode: dark. Toggle to switch to light mode.'
    : 'Theme mode: light. Toggle to switch to dark mode.'

  return (
    <div className="inline-flex items-center gap-2">
      <Sun
        className={`h-4 w-4 transition-colors ${isDark ? 'text-muted-foreground' : 'text-foreground'}`}
        aria-hidden="true"
      />
      <Switch
        checked={isDark}
        onCheckedChange={toggleMode}
        aria-label={label}
        title={label}
      />
      <Moon
        className={`h-4 w-4 transition-colors ${isDark ? 'text-foreground' : 'text-muted-foreground'}`}
        aria-hidden="true"
      />
    </div>
  )
}
