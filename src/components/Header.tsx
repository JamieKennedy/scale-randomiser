import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="supports-backdrop-filter:bg-background/60 sticky top-0 z-50 border-b bg-background/95 px-4 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between py-3 sm:py-4">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Scale & Chord Randomiser
        </h1>
        <ThemeToggle />
      </nav>
    </header>
  )
}
