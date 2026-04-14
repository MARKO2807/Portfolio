import { useEffect, useRef } from 'react'
import './Cursor.css'

const MAX_TRAIL_MS = 250
const MIN_DIST = 2
const MAX_TRAIL_POINTS = 15
const DPR_CAP = 2

/**
 * Single-path strokes so glow does not stack per segment. Per-segment shadows
 * caused huge bright bands along straight moves (e.g. down nav links, viewport edges).
 */
function drawNeonTrail(ctx, points) {
  if (points.length < 2) return

  ctx.save()
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y)
  }

  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0

  ctx.shadowBlur = 26
  ctx.shadowColor = 'rgba(0, 220, 255, 0.82)'
  ctx.strokeStyle = 'rgba(0, 195, 240, 0.5)'
  ctx.lineWidth = 20
  ctx.globalAlpha = 1
  ctx.stroke()

  ctx.shadowBlur = 15
  ctx.shadowColor = 'rgba(80, 230, 255, 0.68)'
  ctx.strokeStyle = 'rgba(60, 220, 255, 0.58)'
  ctx.lineWidth = 10
  ctx.stroke()

  ctx.shadowBlur = 7
  ctx.shadowColor = 'rgba(200, 255, 255, 0.5)'
  ctx.strokeStyle = 'rgba(210, 252, 255, 0.9)'
  ctx.lineWidth = 4.5
  ctx.stroke()

  ctx.shadowBlur = 0
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.96)'
  ctx.lineWidth = 2
  ctx.stroke()

  ctx.restore()
}

function trimTrailByCount(trail) {
  while (trail.length > MAX_TRAIL_POINTS) {
    trail.shift()
  }
}

export default function Cursor() {
  const dotPos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const lastAdded = useRef({ x: 0, y: 0 })
  const trail = useRef([])
  const frame = useRef(0)
  const dotEl = useRef(null)
  const canvasEl = useRef(null)
  const ctxRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return undefined

    let cancelled = false

    document.body.classList.add('has-custom-cursor')

    const canvas = canvasEl.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return undefined
    ctxRef.current = ctx

    const syncSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    syncSize()

    const onMove = (e) => {
      const cx = e.clientX
      const cy = e.clientY
      target.current = { x: cx, y: cy }

      if (trail.current.length === 0) {
        const now = performance.now()
        trail.current.push({ x: cx, y: cy, t: now })
        lastAdded.current = { x: cx, y: cy }
        dotPos.current = { x: cx, y: cy }
        return
      }

      const t = target.current
      const last = lastAdded.current
      const dx = t.x - last.x
      const dy = t.y - last.y
      if (dx * dx + dy * dy >= MIN_DIST * MIN_DIST) {
        const now = performance.now()
        trail.current.push({ x: t.x, y: t.y, t: now })
        lastAdded.current = { x: t.x, y: t.y }
        trimTrailByCount(trail.current)
      }
    }

    const onResize = () => {
      syncSize()
    }

    const loop = () => {
      if (cancelled) return

      const now = performance.now()
      const t = target.current
      const kd = 0.38

      dotPos.current.x += (t.x - dotPos.current.x) * kd
      dotPos.current.y += (t.y - dotPos.current.y) * kd

      while (trail.current.length && now - trail.current[0].t > MAX_TRAIL_MS) {
        trail.current.shift()
      }

      const pts = trail.current.map((p) => ({ x: p.x, y: p.y }))
      if (pts.length && trail.current.length) {
        const tip = trail.current[trail.current.length - 1]
        const dx = t.x - tip.x
        const dy = t.y - tip.y
        if (dx * dx + dy * dy > 0.25) {
          pts.push({ x: t.x, y: t.y })
        }
      }

      const c = canvasEl.current
      const cctx = ctxRef.current
      if (c && cctx) {
        const w = c.width
        const h = c.height
        cctx.setTransform(1, 0, 0, 1, 0, 0)
        cctx.clearRect(0, 0, w, h)
        const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
        cctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        if (pts.length >= 2) {
          drawNeonTrail(cctx, pts)
        }
      }

      if (dotEl.current) {
        const dx = dotPos.current.x
        const dy = dotPos.current.y
        dotEl.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`
      }

      frame.current = requestAnimationFrame(loop)
    }

    frame.current = requestAnimationFrame(loop)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelled = true
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(frame.current)
      trail.current = []
    }
  }, [])

  return (
    <div className="cursor-root" aria-hidden="true">
      <canvas ref={canvasEl} className="cursor-trail-canvas" />
      <div ref={dotEl} className="cursor-laser-dot" />
    </div>
  )
}
