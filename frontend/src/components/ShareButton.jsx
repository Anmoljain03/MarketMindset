// components/ShareButton.jsx
import React from 'react'

const ShareButton = () => {
  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: 'Check out this blog!',
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      // Fallback for desktop browsers
      alert('Your browser does not support the Web Share API.')
    }
  }

  return (
    <button
      onClick={handleShare}
      className="w-full  text-white font-normal py-2 text-left  rounded hover:text-orange-400 transition duration-300"
    >
      📤 Share This Blog
    </button>
  )
}

export default ShareButton
