'use client'
import { useEffect, useRef } from 'react'
import { data } from '@/data/portfolio'
import { MapPin, Mail, Phone, Github, Linkedin, Code2, Cpu, Layers } from 'lucide-react'

export default function About() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.15 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const cards = [
    { icon: Code2, label: 'Frontend', value: 'React · Next.js · Redux', color: '#61DAFB' },
    { icon: Cpu, label: 'Backend', value: 'Node.js · Express · REST', color: '#84CC16' },
    { icon: Layers, label: 'Database', value: 'MongoDB · Mongoose· MySql', color: '#10B981' },
  ]

  return (
    <section id="about" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-16">
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: '#7C3AED' }}>About Me</p>
          <h2 className="text-4xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Crafting <span className="gradient-text">Digital Experiences</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <div className="space-y-6">
            <p className="reveal text-slate-300 leading-relaxed text-base">
              {data.about}
            </p>
            <p className="reveal text-slate-400 leading-relaxed text-sm">
              When I'm not coding, I explore new tech, contribute to open source, and write about my learnings. I believe in writing clean, maintainable code and building products that actually solve real problems.
            </p>

            {/* Contact info */}
            <div className="reveal space-y-3 pt-2">
              {[
                { icon: MapPin, text: data.location },
                { icon: Mail, text: data.email },
                { icon: Phone, text: data.phone },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-slate-400">
                  <Icon size={15} style={{ color: '#7C3AED' }} />
                  {text}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="reveal flex gap-3 pt-2">
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition hover:scale-105" style={{ borderColor: 'rgba(124,58,237,0.3)', color: '#94A3B8', background: 'rgba(124,58,237,0.06)' }}>
                <Github size={15} /> GitHub
              </a>
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition hover:scale-105" style={{ borderColor: 'rgba(6,182,212,0.3)', color: '#94A3B8', background: 'rgba(6,182,212,0.06)' }}>
                <Linkedin size={15} /> LinkedIn
              </a>
            </div>
          </div>

          {/* Right — cards */}
          <div className="space-y-4">
            {cards.map(({ icon: Icon, label, value, color }, i) => (
              <div
                key={label}
                className="reveal p-6 rounded-2xl border flex items-center gap-5 transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(13,17,23,0.8)',
                  borderColor: 'rgba(30,42,58,0.8)',
                  transitionDelay: `${i * 100}ms`,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = color + '40' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(30,42,58,0.8)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: color + '15' }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <div>
                  <p className="font-semibold text-slate-200 mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{label}</p>
                  <p className="text-sm text-slate-500">{value}</p>
                </div>
              </div>
            ))}

            {/* Stats */}
            <div className="reveal grid grid-cols-3 gap-3 pt-2">
              {[
                { num: '1+', label: 'Year Exp' },
                { num: '3+', label: 'Projects' },
                { num: '3+', label: 'Happy Clients' },
              ].map(({ num, label }) => (
                <div key={label} className="p-4 rounded-xl text-center border" style={{ background: 'rgba(124,58,237,0.06)', borderColor: 'rgba(124,58,237,0.2)' }}>
                  <p className="text-2xl font-bold gradient-text" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{num}</p>
                  <p className="text-xs text-slate-500 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
