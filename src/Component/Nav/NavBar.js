import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { VscCalendar, FiSearch, FaTimes } from 'react-icons/all'
// navBar css
import './navBar.css'
// import global store
import { useGlobalContext } from '../Store/Context'
import Calendar from './Calendar'

// months array
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
// weekdays array
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const NavBar = () => {
  const [isCalOpen, setIsCalOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const inputContainer = useRef(null)
  const { setSearch } = useGlobalContext()

  // get dates
  let aheadDate = new Date()
  let aheadDay = aheadDate.getDate()
  let aheadMonth = aheadDate.getMonth()
  let aheadYear = aheadDate.getFullYear()

  const getDays = (num) => {
    // future dates
    const upFront = new Date(aheadYear, aheadMonth, aheadDay + num, 11, 30, 0)

    let month = upFront.getMonth()
    month = months[month]
    const weekday = weekdays[upFront.getDay()]
    const date = upFront.getDate()
    return [{ w: weekday, d: date, m: month }]
  }

  const getPastDays = (num) => {
    // future dates
    const upFront = new Date(aheadYear, aheadMonth, aheadDay - num, 11, 30, 0)

    let month = upFront.getMonth()
    month = months[month]
    const weekday = weekdays[upFront.getDay()]
    const date = upFront.getDate()
    return [{ w: weekday, d: date, m: month }]
  }

  // handle fprm submition
  const handleSub = (e) => {
    e.preventDefault()
    const value = inputContainer.current.value
    const rem = value.slice(1, value.length)
    let firstLetter = value.charAt(0).toUpperCase()
    const newValue = firstLetter + rem
    setSearch(newValue)
  }

  return (
    <div className='nav-container'>
      <section className='logo-box'>
        <div className='logo-img-wrapper'>
          <img
            src='https://res.cloudinary.com/dikeogwu1/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1637623388/football/photo-1589467785902-054ed88148d8_g50zpi.jpg'
            alt='ball'
          />
        </div>
        <Link to='/'>
          <h3 className='logo-tittle'>
            <span className='l-football'>football</span>
            <span className='l-live'>Live</span>
          </h3>
        </Link>

        <button
          className='search-nav-btn search-opener'
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          {isSearchOpen ? (
            <FaTimes className='search-nav-icon' />
          ) : (
            <FiSearch className='search-nav-icon' />
          )}
        </button>

        <div className={`${isSearchOpen ? 'show-nav-form' : 'nav-form'}`}>
          <form onSubmit={handleSub}>
            <input
              type='text'
              placeholder='E.g England, Spain, etc '
              className='search-input'
              ref={inputContainer}
            />
            <button type='submit' className='search-nav-btn'>
              <FiSearch className='search-nav-icon' />
            </button>
          </form>
        </div>
      </section>
      <section className='match-day-wrapper'>
        <Link to='/live' className='live-link'>
          <button>Live</button>
        </Link>
        {/* two days ago */}
        <div className='match-day'>
          {getPastDays(2).map((day, index) => {
            const { w, d, m } = day
            return (
              <Link
                to={`/days/${new Date().getFullYear()}-${
                  months.indexOf(m) + 1
                }-${d}`}
                key={index}
                className='match-day-link'
              >
                <h4>{w}</h4>
                <h4>
                  <span>{d}</span> <span>{m}</span>
                </h4>
              </Link>
            )
          })}
        </div>
        {/* one day ago */}
        <div className='match-day'>
          {getPastDays(1).map((day, index) => {
            const { w, d, m } = day
            return (
              <Link
                to={`/days/${new Date().getFullYear()}-${
                  months.indexOf(m) + 1
                }-${d}`}
                key={index}
                className='match-day-link'
              >
                <h4>{w}</h4>
                <h4>
                  <span>{d}</span> <span>{m}</span>
                </h4>
              </Link>
            )
          })}
        </div>

        {/* today */}
        <div className='match-day'>
          {getDays(0).map((day, index) => {
            const { d, m } = day
            return (
              <Link to='/' key={index} className='match-day-link'>
                <h4>today</h4>
                <h4>
                  <span>{d}</span> <span>{m}</span>
                </h4>
              </Link>
            )
          })}
        </div>

        {/* tomorrow */}
        <div className='match-day'>
          {getDays(1).map((day, index) => {
            const { w, d, m } = day
            return (
              <Link
                to={`/days/${new Date().getFullYear()}-${
                  months.indexOf(m) + 1
                }-${d}`}
                key={index}
                className='match-day-link'
              >
                <h4>{w}</h4>
                <h4>
                  <span>{d}</span> <span>{m}</span>
                </h4>
              </Link>
            )
          })}
        </div>

        {/* next tomorrow */}
        <div className='match-day'>
          {getDays(2).map((day, index) => {
            const { w, d, m } = day
            return (
              <Link
                to={`/days/${new Date().getFullYear()}-${
                  months.indexOf(m) + 1
                }-${d}`}
                key={index}
                className='match-day-link'
              >
                <h4>{w}</h4>
                <h4>
                  <span>{d}</span> <span>{m}</span>
                </h4>
              </Link>
            )
          })}
        </div>
        <article className='calendar-wrapper match-day'>
          <div className='calendar' onClick={() => setIsCalOpen(!isCalOpen)}>
            <VscCalendar />
          </div>
          <div
            className={`${
              isCalOpen ? 'calendar-item show-calendar' : 'calendar-item'
            }`}
          >
            <Calendar />
          </div>
        </article>
      </section>
    </div>
  )
}

export default NavBar
