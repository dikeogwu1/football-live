import React from 'react'
import { Link } from 'react-router-dom'

const dates = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28,
]

// dynamic month
const getCorrectMonth = () => {
  let correctMonth = new Date().getMonth()
  if (correctMonth <= 9) {
    correctMonth = correctMonth + 1
    return '0' + correctMonth
  } else {
    return correctMonth + 1
  }
}

const Calendar = () => {
  return (
    <article className='calendar-page'>
      {dates.map((date, index) => {
        return (
          <Link
            to={`/days/${new Date().getFullYear()}-${getCorrectMonth()}-${
              date > 9 ? date : '0' + date
            }`}
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
