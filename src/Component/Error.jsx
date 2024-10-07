import React from 'react'

function Error({error}) {
  return (
    <div className="error-screen">
    <div className="error-box">
      <h1 className="error-title">Oops! Something went wrong</h1>
      <p className="error-message">{error}</p>
      <button className="retry-button" onClick={() => window.location.reload()}>
        Try Again
      </button>
    </div>
  </div>
  )
}

export default Error