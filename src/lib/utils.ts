import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const bgColorOnDate = (date: Date) => {
  const today = new Date();
  
  if(date.getDay() > today.getDay()) {
    return 'bg-red-500';
  }
  if(date.getDay() === today.getDay()) {
    return 'bg-green-500' ;
  }
  if(date.getDay() < today.getDay()) {
    return 'bg-yellow-500';
  }
}

export const displayCurrentTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes}:${seconds} ${ampm} `;
}

export const sections = [
  {
    title: "Citas",
    items: [
      {
        title: "Agendar cita",
        href: '/appointment',
        description:
          "",
      },
      {
        title: "Cancelar Cita",
        href: "/docs",
        description:
          "",
      },
      {
        title: "Ver Citas",
        href: "/docs/installation",
        description: "Visualizar citas anteriores",
      },
      {
        title: "Reprogramar cita",
        href: "/docs/primitives/typography",
        description: "Modificar una cita existente",
      },
    ],
  },
];