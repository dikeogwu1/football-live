import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowUp } from 'react-icons/all'
// home css
import './home.css'
import axios from 'axios'
// import global store
import { useGlobalContext } from '../Store/Context'

const Home = () => {
  const [match, setMatch] = useState([])
  const [loading, setLoading] = useState(true)
  const [arrow, setArrow] = useState(false)
  const { search, setSearch } = useGlobalContext()

  const getToday = async () => {
    setLoading(true)
    try {
      const items = await axios({
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
        params: { date: '2021-11-24' },
        headers: {
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
          'x-rapidapi-key':
            'cad7c7031emsh798561616d11f58p16bfb4jsn77d0d197d02c',
        },
      })

      if (items.data.response.length > 0 && !search) {
        setMatch(items.data.response)
        setLoading(false)
        const fill = items.data.response.filter((all) => {
          return all.league.country === search
        })
      } else if (items.data.response.length > 0 && search) {
        setLoading(false)
        const fill = items.data.response.filter((all) => {
          return all.league.country === search
        })
        setMatch(fill)
      } else {
        setLoading(false)
        setMatch([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getToday()
    window.addEventListener('scroll', () => {
      if (window.scrollY > 3000) {
        setArrow(true)
      }
      if (window.scrollY < 4000) {
        setArrow(false)
      }
    })
  }, [search])

  useEffect(() => {
    setSearch('')
  }, [])

  if (loading) {
    return <h1 className='loading'>loading...</h1>
  }

  if (match.length < 1) {
    return (
      <section>
        <h3 className='topic'>today</h3>
        <h1 className='loading'>we could not fined any match</h1>
      </section>
    )
  }

  return (
    <div className='today-container'>
      <section className='todays-wrapper'>
        <h3 className='topic'>today</h3>
        <article className='match-box'>
          {match.map((single) => {
            let active = 'live'
            if (
              single.fixture.status.short === 'FT' ||
              single.fixture.status.short === 'PST' ||
              single.fixture.status.short === 'TBD' ||
              single.fixture.status.long === 'Not Started' ||
              single.fixture.status.short === 'CANC'
            ) {
              active = 'not-live'
            }

            if (single.fixture.status.short === 'NS') {
              single.fixture.status.short = `${new Date(
                single.fixture.date
              ).getHours()}:${new Date(single.fixture.date).getMinutes()} `
            }
            const { fixture, goals, league, teams } = single
            return (
              <div key={fixture.id}>
                {/* country */}
                <section className='country'>
                  <div className='country-img-wrapper'>
                    <img src={league.flag} alt='flag' />
                  </div>
                  <div>
                    <h3>{league.name}</h3>
                    <p>{league.country}</p>
                  </div>
                </section>
                {/* each match */}
                <Link to={`/info/${fixture.id}`} className='single-match'>
                  <h5 className={`${active}`}>{fixture.status.short}</h5>
                  <div className='teams'>
                    {/* home teams */}
                    <div className='teams-wrapper'>
                      <div className='home-team-img-box'>
                        <img src={teams.home.logo} alt='logo' />
                      </div>
                      <h4>{teams.home.name}</h4>
                      <h3>{`${goals.home === null ? '' : goals.home}`}</h3>
                    </div>
                    {/* away teams */}
                    <div className='teams-wrapper away-team'>
                      <div className='home-team-img-box'>
                        <img src={teams.away.logo} alt='logo' />
                      </div>
                      <h4>{teams.away.name}</h4>
                      <h3>
                        {goals.away === null ? (
                          <span className='vs'>VS</span>
                        ) : (
                          goals.away
                        )}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </article>
      </section>
      <button
        className={`${arrow ? 'back-to-top show-arrow' : 'back-to-top'}`}
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <FaArrowUp />
      </button>
    </div>
  )
}

export default Home
