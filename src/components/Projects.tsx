'use client'
import { useEffect, useRef } from 'react'
import { data } from '@/data/portfolio'
import { Github, ExternalLink, Star } from 'lucide-react'

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-16">
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: '#7C3AED' }}>What I've Built</p>
          <h2 className="text-4xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </div>

        {/* Featured projects */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {data.projects.filter(p => p.featured).map((proj, i) => (
            <div
              key={proj.title}
              className="reveal group relative overflow-hidden rounded-2xl border p-7 flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(13,17,23,0.9)',
                borderColor: 'rgba(30,42,58,0.8)',
                transitionDelay: `${i * 100}ms`,
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = proj.color + '50'
                ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${proj.color}15`
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(30,42,58,0.8)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              {/* Glow top bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${proj.color}, transparent)` }} />

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Star size={14} style={{ color: proj.color }} />
                  <span className="text-xs font-medium uppercase tracking-wider" style={{ color: proj.color }}>Featured</span>
                </div>
                <div className="flex gap-3">
                  <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-200 transition">
                    <Github size={18} />
                  </a>
                  <a href={proj.live} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-200 transition">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-100 mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{proj.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{proj.desc}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {proj.tech.map(t => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: proj.color + '15', color: proj.color }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Other projects */}
        <div className="grid md:grid-cols-2 gap-6">
          {data.projects.filter(p => !p.featured).map((proj, i) => (
            <div
              key={proj.title}
              className="reveal group rounded-2xl border p-6 flex flex-col gap-3 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(13,17,23,0.7)',
                borderColor: 'rgba(30,42,58,0.6)',
                transitionDelay: `${i * 100}ms`,
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = proj.color + '40'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(30,42,58,0.6)'
              }}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-base font-bold text-slate-200" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{proj.title}</h3>
                <div className="flex gap-2">
                  <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-300 transition"><Github size={16} /></a>
                  <a href={proj.live} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-300 transition"><ExternalLink size={16} /></a>
                </div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{proj.desc}</p>
              <div className="flex flex-wrap gap-2">
                {proj.tech.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-full text-xs" style={{ background: 'rgba(30,42,58,0.8)', color: '#64748B' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
