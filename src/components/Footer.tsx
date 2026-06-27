import { data } from '@/data/portfolio'

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t text-center" style={{ borderColor: 'rgba(30,42,58,0.5)' }}>
      <p className="text-slate-600 text-sm">
        Built with <span style={{ color: '#7C3AED' }}>♥</span> by{' '}
        <span className="gradient-text font-medium" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{data.name}</span>
        {' '}using Next.js & Tailwind CSS
      </p>
    </footer>
  )
}
