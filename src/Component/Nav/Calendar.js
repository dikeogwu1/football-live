import React from 'react'
import { Link } from 'react-router-dom'

const dates = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28,
]

const Calendar = () => {
  return (
    <article className='calendar-page'>
      {dates.map((date, index) => {
        return (
          <Link
            to={`/days/${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${date}`}
            key={index}
            className='cal-links'
          >
            <h5>{date}</h5>
          </Link>
        )
      })}
    </article>
  )
}

export default Calendar
