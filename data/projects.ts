import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: 'alpine-commerce',
    index: '01',
    title: 'Alpine Commerce',
    category: '3D E-Commerce',
    url: '#',
    description:
      "A WebGL-first shopping experience with real-time 3D product previews, spatial UI, and a conversion rate that put the client's competitors in the ground.",
    stats: [
      { value: '3.2×', label: 'Conversion lift' },
      { value: '91%', label: 'Bounce reduction' },
      { value: '4.8s', label: 'Avg session time' },
    ],
    mockupTheme: 'light',
    mockupAccent: '#7dc9e8',
  },
  {
    id: 'datacrystal',
    index: '02',
    title: 'DataCrystal',
    category: 'Data Platform',
    url: '#',
    description:
      'B2B analytics dashboard with live WebSocket streams, custom D3 visualisations, and a GPU-accelerated heatmap engine processing 2M events/sec.',
    stats: [
      { value: '2M+', label: 'Events/sec' },
      { value: '60fps', label: 'Render target' },
      { value: '12ms', label: 'P99 latency' },
    ],
    mockupTheme: 'dark',
    mockupAccent: '#1a5f7a',
  },
  {
    id: 'novamed',
    index: '03',
    title: 'NovaMed',
    category: 'Digital Product',
    url: '#',
    description:
      'Patient-facing telehealth app with biometric authentication, encrypted messaging, and a clinical design system adopted across 14 hospitals.',
    stats: [
      { value: '14', label: 'Hospitals adopted' },
      { value: '98%', label: 'Uptime SLA' },
      { value: '4.9★', label: 'App store rating' },
    ],
    mockupTheme: 'light',
    mockupAccent: '#b8e4f7',
  },
  {
    id: 'solara-energy',
    index: '04',
    title: 'Solara Energy',
    category: 'Brand + Web',
    url: '#',
    description:
      'Complete rebrand and interactive microsite for a solar infrastructure company — 3D turbine visualiser, investor dashboard, and live grid analytics.',
    stats: [
      { value: '$40M', label: 'Series B raised after launch' },
      { value: '220%', label: 'Investor inquiry growth' },
      { value: '6wk', label: 'Total delivery' },
    ],
    mockupTheme: 'warm',
    mockupAccent: '#f5a623',
  },
  {
    id: 'orca-logistics',
    index: '05',
    title: 'Orca Logistics',
    category: 'Operations SaaS',
    url: '#',
    description:
      'Real-time fleet tracking interface with predictive delay modelling, custom Mapbox GL overlays, and a multi-tenant SaaS architecture from scratch.',
    stats: [
      { value: '850+', label: 'Fleet vehicles tracked' },
      { value: '31%', label: 'Fuel cost reduction' },
      { value: '99.97%', label: 'Platform uptime' },
    ],
    mockupTheme: 'dark',
    mockupAccent: '#0d3a52',
  },
]
