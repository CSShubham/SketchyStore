import React from 'react'

function Loading() {
  return (
    <div className="w-full  h-screen flex items-center flex-col justify-center">
      
        <img className=' w-100 h-100 md:w-152 md:h-152 rounded-full animate-pulse' src="Mascot.jpeg" alt={<div className="animate-spin rounded-full h-52 w-52 border-b-4 border-[#ff375c]"></div>} />
      <p className="text-xl font-semibold ml-4">Loading...</p>
    </div>
  )
}

export default Loading
