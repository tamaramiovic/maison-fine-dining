
import { useState } from 'react'
import './Reservations.css'

type Step = 1 | 2 | 3 | 4

type RestaurantTable = {
  id: string
  seats: number
  x: number
  y: number
  shape: 'round' | 'square'
}

const tables: RestaurantTable[] = [
  { id: 'T01', seats: 2, x: 18, y: 22, shape: 'round' },
  { id: 'T02', seats: 2, x: 42, y: 22, shape: 'round' },
  { id: 'T03', seats: 4, x: 72, y: 22, shape: 'square' },
  { id: 'T04', seats: 2, x: 18, y: 51, shape: 'round' },
  { id: 'T05', seats: 4, x: 45, y: 51, shape: 'square' },
  { id: 'T06', seats: 4, x: 74, y: 51, shape: 'square' },
  { id: 'T07', seats: 2, x: 18, y: 79, shape: 'round' },
  { id: 'T08', seats: 6, x: 47, y: 79, shape: 'square' },
  { id: 'T09', seats: 4, x: 76, y: 79, shape: 'square' },
]

const times = [
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
]

const formatDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

const today = new Date()
today.setHours(0, 0, 0, 0)

const todayString = formatDate(today)

function Reservations() {
  const [step, setStep] = useState<Step>(1)
  const [date, setDate] = useState(todayString)
  const [guests, setGuests] = useState(2)
  const [time, setTime] = useState('19:00')
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [occasion, setOccasion] = useState('')
  const [requests, setRequests] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [reference, setReference] = useState('')

  const chosenTable = tables.find((table) => table.id === selectedTable)

  const unavailableTables = new Set(
    date === todayString && time === '19:00'
      ? ['T02', 'T06']
      : date === todayString && time === '20:00'
        ? ['T03', 'T05']
        : []
  )

  const isAvailable = (table: RestaurantTable) =>
    table.seats >= guests && !unavailableTables.has(table.id)

  const availableCount = tables.filter(isAvailable).length

  const readableDate = new Date(`${date}T12:00:00`).toLocaleDateString(
    'en-GB',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  )

  const resetReservation = () => {
    setStep(1)
    setDate(todayString)
    setGuests(2)
    setTime('19:00')
    setSelectedTable(null)
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhone('')
    setOccasion('')
    setRequests('')
    setAccepted(false)
    setReference('')
  }

  const submitReservation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!chosenTable || !isAvailable(chosenTable) || !accepted) {
      return
    }

    setReference(
      `MSN-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    )
    setStep(4)
  }

  return (
    <section className="maison-reservations" id="reservation">
      <div className="reservation-container">
        <div className="reservation-topline">
          <span>04 / RESERVATIONS</span>
          <span>YOUR EVENING BEGINS HERE</span>
        </div>

        <div className="reservation-heading">
          <span className="reservation-eyebrow">
            A SEAT AT MAISON
          </span>
          <h2>
            Your table.
            <br />
            <em>Your moment.</em>
          </h2>
          <p>
            Every memorable evening begins with a reservation.
            Allow us to take care of the rest.
          </p>
        </div>

        <div className="reservation-workspace">
          <div className="reservation-sidebar">
            <span className="reservation-sidebar-label">
              THE RESERVATION
            </span>

            <h3>
              An evening
              <br />
              to remember.
            </h3>

            <p>
              From the first welcome to the final glass,
              every detail is considered.
            </p>

            <div className="reservation-steps">
              {[
                ['01', 'DATE & TIME'],
                ['02', 'YOUR TABLE'],
                ['03', 'YOUR DETAILS'],
              ].map(([number, label], index) => (
                <div
                  key={number}
                  className={`reservation-step ${
                    step === index + 1 ? 'active' : ''
                  } ${step > index + 1 ? 'completed' : ''}`}
                >
                  <span>{number}</span>
                  <span>{label}</span>
                  <span>
                    {step > index + 1 ? '✓' : '—'}
                  </span>
                </div>
              ))}
            </div>

            <div className="reservation-sidebar-bottom">
              <span>MAISON RESTAURANT & DINING</span>
              <span>MORE THAN A TABLE.</span>
            </div>
          </div>

          <div className="reservation-panel">
            {step === 1 && (
              <div className="reservation-stage">
                <div className="reservation-stage-top">
                  <span>STEP 01 / 03</span>
                  <span>THE BEGINNING</span>
                </div>

                <h3>When shall we expect you?</h3>
                <p className="reservation-stage-description">
                  Choose the date, party size and time that suits you.
                </p>

                <div className="reservation-fields">
                  <label className="reservation-field">
                    <span>YOUR DATE</span>
                    <input
                      type="date"
                      value={date}
                      min={todayString}
                      onChange={(event) => {
                        setDate(event.target.value)
                        setSelectedTable(null)
                      }}
                    />
                  </label>

                  <label className="reservation-field">
                    <span>NUMBER OF GUESTS</span>
                    <select
                      value={guests}
                      onChange={(event) => {
                        setGuests(Number(event.target.value))
                        setSelectedTable(null)
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6].map((number) => (
                        <option key={number} value={number}>
                          {number} {number === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="reservation-time-section">
                  <span className="reservation-field-title">
                    PREFERRED TIME
                  </span>

                  <div className="reservation-time-grid">
                    {times.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        className={`reservation-time ${
                          time === slot ? 'selected' : ''
                        }`}
                        onClick={() => {
                          setTime(slot)
                          setSelectedTable(null)
                        }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="reservation-actions">
                  <span>AN EVENING AT MAISON</span>
                  <button
                    type="button"
                    className="reservation-primary"
                    onClick={() => setStep(2)}
                    disabled={!date}
                  >
                    SELECT YOUR TABLE <span>↗</span>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="reservation-stage">
                <div className="reservation-stage-top">
                  <span>STEP 02 / 03</span>
                  <span>THE PERFECT SPOT</span>
                </div>

                <h3>Find your place.</h3>

                <p className="reservation-stage-description">
                  Select a table for {guests}{' '}
                  {guests === 1 ? 'guest' : 'guests'} on{' '}
                  {readableDate} at {time}.
                </p>

                <div className="reservation-floorplan">
                  <div className="reservation-floorplan-top">
                    <span>MAISON / DINING ROOM</span>
                    <span>FLOOR PLAN</span>
                  </div>

                  <div className="reservation-floorplan-area">
                    <span className="reservation-floorplan-window">
                      WINDOW VIEW
                    </span>

                    <div className="reservation-floorplan-window-line" />

                    {tables.map((table) => {
                      const available = isAvailable(table)
                      const selected = selectedTable === table.id

                      return (
                        <button
                          key={table.id}
                          type="button"
                          disabled={!available}
                          onClick={() => setSelectedTable(table.id)}
                          className={`reservation-table ${table.shape} ${
                            selected ? 'selected' : ''
                          } ${!available ? 'unavailable' : ''}`}
                          style={{
                            left: `${table.x}%`,
                            top: `${table.y}%`,
                          }}
                          aria-label={`Table ${table.id}, ${table.seats} seats${
                            available ? ', available' : ', unavailable'
                          }`}
                          aria-pressed={selected}
                        >
                          <span>{table.id}</span>
                          <small>{table.seats} SEATS</small>
                        </button>
                      )
                    })}

                    <div className="reservation-floorplan-entrance">
                      <span>ENTRANCE</span>
                      <span>↑</span>
                    </div>

                    <span className="reservation-floorplan-bar">
                      BAR & LOUNGE
                    </span>
                  </div>
                </div>

                <div className="reservation-legend">
                  <span>
                    <i className="available" /> AVAILABLE
                  </span>
                  <span>
                    <i className="selected" /> SELECTED
                  </span>
                  <span>
                    <i className="unavailable" /> UNAVAILABLE
                  </span>
                </div>

                <div className="reservation-table-summary">
                  {chosenTable ? (
                    <>
                      <span>YOUR SELECTED TABLE</span>
                      <strong>
                        TABLE {chosenTable.id} · {chosenTable.seats} SEATS
                      </strong>
                    </>
                  ) : (
                    <>
                      <span>CHOOSE YOUR TABLE</span>
                      <strong>
                        {availableCount} SUITABLE TABLES SHOWN
                      </strong>
                    </>
                  )}
                </div>

                <div className="reservation-actions">
                  <button
                    type="button"
                    className="reservation-back"
                    onClick={() => setStep(1)}
                  >
                    ← BACK
                  </button>

                  <button
                    type="button"
                    className="reservation-primary"
                    disabled={!chosenTable || !isAvailable(chosenTable)}
                    onClick={() => setStep(3)}
                  >
                    CONTINUE <span>↗</span>
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form
                className="reservation-stage"
                onSubmit={submitReservation}
              >
                <div className="reservation-stage-top">
                  <span>STEP 03 / 03</span>
                  <span>THE FINAL TOUCH</span>
                </div>

                <h3>Make it yours.</h3>

                <p className="reservation-stage-description">
                  Just a few details before your evening is arranged.
                </p>

                <div className="reservation-review">
                  <span>{readableDate}</span>
                  <span>{time}</span>
                  <span>{guests} GUESTS</span>
                  <span>TABLE {selectedTable}</span>
                </div>

                <div className="reservation-fields">
                  <label className="reservation-field">
                    <span>FIRST NAME *</span>
                    <input
                      required
                      type="text"
                      autoComplete="given-name"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      placeholder="First name"
                    />
                  </label>

                  <label className="reservation-field">
                    <span>LAST NAME *</span>
                    <input
                      required
                      type="text"
                      autoComplete="family-name"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      placeholder="Last name"
                    />
                  </label>

                  <label className="reservation-field">
                    <span>EMAIL ADDRESS *</span>
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                    />
                  </label>

                  <label className="reservation-field">
                    <span>PHONE NUMBER *</span>
                    <input
                      required
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="+381..."
                    />
                  </label>

                  <label className="reservation-field reservation-full">
                    <span>SPECIAL OCCASION</span>
                    <select
                      value={occasion}
                      onChange={(event) => setOccasion(event.target.value)}
                    >
                      <option value="">No special occasion</option>
                      <option>Birthday</option>
                      <option>Anniversary</option>
                      <option>Celebration</option>
                      <option>Business dinner</option>
                      <option>Other</option>
                    </select>
                  </label>

                  <label className="reservation-field reservation-full">
                    <span>SPECIAL REQUESTS</span>
                    <textarea
                      rows={3}
                      value={requests}
                      onChange={(event) => setRequests(event.target.value)}
                      placeholder="Anything we should know?"
                    />
                  </label>
                </div>

                <label className="reservation-consent">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(event) => setAccepted(event.target.checked)}
                    required
                  />
                  <span>
                    I understand this is a demonstration reservation
                    for a portfolio concept and not a real restaurant booking.
                  </span>
                </label>

                <div className="reservation-actions">
                  <button
                    type="button"
                    className="reservation-back"
                    onClick={() => setStep(2)}
                  >
                    ← BACK
                  </button>

                  <button
                    type="submit"
                    className="reservation-primary"
                    disabled={!accepted}
                  >
                    COMPLETE DEMO <span>↗</span>
                  </button>
                </div>
              </form>
            )}

            {step === 4 && (
              <div className="reservation-confirmation">
                <div className="reservation-confirmation-icon">
                  ✓
                </div>

                <span className="reservation-eyebrow">
                  YOUR MAISON EXPERIENCE
                </span>

                <h3>
                  A moment
                  <br />
                  <em>to look forward to.</em>
                </h3>

                <p>
                  Thank you, {firstName}. Your demonstration
                  reservation has been completed.
                </p>

                <div className="reservation-confirmation-details">
                  <div>
                    <span>REFERENCE</span>
                    <strong>{reference}</strong>
                  </div>
                  <div>
                    <span>DATE</span>
                    <strong>{readableDate}</strong>
                  </div>
                  <div>
                    <span>TIME</span>
                    <strong>{time}</strong>
                  </div>
                  <div>
                    <span>PARTY</span>
                    <strong>{guests} GUESTS</strong>
                  </div>
                  <div>
                    <span>TABLE</span>
                    <strong>{selectedTable}</strong>
                  </div>
                  <div>
                    <span>GUEST</span>
                    <strong>
                      {firstName} {lastName}
                    </strong>
                  </div>
                </div>

                <p className="reservation-demo-note">
                  Portfolio demonstration only. No reservation has
                  been sent to a restaurant or stored online.
                </p>

                <button
                  type="button"
                  className="reservation-primary"
                  onClick={resetReservation}
                >
                  MAKE ANOTHER RESERVATION <span>↗</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="reservation-footer">
          <span>MAISON — EST. 2026</span>
          <span>MORE THAN A TABLE.</span>
        </div>
      </div>
    </section>
  )
}

export default Reservations
