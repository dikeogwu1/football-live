import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { FaChevronLeft, FaTimes } from 'react-icons/all'
import axios from 'axios'
// info css
import './info.css'

const MatchInfo = () => {
  const [match, setMatch] = useState([])
  const { id } = useParams()

  const getToday = async () => {
    try {
      const items = await axios({
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
        params: { id: id },
        headers: {
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_FOOTBALL_LOCK,
        },
      })

      if (items.data.response.length > 0) {
        setMatch(items.data.response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getToday()
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [match])

  useEffect(() => {
    let scores = setInterval(getToday, 45000)
    return () => {
      clearInterval(scores)
    }
  }, [])

  if (match.length < 1) {
    return (
      <main className='info-container'>
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
    <main className='info-container'>
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
            const { goals, score, teams, fixture, events } = single
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
                  {fixture.status.short === '1H' ||
                  fixture.status.short === '2H' ||
                  fixture.status.short === 'HT' ||
                  fixture.status.short === 'ET' ||
                  fixture.status.short === 'FT' ? (
                    <div className='info-team-box'>
                      <h2 className='score-info'>
                        <span>{goals.home} </span>
                        <span>-</span> <span>{goals.away}</span>
                      </h2>
                      <div>
                        {fixture.status.short === '1H' ||
                        fixture.status.short === '2H' ? (
                          <h3 className={`${active}`}>
                            {fixture.status.elapsed}
                          </h3>
                        ) : (
                          <h3>{fixture.status.short}</h3>
                        )}
                      </div>
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
                <section className='second-info'>
                  <article className='info-event'>
                    {events.map((item, index) => {
                      let position = 'left'
                      if (item.team.name === teams.away.name) {
                        position = 'right'
                      }

                      let order = 'left-side'
                      if (item.team.name !== teams.away.name) {
                        order = 'right-side'
                      }

                      const { assist, detail, player, time, type } = item
                      return (
                        <div key={index}>
                          <article className='info-event-wrapper'>
                            <h4 className='real-event-time'>
                              {time.extra === null ? time.elapsed : time.extra}
                            </h4>

                            <div className={`real-event ${position}`}>
                              <div className='info-event-score '>
                                {type === 'Goal' ? (
                                  <div className='goal'>
                                    <div
                                      className={`goal-ball-img-wrapper ${order}`}
                                    >
                                      <img
                                        src='https://res.cloudinary.com/dikeogwu1/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1637623388/football/photo-1589467785902-054ed88148d8_g50zpi.jpg'
                                        alt='ball'
                                      />
                                    </div>

                                    <div className='goal-scorer'>
                                      <h4>{player.name}</h4>
                                      <p>{assist.name ? assist.name : ''}</p>
                                    </div>
                                  </div>
                                ) : (
                                  ''
                                )}
                              </div>
                              <aside>
                                {detail === 'Penalty' && type === 'Goal' ? (
                                  <div className='goal'>
                                    <h5 className={`score-info ${order}`}>
                                      PENALTY
                                    </h5>

                                    <div className='goal-scorer'>
                                      <p>{''}</p>
                                    </div>
                                  </div>
                                ) : (
                                  ''
                                )}
                              </aside>
                              <aside>
                                {detail === 'Penalty' && type !== 'Goal' ? (
                                  <h4 className='missed-pen-box'>
                                    <h4 className={`missed-pen ${order}`}>
                                      <div>PEN</div>
                                      <FaTimes className='missed-pen-icon' />
                                    </h4>
                                    <h4 className='missed-pen-name'>
                                      {player.name}
                                    </h4>
                                  </h4>
                                ) : (
                                  ''
                                )}
                              </aside>
                              <aside>
                                {type === 'subst' ? (
                                  <div className='goal'>
                                    <h4 className={`score-info ${order}`}>
                                      SUB
                                    </h4>

                                    <div className='goal-scorer'>
                                      <h4>{player.name}</h4>
                                      <p>{assist.name ? assist.name : ''}</p>
                                    </div>
                                  </div>
                                ) : (
                                  ''
                                )}
                              </aside>
                              <aside>
                                {detail === 'Yellow Card' ? (
                                  <div className='card'>
                                    <div
                                      className={`yellow-card ${order}`}
                                    ></div>
                                    <h4>{player.name}</h4>
                                  </div>
                                ) : (
                                  ''
                                )}
                              </aside>
                              <aside>
                                {detail === 'Red Card' ? (
                                  <div className='card'>
                                    <div className={`red-card ${order}`}></div>
                                    <h4>{player.name}</h4>
                                  </div>
                                ) : (
                                  ''
                                )}
                              </aside>
                            </div>
                          </article>
                          <div className='underline'></div>
                        </div>
                      )
                    })}
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

export default MatchInfo
