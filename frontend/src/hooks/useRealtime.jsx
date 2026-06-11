import { useEffect, useRef, useState } from 'react'

export default function useRealtime({ url } = {}) {
  const wsUrl = url || window?.__REALTIME_URL__ || 'ws://localhost:4000'
  const wsRef = useRef(null)
  const mockRef = useRef(null)
  const [connected, setConnected] = useState(false)
  const [events, setEvents] = useState([])
  const [stats, setStats] = useState({})

  useEffect(() => {
    let ws
    let cleared = false

    function handleMessage(msg) {
      if (!msg) return
      if (msg.type === 'event') {
        setEvents(prev => [msg, ...prev].slice(0, 50))
        try { window.dispatchEvent(new CustomEvent('realtime:event', { detail: msg })) } catch (e) {}
      } else if (msg.type === 'stats') {
        setStats(prev => ({ ...prev, ...msg.payload }))
        try { window.dispatchEvent(new CustomEvent('realtime:stats', { detail: msg.payload })) } catch (e) {}
      }
    }

    function startMock() {
      if (mockRef.current) return
      mockRef.current = setInterval(() => {
        const evt = { type: 'event', id: Date.now(), title: 'New appointment', payload: { patient: `P${Math.floor(Math.random()*9999)}`, time: new Date().toLocaleTimeString() } }
        handleMessage(evt)
        const s = { type: 'stats', payload: {} }
        handleMessage(s)
      }, 4000)
    }

    try {
      ws = new WebSocket(wsUrl)
      wsRef.current = ws
      ws.onopen = () => { setConnected(true); if (mockRef.current) { clearInterval(mockRef.current); mockRef.current = null } }
      ws.onmessage = e => {
        try { const parsed = JSON.parse(e.data); handleMessage(parsed) } catch (err) { }
      }
      ws.onclose = () => { setConnected(false); if (!cleared) startMock() }
      ws.onerror = () => { try { ws.close() } catch(e){} }
    } catch (err) {
      startMock()
    }

    // fallback to mock if ws doesn't connect in 2s
    const fallback = setTimeout(() => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) startMock()
    }, 2000)

    return () => {
      cleared = true
      clearTimeout(fallback)
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) try { wsRef.current.close() } catch(e){}
      if (mockRef.current) { clearInterval(mockRef.current); mockRef.current = null }
    }
  }, [wsUrl])

  return { connected, events, stats }
}
