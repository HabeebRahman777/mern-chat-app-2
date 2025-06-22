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
    <div>
        <form onSubmit={handleMessage}>
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
                 <button
                 type='submit'
                 className=''

                 >
                    Send
                 </button>
            </div>
        </form>
    </div>
  )
}

export default MessageInput