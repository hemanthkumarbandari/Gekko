import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: 'iquantum',
    index: '01',
    title: 'iQuantum',
    category: 'Quantum Analytics',
    url: 'https://iquantum.nuhvin.com/',
    description:
      'Next-generation quantum analytics platform offering ultra-fast processing, deep data intelligence, and advanced neural insights for high-frequency workflows.',
    stats: [
      { value: '10×', label: 'Processing speed' },
      { value: '99.9%', label: 'Accuracy rate' },
      { value: '2.5s', label: 'Query response' },
    ],
    mockupTheme: 'dark',
    mockupAccent: '#7dc9e8',
  },
  {
    id: 'meetnow',
    index: '02',
    title: 'MeetNow',
    category: 'Video Collaboration',
    url: 'https://meetnow.nuhvin.com/',
    description:
      'Real-time web video conferencing and instant collaboration platform designed for modern, high-bandwidth remote-first teams.',
    stats: [
      { value: '4k', label: 'Video quality' },
      { value: '120ms', label: 'Avg latency' },
      { value: '99.99%', label: 'Uptime SLA' },
    ],
    mockupTheme: 'light',
    mockupAccent: '#1a5f7a',
  },
  {
    id: 'ros',
    index: '03',
    title: 'ROS',
    category: 'Robotics Platform',
    url: 'https://ros.nuhvin.com/',
    description:
      'Advanced robotics control interface and fleet orchestration platform with live telemetry visualization and spatial 3D mapping.',
    stats: [
      { value: '25ms', label: 'Telemetry ping' },
      { value: '98%', label: 'Auto-dock success' },
      { value: '60fps', label: 'Telemetry render' },
    ],
    mockupTheme: 'dark',
    mockupAccent: '#b8e4f7',
  },
  {
    id: 'portfolio',
    index: '04',
    title: 'Nuhvin Portfolio',
    category: 'Creative Showcase',
    url: 'https://portfolio-pi-six-55.vercel.app/',
    description:
      'Sleek, high-performance portfolio showcasing cutting-edge web design, interactive UI components, and premium brand designs.',
    stats: [
      { value: '100', label: 'Performance index' },
      { value: '60fps', label: 'Smooth animations' },
      { value: '100%', label: 'SEO health' },
    ],
    mockupTheme: 'warm',
    mockupAccent: '#f5a623',
  },
]
