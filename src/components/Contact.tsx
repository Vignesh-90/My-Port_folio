'use client'
import { useEffect, useRef, useState } from 'react'
import { data } from '@/data/portfolio'
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const contacts = [
    { icon: Mail, label: 'Email', value: data.email, href: `mailto:${data.email}` },
    { icon: Phone, label: 'Phone', value: data.phone, href: `tel:${data.phone}` },
    { icon: MapPin, label: 'Location', value: data.location, href: '#' },
  ]

  return (
    <section id="contact" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-16 text-center">
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: '#7C3AED' }}>Get In Touch</p>
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm">
            I'm currently open to new opportunities. Whether you have a project or just want to say hi — my inbox is always open!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left */}
          <div className="space-y-6">
            {contacts.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="reveal flex items-center gap-4 p-5 rounded-2xl border group transition-all duration-200 hover:scale-105"
                style={{ background: 'rgba(13,17,23,0.8)', borderColor: 'rgba(30,42,58,0.8)', textDecoration: 'none' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.4)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(30,42,58,0.8)' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(124,58,237,0.12)' }}>
                  <Icon size={18} style={{ color: '#7C3AED' }} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-slate-200">{value}</p>
                </div>
              </a>
            ))}

            <div className="reveal flex gap-3 pt-2">
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition hover:scale-105" style={{ borderColor: 'rgba(124,58,237,0.3)', color: '#94A3B8', background: 'rgba(124,58,237,0.06)' }}>
                <Github size={16} /> GitHub
              </a>
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition hover:scale-105" style={{ borderColor: 'rgba(6,182,212,0.3)', color: '#94A3B8', background: 'rgba(6,182,212,0.06)' }}>
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>

          {/* Right — form */}
          <form onSubmit={handleSubmit} className="reveal space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition"
                  style={{ background: 'rgba(13,17,23,0.9)', borderColor: 'rgba(30,42,58,0.8)', color: '#E2E8F0' }}
                  onFocus={e => { (e.target as HTMLElement).style.borderColor = '#7C3AED' }}
                  onBlur={e => { (e.target as HTMLElement).style.borderColor = 'rgba(30,42,58,0.8)' }}
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition"
                  style={{ background: 'rgba(13,17,23,0.9)', borderColor: 'rgba(30,42,58,0.8)', color: '#E2E8F0' }}
                  onFocus={e => { (e.target as HTMLElement).style.borderColor = '#7C3AED' }}
                  onBlur={e => { (e.target as HTMLElement).style.borderColor = 'rgba(30,42,58,0.8)' }}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Subject</label>
              <input
                type="text"
                placeholder="Job opportunity / Project collaboration"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition"
                style={{ background: 'rgba(13,17,23,0.9)', borderColor: 'rgba(30,42,58,0.8)', color: '#E2E8F0' }}
                onFocus={e => { (e.target as HTMLElement).style.borderColor = '#7C3AED' }}
                onBlur={e => { (e.target as HTMLElement).style.borderColor = 'rgba(30,42,58,0.8)' }}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1.5">Message</label>
              <textarea
                rows={5}
                placeholder="Tell me about your project or opportunity..."
                required
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition"
                style={{ background: 'rgba(13,17,23,0.9)', borderColor: 'rgba(30,42,58,0.8)', color: '#E2E8F0', resize: 'vertical' }}
                onFocus={e => { (e.target as HTMLElement).style.borderColor = '#7C3AED' }}
                onBlur={e => { (e.target as HTMLElement).style.borderColor = 'rgba(30,42,58,0.8)' }}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02]"
              style={{ background: sent ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #7C3AED, #06B6D4)', color: 'white', fontFamily: 'Space Grotesk, sans-serif', boxShadow: '0 0 30px rgba(124,58,237,0.3)' }}
            >
              {sent ? '✓ Message Sent!' : <><Send size={15} /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
