import { Skeleton } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex flex-col h-full w-full gap-5 px-5 py-10'>
      <section className='flex gap-5'>
        <Skeleton animation="wave" variant='circular' width={40} height={40} />
        <section className='flex flex-col'>
          <Skeleton animation="wave" width={80} height={10} style={{marginBottom: 6}} />
          <Skeleton animation="wave"  width={80} height={10} />
        </section>
      </section>
      <Skeleton animation="wave" sx={{height: 190}} variant='rectangular' />
      <Skeleton animation="wave" height={10} style={{marginBottom: 6}} />
      <Skeleton animation="wave" width="80%" height={10} />

    </div>
  )
}

export default Loading