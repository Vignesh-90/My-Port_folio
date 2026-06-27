'use client'
import { useEffect, useState } from 'react'
import { data } from '@/data/portfolio'

const links = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
    setActive(id)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8,11,20,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(124,58,237,0.2)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-display font-bold text-xl"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <span className="gradient-text">{data.name.split(' ')[0]}</span>
          <span className="text-slate-400">.</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                color: active === link ? '#A855F7' : '#94A3B8',
                background: active === link ? 'rgba(168,85,247,0.1)' : 'transparent',
              }}
              onMouseEnter={e => { if (active !== link) (e.target as HTMLElement).style.color = '#E2E8F0' }}
              onMouseLeave={e => { if (active !== link) (e.target as HTMLElement).style.color = '#94A3B8' }}
            >
              {link}
            </button>
          ))}
          <a
            href={`mailto:${data.email}`}
            className="ml-4 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
              color: 'white',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-slate-400 block transition-all" style={{ transform: menuOpen ? 'rotate(45deg) translate(4px,4px)' : 'none' }} />
          <span className="w-6 h-0.5 bg-slate-400 block transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="w-6 h-0.5 bg-slate-400 block transition-all" style={{ transform: menuOpen ? 'rotate(-45deg) translate(4px,-4px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-6 py-4 flex flex-col gap-2" style={{ background: 'rgba(8,11,20,0.97)', borderColor: 'rgba(124,58,237,0.2)' }}>
          {links.map(link => (
            <button key={link} onClick={() => scrollTo(link)} className="py-2.5 text-left text-sm font-medium text-slate-300 hover:text-purple-400 transition">
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
