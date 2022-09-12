import React from 'react'
import { useState } from "react";

const FlipCard = ({ frontData, backData, data }) => {
    const [showBack, setShowBack] = useState(false);

    const handleClick = () => {
        setShowBack(!showBack);
    }
    return (
        <div
            className="mb-10"
           
        >
            <div
                className="w-full h-[350px]  flex flex-col bg-transparent  group perspective"
            >
                <div
                    className={`relative preserve-3d ${showBack && "rotate-y-180"} w-full h-full duration-1000`}
                >
                    <div className="absolute backface-hidden rotate-y-0   w-full h-full px-4 md:px-16 flex items-center flex-col justify-center py-6 md:py-8 border rounded-lg bg-white border-gray-300 text-4xl text-gray-800 font-semibold   mb-10">


                        <div className="w-full content-box-text  text-center">

                            {frontData({...data,handleClick})}</div>

                    </div>
                    <div
                        className="absolute rotate-y-180 backface-hidden w-full h-full overflow-hidden px-4 md:px-16 flex items-center flex-col justify-center py-6 md:py-8 border rounded-lg bg-white border-gray-300 text-4xl text-gray-800 font-semibold   mb-10"
                    >
                        <div className='w-full'>

                            <div className="w-full content-box-text  text-center">

                                {backData({...data,handleClick})}</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlipCard;