import Image from 'next/image'
import React from 'react'
import {assets} from '@/public/assets/assets'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='border-b '>
        <div className='left-spacing flex items-center justify-between'>
            <div className='logodv'>
                    <Image src={assets.logo} width={200} height={100} alt='gcc' />
            </div>
            <div className='rghtsc flex'>
                <div>

                </div>
                <div className='bg-primary px-5 h-[100px]'>
                    <Link href={'#'} className='border rounded-full px-5 leading-1 border-white text-white'>Contact</Link>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header