type Stat = {
  value: string
  label: string
}

const mediaStats: Stat[] = [
  { value: '142K+', label: 'comunidad en Instagram' },
  { value: '1.6K+', label: 'publicaciones indexadas' },
  { value: '5', label: 'canales sociales activos' },
  { value: 'MX', label: 'enfoque nacional' },
]

function StatsGrid() {
  return (
    <div className="stats-grid">
      {mediaStats.map((stat) => (
        <div className="stat" key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  )
}

export default StatsGrid
