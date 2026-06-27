'use client'
import { useEffect, useRef } from 'react'
import { data } from '@/data/portfolio'
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react'

export default function Experience() {
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
    <section id="experience" className="py-28 px-6" style={{ background: 'rgba(13,17,23,0.5)' }} ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-16">
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: '#06B6D4' }}>My Journey</p>
          <h2 className="text-4xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Experience & <span className="gradient-text">Education</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8 reveal">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.15)' }}>
                <Briefcase size={18} style={{ color: '#7C3AED' }} />
              </div>
              <h3 className="text-lg font-semibold text-slate-200" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Work Experience</h3>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, #7C3AED, transparent)' }} />

              {data.experience.map((exp, i) => (
                <div key={i} className="reveal pl-12 pb-8 relative">
                  {/* Dot */}
                  <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full border-2" style={{ background: '#7C3AED', borderColor: '#080B14', boxShadow: '0 0 12px rgba(124,58,237,0.6)' }} />

                  <div className="p-5 rounded-2xl border transition-all duration-300" style={{ background: 'rgba(13,17,23,0.8)', borderColor: 'rgba(30,42,58,0.8)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.4)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(30,42,58,0.8)' }}
                  >
                    <h4 className="font-bold text-slate-100 mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{exp.role}</h4>
                    <p className="text-sm font-medium mb-3" style={{ color: '#7C3AED' }}>{exp.company}</p>
                    <div className="flex flex-wrap gap-3 mb-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Calendar size={11} />{exp.duration}</span>
                      <span className="flex items-center gap-1"><MapPin size={11} />{exp.location}</span>
                    </div>
                    <ul className="space-y-2">
                      {exp.points.map((pt, j) => (
                        <li key={j} className="text-sm text-slate-400 flex gap-2 leading-relaxed">
                          <span style={{ color: '#06B6D4', flexShrink: 0 }}>▹</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-8 reveal">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(6,182,212,0.12)' }}>
                <GraduationCap size={18} style={{ color: '#06B6D4' }} />
              </div>
              <h3 className="text-lg font-semibold text-slate-200" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Education</h3>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, #06B6D4, transparent)' }} />

              <div className="reveal pl-12 relative">
                <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full border-2" style={{ background: '#06B6D4', borderColor: '#080B14', boxShadow: '0 0 12px rgba(6,182,212,0.6)' }} />

                <div className="p-5 rounded-2xl border" style={{ background: 'rgba(13,17,23,0.8)', borderColor: 'rgba(30,42,58,0.8)' }}>
                  <h4 className="font-bold text-slate-100 mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{data.education.degree}</h4>
                  <p className="text-sm font-medium mb-3" style={{ color: '#06B6D4' }}>{data.education.college}</p>
                  <div className="flex flex-wrap gap-3 mb-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Calendar size={11} />{data.education.year}</span>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1" style={{ background: 'rgba(6,182,212,0.12)', color: '#06B6D4' }}>
                    {data.education.cgpa}
                  </span>
                </div>
              </div>
            </div>

            {/* Certifications placeholder */}
            <div className="reveal mt-8 p-5 rounded-2xl border" style={{ background: 'rgba(13,17,23,0.6)', borderColor: 'rgba(30,42,58,0.5)', borderStyle: 'dashed' }}>
              <p className="text-sm font-semibold text-slate-400 mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Certifications & Learning</p>
              <ul className="space-y-2">
                {['Full Stack Web Development — Greens Technology', 'React & Redux — Zero to Mastery', 'Node.js — The Complete Guide', 'MongoDB University — M001'].map(cert => (
                  <li key={cert} className="text-sm text-slate-500 flex gap-2">
                    <span style={{ color: '#A855F7' }}>✦</span> {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
