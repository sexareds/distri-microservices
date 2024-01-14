import React ,{useContext, useEffect} from 'react'
import notecontext from '../context/notes/noteContext'

const About = () => {
  const a = useContext(notecontext)  
  return (
    <div>This is about page</div>
  )
}

export default About