import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Image from 'next/image'

const ClientCard = ({ item, id }: { item: { logo: string }, id: string }) => {
    const { attributes, listeners, setNodeRef, transform } = useSortable({
        id,
    })
    const style = {
        transition: 'transform 0.2s ease-in-out',
        transform: CSS.Transform.toString(transform),
    }

    return (
        <div ref={setNodeRef} style={style} className='flex items-center justify-between border p-2 rounded-md' {...attributes} {...listeners} key={id}>
            <div>
                <Image src={item.logo} alt="Logo" width={100} height={100} />
            </div>
        </div>
    )
}

export default ClientCard