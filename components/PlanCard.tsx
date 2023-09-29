import { cn } from '@/lib/utils'
import React from 'react'

interface PlanCardProps {
    name: string;
    description: string;
    plan: 'free' | 'pro'
}

const PlanCard = ({ name, description, plan }: PlanCardProps) => {
    return (
        <div className={cn(`min-h-fit px-4 py-6 rounded-lg shadow-md min-w-[350px] border `, plan === 'pro' ? 'border-blue-700 border-2 ' : 'border-neutral-400 border')}>

        </div>
    )
}

export default PlanCard