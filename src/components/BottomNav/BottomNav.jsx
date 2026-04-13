import { FiHome, FiUser, FiGrid, FiMail } from 'react-icons/fi'
import { navItems } from '../../data/siteConfig.js'
import { scrollToSection } from '../../utils/scrollToSection.js'
import './BottomNav.css'

const icons = {
  home: FiHome,
  about: FiUser,
  portfolio: FiGrid,
  contact: FiMail,
}

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Mobile primary">
      <ul className="bottom-nav-list">
        {navItems.map((item) => {
          const Icon = icons[item.id] ?? FiHome
          return (
            <li key={item.id} className="bottom-nav-item">
              <button
                type="button"
                className="bottom-nav-btn"
                onClick={() => scrollToSection(item.id)}
              >
                <Icon className="bottom-nav-icon" aria-hidden="true" />
                <span className="bottom-nav-label">{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
