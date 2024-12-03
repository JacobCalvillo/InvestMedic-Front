import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"

interface cardprops {
    title: string
    description?: string
    content?: string
    icon?: React.ReactNode
    component?: React.ReactNode
    className?: string
}

export const CustomUserCard = ({ title, description, content, icon, component, className }: cardprops) => {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}  {icon}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="text-white text-2xl font-bold">
                {content || component}  
            </CardContent>
        </Card>
    )
}