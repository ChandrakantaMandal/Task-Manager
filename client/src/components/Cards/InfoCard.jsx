import React from 'react'

const InfoCard = ({icon,lable,value,color}) => {
  return (
    <div className='bg-white rounded-lg p-4 shadow-sm border border-gray-200'>
      <div className='flex items-center gap-3'>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white text-xl`}>
          {icon}
        </div>
        <div>
          <p className='text-2xl font-bold text-gray-900'>{value}</p>
          <p className='text-sm text-gray-600'>{lable}</p>
        </div>
      </div>
    </div>
  )
}

export default InfoCard