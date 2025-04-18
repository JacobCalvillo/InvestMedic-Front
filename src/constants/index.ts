import { CreditCard, Wallet, BadgeDollarSign } from "lucide-react";

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATEPICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton',
    PASSWORD = 'password',
    RANGE = 'range',
    COLOR = 'color',
}


export const GenderOptions = ["Male", "Female", "Other"];


export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const methods = [ 
  {
    value: "debit",
    label: "Debit Card",
    icon: Wallet,
  },
  {
    value: "credit",
    label: "Credit Card",
    icon: CreditCard,
  },
  {
    value: "cash",
    label: "Cash",
    icon: BadgeDollarSign,
  }
 ]

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};

