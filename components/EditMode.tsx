'use client'

import { useState, useEffect, useCallback } from 'react'

const EDITABLE_SELECTORS = 'h1, h2, h3, h4, p, span, li, button span'

export default function EditMode() {
  const [active, setActive] = useState(false)

  const toggle = useCallback(() => {
    setActive(prev => !prev)
  }, [])

  // Keyboard shortcut: Ctrl+Shift+E
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault()
        toggle()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [toggle])

  // Toggle contentEditable on all text elements
  useEffect(() => {
    const elements = document.querySelectorAll(EDITABLE_SELECTORS)

    if (active) {
      document.body.classList.add('edit-mode')
      elements.forEach(el => {
        el.setAttribute('contenteditable', 'true')
        el.setAttribute('suppresscontenteditablewarning', 'true')
      })
    } else {
      document.body.classList.remove('edit-mode')
      elements.forEach(el => {
        el.removeAttribute('contenteditable')
      })
    }

    return () => {
      document.body.classList.remove('edit-mode')
      elements.forEach(el => el.removeAttribute('contenteditable'))
    }
  }, [active])

  return (
    <div className="fixed bottom-6 left-6 z-[200] flex flex-col items-start gap-2">
      {active && (
        <div className="bg-black/90 text-white text-xs px-4 py-2 rounded-lg backdrop-blur-sm max-w-[200px] text-center">
          Click any text to edit. Changes are visual only.
        </div>
      )}
      <button
        onClick={toggle}
        className={`px-4 py-2.5 rounded-full text-xs font-medium tracking-wide shadow-lg transition-all duration-300 ${
          active
            ? 'bg-[var(--primary-blue)] text-white scale-105'
            : 'bg-white/90 text-[var(--black)] border border-[var(--gray-light)] hover:bg-white'
        }`}
      >
        {active ? 'Editing' : 'Edit Copy'}
      </button>
    </div>
  )
}
