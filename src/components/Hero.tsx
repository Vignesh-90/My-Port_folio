'use client'
import { useEffect, useRef, useState } from 'react'
import { data } from '@/data/portfolio'
import { Github, Linkedin, Mail, ArrowDown, Download } from 'lucide-react'

const TAGLINES = data.taglines

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Typing effect
  useEffect(() => {
    const target = TAGLINES[taglineIndex]
    let i = displayed.length

    if (typing) {
      if (i < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, i + 1)), 60)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 1800)
        return () => clearTimeout(t)
      }
    } else {
      if (i > 0) {
        const t = setTimeout(() => setDisplayed(target.slice(0, i - 1)), 35)
        return () => clearTimeout(t)
      } else {
        setTaglineIndex(prev => (prev + 1) % TAGLINES.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, taglineIndex])

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string }[] = []
    const colors = ['#7C3AED', '#06B6D4', '#A855F7', '#3B82F6']

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0')
        ctx.fill()
      })

      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(124,58,237,${0.1 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
  }, [])

  const scrollToAbout = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.7 }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 border" style={{ background: 'rgba(124,58,237,0.1)', borderColor: 'rgba(124,58,237,0.3)', color: '#A855F7' }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10B981' }} />
          Available for opportunities
        </div>

        {/* Name */}
        <h1 className="mb-4 font-bold leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
          Hi, I'm <span className="gradient-text text-glow">{data.name}</span>
        </h1>

        {/* Typing tagline */}
        <div className="mb-6 font-medium" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: '#94A3B8', minHeight: '2.5rem' }}>
          <span style={{ color: '#06B6D4' }}>{displayed}</span>
          <span className="cursor-blink" style={{ color: '#7C3AED' }}>|</span>
        </div>

        {/* About blurb */}
        <p className="text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed" style={{ fontSize: '1rem' }}>
          {data.about}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', color: 'white', fontFamily: 'Space Grotesk, sans-serif', boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}
          >
            View My Work
          </button>
          <a
            href={`mailto:${data.email}`}
            className="px-8 py-3.5 rounded-xl font-semibold text-sm border transition-all duration-200 hover:scale-105"
            style={{ borderColor: 'rgba(124,58,237,0.5)', color: '#E2E8F0', background: 'rgba(124,58,237,0.08)', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Get In Touch
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 mb-16">
          {[
            { href: data.github, icon: Github, label: 'GitHub' },
            { href: data.linkedin, icon: Linkedin, label: 'LinkedIn' },
            { href: `mailto:${data.email}`, icon: Mail, label: 'Email' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-200 hover:scale-110"
              style={{ borderColor: 'rgba(124,58,237,0.3)', background: 'rgba(124,58,237,0.08)', color: '#94A3B8' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#7C3AED'; (e.currentTarget as HTMLElement).style.color = '#A855F7' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.3)'; (e.currentTarget as HTMLElement).style.color = '#94A3B8' }}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* Scroll down */}
        <button onClick={scrollToAbout} className="flex flex-col items-center gap-2 mx-auto text-slate-500 hover:text-slate-300 transition" style={{ animation: 'float 2.5s ease-in-out infinite' }}>
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown size={16} />
        </button>
      </div>
    </section>
  )
}
