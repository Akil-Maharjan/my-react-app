import React from 'react'

function Quotes() {
    const quotes = [
    {
      "id": 1,
      "quote": "Your heart is the size of an ocean. Go find yourself in its hidden depths.",
      "author": "Rumi"
    },
    {
      "id": 2,
      "quote": "The Bay of Bengal is hit frequently by cyclones. The months of November and May, in particular, are dangerous in this regard.",
      "author": "Abdul Kalam"
    },
    {
      "id": 3,
      "quote": "Thinking is the capital, Enterprise is the way, Hard Work is the solution.",
      "author": "Abdul Kalam"
    },
    {
      "id": 4,
      "quote": "If You Can'T Make It Good, At Least Make It Look Good.",
      "author": "Bill Gates"
    },
    {
      "id": 5,
      "quote": "Heart be brave. If you cannot be brave, just go. Love's glory is not a small thing.",
      "author": "Rumi"
    },
  ];
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 p-6'>
      <h1 className='text-3xl font-bold mb-6 text-green-800'>Inspirational Quotes</h1>
      {quotes.map((quote) => (
        <div key={quote.id} className='bg-white rounded-lg shadow-md p-4 mb-4 max-w-md w-full'>
          <p className='text-gray-800'>" {quote.quote} "</p>
          <p className='text-gray-600 text-sm'>- {quote.author}</p>
        </div>
      ))}
    </div>
  )
}

export default Quotes