import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { FaChevronLeft } from 'react-icons/all'
import axios from 'axios'
import './stats.css'

const StatsItem = () => {
  const [match, setMatch] = useState([])
  const [noValue, setNoValue] = useState([{ type: 'Not available', value: '' }])
  const { id } = useParams()

  const getToday = async () => {
    try {
      const items = await axios({
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
        params: { id: id },
        headers: {
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
          'x-rapidapi-key':
            'cad7c7031emsh798561616d11f58p16bfb4jsn77d0d197d02c',
        },
      })

      if (items.data.response.length > 0) {
        setMatch(items.data.response)
      } else {
        setMatch(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getToday()
  }, [id])

  useEffect(() => {
    let scores = setInterval(getToday, 45000)
    return () => {
      clearInterval(scores)
    }
  }, [id])

  if (match.length < 1) {
    return (
      <main className='info-container stats-container'>
        <div className='nav-container info-nav'>
          <section className='logo-box'>
            <Link to='/' className='info-link'>
              <FaChevronLeft />
            </Link>
            <Link to='/live' className='info-link'>
              Live
            </Link>
            <div className='logo-img-wrapper info-logo-wrapper'>
              <img
                src='https://res.cloudinary.com/dikeogwu1/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1637623388/football/photo-1589467785902-054ed88148d8_g50zpi.jpg'
                alt='ball'
              />
            </div>
            <Link to={`/stats/${id}`} className='info-link'>
              stats
            </Link>
            <Link to='/'>
              <h3 className='logo-tittle'>
                <span className='l-football info-brand'>football</span>
                <span className='l-live info-brand'>Live</span>
              </h3>
            </Link>
          </section>
        </div>
        <section>
          <h2 className='loading'>checking for info...</h2>
        </section>
      </main>
    )
  }

  return (
    <main className='info-container stats-container'>
      <div className='nav-container info-nav'>
        <section className='logo-box'>
          <Link to='/' className='info-link'>
            <FaChevronLeft />
          </Link>
          <Link to='/live' className='info-link'>
            Live
          </Link>
          <div className='logo-img-wrapper info-logo-wrapper'>
            <img
              src='https://res.cloudinary.com/dikeogwu1/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1637623388/football/photo-1589467785902-054ed88148d8_g50zpi.jpg'
              alt='ball'
            />
          </div>
          <Link to={`/info/${id}`} className='info-link'>
            Info
          </Link>
          <Link to='/'>
            <h3 className='logo-tittle'>
              <span className='l-football info-brand'>football</span>
              <span className='l-live info-brand'>Live</span>
            </h3>
          </Link>
        </section>
      </div>
      <section className='info-item-wrapper'>
        <article className='info-box'>
          {match.map((single, index) => {
            let active = 'live'
            if (
              single.fixture.status.short === 'FT' ||
              single.fixture.status.short === 'PST' ||
              single.fixture.status.short === 'TBD' ||
              single.fixture.status.short === 'AET' ||
              single.fixture.status.long === 'Not Started' ||
              single.fixture.status.short === 'CANC'
            ) {
              active = 'not-live'
            }

            if (
              single.fixture.status.short === '1H' ||
              single.fixture.status.short === '2H'
            ) {
              single.fixture.status.short = single.fixture.status.elapsed
            }
            const { goals, score, teams, fixture, events, statistics } = single
            const homeStats = statistics[0]
            const awayStats = statistics[1]
            return (
              <div className='info-item-parent' key={index}>
                {/* first info */}
                <section className='first-info'>
                  {/* home team */}
                  <div className='info-team-box'>
                    <div className='info-team-logo'>
                      <img src={teams.home.logo} alt='logo' />
                    </div>
                    <h4>{teams.home.name}</h4>
                  </div>
                  {/* scores */}
                  {goals.away || goals.home ? (
                    <div className='info-team-box'>
                      <h2 className='score-info'>
                        <span>{goals.home} </span>
                        <span>-</span> <span>{goals.away}</span>
                      </h2>
                      <h3 className={`${active}`}>{fixture.status.short}</h3>
                    </div>
                  ) : (
                    <h3>vs</h3>
                  )}
                  {/* away team */}
                  <div className='info-team-box'>
                    <div className='info-team-logo'>
                      <img src={teams.away.logo} alt='logo' />
                    </div>
                    <h4>{teams.away.name}</h4>
                  </div>
                </section>

                {/* second info */}
                <section className='second-info stats-sec'>
                  <article className='stats-items-box'>
                    {/* home */}
                    <div className='stats-info'>
                      {(statistics.length > 0
                        ? awayStats.statistics
                        : noValue
                      ).map((item, index) => {
                        return (
                          <aside>
                            <div key={index} className='stats-desc'>
                              <h4 className='stats-tittle'>{item.type}</h4>
                              <h4 className='stats-value'> {item.value}</h4>
                            </div>
                            <div className='underline'></div>
                          </aside>
                        )
                      })}
                    </div>
                    {/* away */}
                    <div className='stats-info'>
                      {(statistics.length > 0
                        ? awayStats.statistics
                        : noValue
                      ).map((item, index) => {
                        return (
                          <aside>
                            <div key={index} className='stats-desc'>
                              <h4 className='value-away-1 '>{item.type}</h4>
                              <h4 className='stats-value value-away'>
                                {item.value}
                              </h4>
                            </div>
                            <div className='underline'></div>
                          </aside>
                        )
                      })}
                    </div>
                  </article>
                </section>
              </div>
            )
          })}
        </article>
      </section>
    </main>
  )
}

export default StatsItem
