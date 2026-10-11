
import { useEffect, useState } from 'react'
import './App.css'
import Reservations from './Reservations'
import {
  MaisonAtmosphere,
  MaisonFooter,
  MaisonEffects,
} from './MaisonFinish'

type MenuCategory = 'Starters' | 'Main Courses' | 'Desserts' | 'Drinks'

type MenuItem = {
  id: number
  name: string
  description: string
  price: number
  category: MenuCategory
  allergens: string[]
  image: string
  featured?: boolean
}

const categories: MenuCategory[] = [
  'Starters',
  'Main Courses',
  'Desserts',
  'Drinks',
]

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Burrata & Heirloom Tomato',
    description: 'Fresh burrata, heritage tomatoes, basil oil, aged balsamic.',
    price: 18,
    category: 'Starters',
    allergens: ['Milk'],
    image: '/menu-burrata.jpg',
    featured: true,
  },
  {
    id: 2,
    name: 'Beef Carpaccio',
    description: 'Thinly sliced beef, parmesan, rocket, truffle dressing.',
    price: 22,
    category: 'Starters',
    allergens: ['Milk'],
    image: '/menu-carpaccio.jpg',
  },
  {
    id: 3,
    name: 'Seared Scallops',
    description: 'Cauliflower purée, brown butter, citrus, sea herbs.',
    price: 24,
    category: 'Starters',
    allergens: ['Shellfish', 'Milk'],
    image: '/menu-scallops.jpg',
  },
  {
    id: 4,
    name: 'Beef Tenderloin',
    description: 'Potato fondant, seasonal vegetables, rich truffle jus.',
    price: 38,
    category: 'Main Courses',
    allergens: ['Milk'],
    image: '/menu-beef.jpg',
    featured: true,
  },
  {
    id: 5,
    name: 'Wild Mushroom Risotto',
    description: 'Arborio rice, wild mushrooms, aged parmesan, fresh herbs.',
    price: 29,
    category: 'Main Courses',
    allergens: ['Milk'],
    image: '/menu-risotto.jpg',
  },
  {
    id: 6,
    name: 'Pan-Seared Sea Bass',
    description: 'Silky potato purée, asparagus, lemon beurre blanc.',
    price: 34,
    category: 'Main Courses',
    allergens: ['Fish', 'Milk'],
    image: '/menu-seabass.jpg',
  },
  {
    id: 7,
    name: 'Dark Chocolate Crémeux',
    description: 'Valrhona chocolate, raspberry, cocoa crumble.',
    price: 15,
    category: 'Desserts',
    allergens: ['Milk', 'Eggs', 'Gluten'],
    image: '/menu-chocolate.jpg',
    featured: true,
  },
  {
    id: 8,
    name: 'Vanilla Panna Cotta',
    description: 'Madagascar vanilla, seasonal berries, delicate berry coulis.',
    price: 13,
    category: 'Desserts',
    allergens: ['Milk'],
    image: '/menu-pannacotta.jpg',
  },
  {
    id: 9,
    name: 'Classic Tiramisu',
    description: 'Mascarpone cream, espresso, cocoa, savoiardi.',
    price: 14,
    category: 'Desserts',
    allergens: ['Milk', 'Eggs', 'Gluten'],
    image: '/menu-tiramisu.jpg',
  },
  {
    id: 10,
    name: 'Maison Signature',
    description: 'A refined house cocktail with citrus and aromatic botanicals.',
    price: 16,
    category: 'Drinks',
    allergens: [],
    image: '/menu-cocktail.jpg',
    featured: true,
  },
  {
    id: 11,
    name: 'Red Wine Selection',
    description: 'A curated glass from our rotating collection.',
    price: 14,
    category: 'Drinks',
    allergens: ['Sulphites'],
    image: '/menu-wine.jpg',
  },
  {
    id: 12,
    name: 'Espresso Martini',
    description: 'Fresh espresso, vodka, coffee liqueur.',
    price: 15,
    category: 'Drinks',
    allergens: [],
    image: '/menu-espresso.jpg',
  },
]

const experienceScenes = [
  {
    number: '01',
    eyebrow: 'THE ATMOSPHERE',
    title: 'Where time slows down.',
    description:
      'A warm glow, intimate conversations and an atmosphere that invites you to stay a little longer. Every evening begins with a feeling.',
    image: '/maison-interior.png',
    alt: 'The intimate interior of MAISON',
  },
  {
    number: '02',
    eyebrow: 'THE CUISINE',
    title: 'Crafted to be remembered.',
    description:
      'Seasonal ingredients, thoughtful technique and a passion for the unexpected. Each plate is a story, composed with intention.',
    image: '/menu-beef.jpg',
    alt: 'A carefully plated MAISON main course',
  },
  {
    number: '03',
    eyebrow: 'THE MOMENTS',
    title: 'For everything worth celebrating.',
    description:
      'A glass raised, a conversation that lingers, a moment you wish could last. The best evenings become the stories we keep.',
    image: '/menu-wine.jpg',
    alt: 'A glass of wine at MAISON',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] =
    useState<MenuCategory>('Starters')
  const [excludedAllergen, setExcludedAllergen] =
    useState('All allergens')
  const [selectedItemId, setSelectedItemId] = useState(1)
  const [activeExperience, setActiveExperience] = useState(0)

  const allergenOptions = [
    'All allergens',
    ...Array.from(
      new Set(menuItems.flatMap((item) => item.allergens))
    ).sort(),
  ]

  const visibleItems = menuItems.filter(
    (item) =>
      item.category === activeCategory &&
      (excludedAllergen === 'All allergens' ||
        !item.allergens.includes(excludedAllergen))
  )

  const selectedItem =
    visibleItems.find((item) => item.id === selectedItemId) ??
    visibleItems[0]

  const changeCategory = (category: MenuCategory) => {
    setActiveCategory(category)

    const firstItem = menuItems.find(
      (item) =>
        item.category === category &&
        (excludedAllergen === 'All allergens' ||
          !item.allergens.includes(excludedAllergen))
    )

    setSelectedItemId(firstItem?.id ?? 0)
  }

  const changeAllergen = (allergen: string) => {
    setExcludedAllergen(allergen)

    const firstItem = menuItems.find(
      (item) =>
        item.category === activeCategory &&
        (allergen === 'All allergens' ||
          !item.allergens.includes(allergen))
    )

    setSelectedItemId(firstItem?.id ?? 0)
  }

  useEffect(() => {
    const sources = Array.from(
      new Set([
        ...menuItems.map((item) => item.image),
        ...experienceScenes.map((scene) => scene.image),
      ])
    )

    const images = sources.map((source) => {
      const image = new Image()
      image.src = source

      if ('decode' in image) {
        image.decode().catch(() => {})
      }

      return image
    })

    return () => {
      images.forEach((image) => {
        image.onload = null
        image.onerror = null
      })
    }
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-on-scroll')

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="maison-site">
      <header className="navbar">
        <a className="brand" href="#home">
          MAISON<span>.</span>
        </a>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            THE STORY
          </a>
          <a href="#menu" onClick={() => setMenuOpen(false)}>
            OUR MENU
          </a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>
            EXPERIENCE
          </a>
          <a href="#reservation" onClick={() => setMenuOpen(false)}>
            RESERVATIONS
          </a>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </header>

      <main>
        <section className="hero cinematic-hero" id="home">
          <div className="hero-image">
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/maison-interior.png"
              aria-label="MAISON restaurant cinematic video"
            >
              <source src="/maison-hero.mp4" type="video/mp4" />
            </video>

            <div className="image-overlay" />

            <div className="cinematic-content">
              <span className="cinematic-eyebrow">
                CONTEMPORARY FINE DINING
              </span>

              <h1>MAISON</h1>
              <p>More than a table.</p>

              <a className="cinematic-button" href="#reservation">
                RESERVE A TABLE <span>↗</span>
              </a>
            </div>

            <a className="cinematic-scroll" href="#about">
              SCROLL TO DISCOVER <span>↓</span>
            </a>

            <span className="cinematic-est">EST. 2026</span>
          </div>
        </section>

        <section className="intro-section maison-story" id="about">
          <div className="story-container">
            <div className="story-topline reveal-on-scroll">
              <span>01 / OUR PHILOSOPHY</span>
              <span>MAISON — EST. 2026</span>
            </div>

            <div className="story-heading reveal-on-scroll">
              <h2>
                Beyond dining.
                <br />
                <em>Into the extraordinary.</em>
              </h2>
            </div>

            <div className="story-image reveal-on-scroll">
              <img
                src="/maison-interior.png"
                alt="The MAISON restaurant interior"
                loading="lazy"
              />
              <span className="story-image-index">01 — MAISON</span>
            </div>

            <div className="story-bottom reveal-on-scroll">
              <div className="story-description">
                <span className="story-small-label">
                  THE ART OF BEING PRESENT
                </span>

                <p>
                  An intimate atmosphere, exceptional cuisine and
                  moments worth remembering. At MAISON, every
                  detail is an invitation to slow down, savour
                  and experience something extraordinary.
                </p>
              </div>

              <a className="story-link" href="#menu">
                DISCOVER OUR MENU <span>↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="preview-section maison-menu" id="menu">
          <div className="menu-container">
            <div className="menu-topline reveal-on-scroll">
              <span>02 / THE MENU</span>
              <span>SEASONAL SELECTION</span>
            </div>

            <div className="menu-heading reveal-on-scroll">
              <span className="menu-eyebrow">
                THE MAISON KITCHEN
              </span>

              <h2>
                The art of <em>dining.</em>
              </h2>

              <p>
                Thoughtfully sourced. Beautifully composed.
                Made to be remembered.
              </p>
            </div>

            <div className="menu-toolbar editorial-toolbar">
              <div
                className="menu-categories"
                role="group"
                aria-label="Menu categories"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={
                      activeCategory === category
                        ? 'menu-category active'
                        : 'menu-category'
                    }
                    onClick={() => changeCategory(category)}
                    aria-pressed={activeCategory === category}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <label className="menu-allergen-filter">
                <span>EXCLUDE ALLERGEN</span>
                <select
                  value={excludedAllergen}
                  onChange={(event) =>
                    changeAllergen(event.target.value)
                  }
                >
                  {allergenOptions.map((allergen) => (
                    <option key={allergen} value={allergen}>
                      {allergen}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {selectedItem ? (
              <div className="editorial-menu-layout">
                <div className="editorial-menu-visual reveal-on-scroll">
                  <div className="editorial-image-frame">
                    <img
                      key={selectedItem.id}
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="editorial-dish-image"
                    />

                    <div className="editorial-image-shade" />

                    <span className="editorial-image-label">
                      MAISON / {activeCategory.toUpperCase()}
                    </span>

                    <span className="editorial-image-count">
                      {String(
                        visibleItems.findIndex(
                          (item) => item.id === selectedItem.id
                        ) + 1
                      ).padStart(2, '0')}
                      {' / '}
                      {String(visibleItems.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="editorial-photo-caption">
                    <span>THE MAISON COLLECTION</span>
                    <span>CRAFTED WITH INTENTION</span>
                  </div>
                </div>

                <div className="editorial-menu-list">
                  <div className="editorial-list-heading">
                    <span>EXPLORE THE SELECTION</span>
                    <span>EUR / €</span>
                  </div>

                  {visibleItems.map((item, index) => (
                    <button
                      type="button"
                      key={item.id}
                      className={
                        selectedItem.id === item.id
                          ? 'editorial-dish active'
                          : 'editorial-dish'
                      }
                      onClick={() => setSelectedItemId(item.id)}
                      aria-pressed={selectedItem.id === item.id}
                    >
                      <div className="editorial-dish-main">
                        <span className="editorial-dish-number">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <div className="editorial-dish-copy">
                          {item.featured && (
                            <span className="editorial-signature">
                              MAISON SIGNATURE
                            </span>
                          )}

                          <h3>{item.name}</h3>
                          <p>{item.description}</p>

                          <span className="editorial-allergens">
                            {item.allergens.length
                              ? `ALLERGENS: ${item.allergens.join(' · ')}`
                              : 'NO LISTED ALLERGENS'}
                          </span>
                        </div>

                        <span className="editorial-dish-price">
                          €{item.price}
                        </span>
                      </div>

                      <span className="editorial-dish-arrow">↗</span>
                    </button>
                  ))}

                  <div className="editorial-list-footer">
                    <span>
                      AN EXPERIENCE BEYOND THE ORDINARY
                    </span>
                    <span>MAISON.</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="menu-empty">
                No dishes match this selection.
                Please choose another category or allergen.
              </div>
            )}

            <p className="menu-disclaimer">
              Sample menu for the MAISON portfolio concept.
              Ingredients, prices and allergen information are illustrative.
              Allergen filters do not guarantee a dish is allergen-free.
            </p>

            <a className="menu-reservation-link" href="#reservation">
              MAKE A RESERVATION <span>↗</span>
            </a>
          </div>
        </section>

        <section className="maison-experience" id="experience">
          <div className="experience-container">
            <div className="experience-topline reveal-on-scroll">
              <span>03 / THE EXPERIENCE</span>
              <span>AN EVENING AT MAISON</span>
            </div>

            <div className="experience-intro reveal-on-scroll">
              <span className="experience-kicker">
                MORE THAN A TABLE
              </span>

              <h2>
                Not just dinner.
                <br />
                <em>A feeling that stays.</em>
              </h2>

              <p>
                Some evenings are meant to be remembered.
                Discover what makes a night at MAISON unlike any other.
              </p>
            </div>

            <div className="experience-cinematic reveal-on-scroll">
              <div className="experience-cinematic-photo">
                <img
                  key={activeExperience}
                  className="experience-scene-image"
                  src={experienceScenes[activeExperience].image}
                  alt={experienceScenes[activeExperience].alt}
                />

                <div className="experience-cinematic-overlay" />

                <div className="experience-cinematic-content">
                  <span>
                    {experienceScenes[activeExperience].number}
                    {' / '}
                    {experienceScenes[activeExperience].eyebrow}
                  </span>

                  <h3 key={`title-${activeExperience}`}>
                    {experienceScenes[activeExperience].title}
                  </h3>

                  <p key={`description-${activeExperience}`}>
                    {experienceScenes[activeExperience].description}
                  </p>
                </div>

                <div className="experience-cinematic-bottom">
                  <span>MAISON / THE EXPERIENCE</span>
                  <span>
                    {experienceScenes[activeExperience].number} / 03
                  </span>
                </div>
              </div>

              <div
                className="experience-cinematic-navigation"
                role="group"
                aria-label="Explore the MAISON experience"
              >
                {experienceScenes.map((scene, index) => (
                  <button
                    key={scene.number}
                    type="button"
                    className={
                      activeExperience === index
                        ? 'experience-cinematic-tab active'
                        : 'experience-cinematic-tab'
                    }
                    onClick={() => setActiveExperience(index)}
                    aria-pressed={activeExperience === index}
                  >
                    <span>{scene.number}</span>
                    <span>{scene.eyebrow}</span>
                    <span>↗</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="experience-outro">
              <span>YOUR NEXT CHAPTER BEGINS HERE</span>
              <a href="#reservation">
                RESERVE YOUR EVENING <span>↗</span>
              </a>
            </div>
          </div>
        </section>

        <MaisonAtmosphere />

        <Reservations />
      </main>

      <MaisonFooter />
      <MaisonEffects />
    </div>
  )
}

export default App
