import React from 'react'
import { Button } from './ui/button'

interface ButtonProps {
    type?: 'button' | 'submit'
    isLoading: boolean
    className?: string
    children: React.ReactNode
    disabled?: boolean
    onClick?: () => void
}

const SubmitButton = ({ isLoading, className, children, onClick, type, disabled }: ButtonProps) => {
    return (
        <Button 
            type={type}
            disabled={disabled || isLoading}
            className={className ?? 'shad-primary-btn w-full'}
            onClick={onClick} 
            >
            {isLoading ? (
                <div className='flex items-center gap-4'>
                    <img
                        src={'/infinite-spinner.svg'}
                        alt="loader"
                        width={24}
                        height={24}
                        className='animate-spin'
                        />
                </div>
            ): children}
        </Button>
    )
}

export default SubmitButton;