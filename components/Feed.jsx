"use client"
import { useState,useEffect } from "react"
import PromptCard from "./PromptCard"
const Feed = () => {
  const [searchText, setsearchText] = useState('');
  const handleSearchChange =(e)=>{

  }
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search For a tag or a User" value={searchText} onChange={handleSearchChange}
        required className="search_input peer"></input>
      </form>



    </section>
  )
}

export default Feed