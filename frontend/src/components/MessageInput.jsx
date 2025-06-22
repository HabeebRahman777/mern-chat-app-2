import React,{useState} from 'react'
import { useChatStore } from '../store/useChatStore'

const MessageInput = () => {
    const [text,setText] =useState("")
    const {sendMessage}=useChatStore()

    const handleMessage=async(e)=>{
      e.preventDefault()
      if(!text.trim) return

      try {
        await sendMessage({
          text:text.trim()
        })
        setText("")
      } catch (error) {
        console.error("Failed to send message:", error);
      }

    }

    // const handleImage=async()=>{

    // }

  return (
    <div className='bg-violet-800 '>
        <form onSubmit={handleMessage}
              className='flex justify-between p-2'
              >
            <div>
               <input 
                type="text" 
                placeholder='Type a message...'
                value={text}
                onChange={(e)=>setText(e.target.value)}
                />
                {/* <input 
                 type="file"
                 accept="image/*"
                 onChange={handleImage}
                 /> */}
            </div>
            <button
            type='submit'
            className=''

            >
              Send
            </button>
        </form>
    </div>
  )
}

export default MessageInput