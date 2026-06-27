'use client'
import { useEffect, useRef, useState } from 'react'
import { data } from '@/data/portfolio'

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          e.target.classList.toggle('visible', e.isIntersecting)
          if (e.isIntersecting) setAnimate(true)
        })
      },
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-28 px-6" style={{ background: 'rgba(13,17,23,0.6)' }} ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-16">
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: '#06B6D4' }}>What I Know</p>
          <h2 className="text-4xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Tech <span className="gradient-text">Stack</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {data.skills.map((skill, i) => (
            <div
              key={skill.name}
              className="reveal"
              style={{ transitionDelay: `${(i % 6) * 80}ms` }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-300" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {skill.name}
                </span>
                <span className="text-xs font-semibold" style={{ color: skill.color }}>{skill.level}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(30,42,58,0.8)' }}>
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: animate ? `${skill.level}%` : '0%',
                    background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
                    transitionDelay: `${i * 60}ms`,
                    boxShadow: `0 0 10px ${skill.color}60`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Floating tech badges */}
        <div className="reveal mt-16 flex flex-wrap gap-3 justify-center">
          {['React', 'Node.js', 'MongoDB', 'Express', 'Redux Toolkit', 'Next.js', 'TypeScript', 'Tailwind', 'REST API', 'Git', 'JWT', 'Docker'].map((tech, i) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-110 cursor-default"
              style={{
                borderColor: 'rgba(124,58,237,0.3)',
                background: 'rgba(124,58,237,0.08)',
                color: '#94A3B8',
                animationDelay: `${i * 0.2}s`,
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = '#7C3AED'
                ;(e.currentTarget as HTMLElement).style.color = '#A855F7'
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(124,58,237,0.15)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.3)'
                ;(e.currentTarget as HTMLElement).style.color = '#94A3B8'
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(124,58,237,0.08)'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
