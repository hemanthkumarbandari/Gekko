export interface ProjectStat {
  value: string
  label: string
}

export interface Project {
  id: string
  index: string
  title: string
  category: string
  url: string
  description: string
  stats: ProjectStat[]
  mockupTheme: 'light' | 'dark' | 'warm'
  mockupAccent: string
}
