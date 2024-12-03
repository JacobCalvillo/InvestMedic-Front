import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);


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