import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.scss'

const App = () => {
  const [loading, setLoading] = useState(false)
  const [author, setAuthor] = useState('')
  const [quote, setQuote] = useState('')

  useEffect(() => {
    setQuote()
  }, [])

  const getQuote = async () => {
    setLoading(true)
    try {
      const response = await axios.get('https://api.quotable.io/random')
      const data = response.data
      setAuthor(data.author)
      setQuote(data.content)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }


  return (
    <div id="quote-box" className="quote-box">
      {loading ? (
        <p id="loading" className="loading">
          Loading...
        </p>
      ) : (
        <>
          <p id="text" className="text">
            {quote}
          </p>
          
          {author && (  
            <p id="author" className="author">
              - {author}
            </p>
          )}
        </>
      )}
      
      <button id="new-quote" className="new-quote" onClick={getQuote}>
        New Quote
      </button>

      <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${quote} - ${author}`} target="_blank" rel="noopener noreferrer" className="tweet-quote">
        Tweet Quote
      </a>
    </div>
  )
}

export default App