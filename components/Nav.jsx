"use client";
import Link from 'next/link'
import Image from 'next/image'
import { useState,useEffect } from 'react'

import {signIn,signOut,useSession,getProviders} from 'next-auth/react'
import React from 'react'

const Nav = () => {
    const { data:session}=useSession();
  
    const [providers,setProviders] = useState(null);
    const [toggleDropdown, settoggleDropdown] = useState(false)
    useEffect(()=>{
        const setUpProviders = async () => {
            const response = await getProviders()
            setProviders(response);
        }
        setUpProviders();
    },[])
    const logo = '/assets/images/logo.svg'
  return (
    <nav className=" flex-between w-full mb-16 pt-3">
        <Link href="/" className='flex gap-2 flex-center'>
        <Image src= {logo} alt="PromptVerseLogo" width={30} height={30} className='object-contain'/>
        <p className='logo_text'>PromptVerse</p>
        </Link>
       
        {/* desktop view */}
        <div className='sm:flex hidden'>
        {session?.user ? (
            <div className='flex gap-3 md:gap-5'>
                <Link href='/create-prompt' className='black_btn'>
                Create Post
                </Link>
                <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>
                <Link href="/profile">
                <Image src={session?.user.image}
                 width={37} height={37}
                alt='prodile' className='rounded-full'/>
                </Link>
                

            </div>
            )
            :
             (
                <>
                {providers && Object.values(providers).map((providers)=>(
                    <button type='button' key={providers.name} onClick={()=>signIn(providers.id)
                        
                    } className="black_btn">
                        signIn
                    </button>
                ))}
                </>
            )
        }
        
        </div>
        {/* Mobile View */}
        <div  className='sm:hidden flex relative'>
            {session?.user ? (
                <div className='flex' >
                     <Image src={session?.user.image} width={37} height={37}
                alt='prodile' className='rounded-full' onClick={()=>settoggleDropdown((prev)=>!prev)}/>
                {toggleDropdown && (<div className='dropdown' >
                    <Link href="/profile" className='dropdown_link'
                     onClick={()=>settoggleDropdown(false)}>
                    My Profile
                    </Link>
                    <Link href="/create-prompt" className='dropdown_link' onClick={()=>settoggleDropdown(false)}>Create Prompt</Link>
                    <button type='button' className='mt-5 w-full black_btn'
                     onClick={()=>{settoggleDropdown(false); signOut()

                    }}>
                        Sign Out 
                    </button>
                </div>)}
                </div> 
            ):( <>
                {providers && Object.values(providers).map((providers)=>(
                    <button type='button' key={providers.name} onClick={()=>signIn(providers.id)
                        
                    } className="black_btn">
                        signIn
                    </button>
                ))}
                </>)}

        </div>
    </nav>
  )
}

export default Nav