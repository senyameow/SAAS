import React from 'react'

interface GradientProps {
    from?: string;
    to?: string;
    rotate?: string
}

const Gradient = ({ from = '#9180Fc', to = '#FF9151', rotate = '20deg' }: GradientProps) => {
    return (
        <div className="relative">
            <div aria-hidden='true' className="absolute  border isolate inset-x-0 -top-30 -z-10 opacity-70 transition blur-2xl sm:-top-80">
                <div style={{ clipPath: `polygon(24.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 55.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 70.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)` }} className={`relative opacity-50 w-[45rem] left-[calc(50%-11rem)] sm:left-[calc(50%-30rem)] -translate-x-1/2 -rotate-[${rotate}] aspect-[1200/700] bg-gradient-to-tr from-[${from}] to-[${to}]`} />
            </div>
        </div>
    )
}

export default Gradient