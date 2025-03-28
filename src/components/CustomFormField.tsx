import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {FormFieldType} from "@/constants"
import {Input} from "@/components/ui/input"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import DatePicker from "react-datepicker";
import {Control} from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import {Select, SelectContent, SelectValue, SelectTrigger} from "@/components/ui/select"
import {Textarea} from "@/components/ui/textarea"
import {Checkbox} from "@/components/ui/checkbox"
import React from "react";


interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode,
    onChange?: (value:any) => void
}

const RenderField = ({field, props}: { field:any ;props: CustomProps }) => {

    const {iconSrc, iconAlt, placeholder, renderSkeleton, showTimeSelect, dateFormat} = props

    switch (props.fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <img
                            src={iconSrc}
                            alt={iconAlt || "icon"}
                            width={24}
                            height={24}
                            className="ml-2"
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        defaultCountry="MX"
                        placeholder={placeholder}
                        international
                        withCountryCallingCode
                        value={field.value}
                        onChange={field.onChange}
                        numberInputProps={{
                            className: "bg-zinc-900 border rounded shad-input p-1"
                        }}
                    />
                </FormControl>
            )
        case FormFieldType.PASSWORD:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <img
                            src={iconSrc}
                            alt={iconAlt || "icon"}
                            width={24}
                            height={24}
                            className="ml-2"
                        />
                    )}
                    <FormControl>
                        <Input
                            type="password"
                            placeholder={placeholder}
                            {...field}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.DATEPICKER:
            return (
                <div className="flex">
                    {iconSrc && (
                        <img
                            src={iconSrc}
                            alt={iconAlt || "icon"}
                            width={24}
                            height={24}
                            className="ml-2"
                        />
                    )}

                    <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        dateFormat={dateFormat ?? 'dd/MMMM/yyyy'}
                        showTimeSelect={showTimeSelect ?? false}
                        timeInputLabel="Time:"
                        wrapperClassName="w-full"
                        className="bg-zinc-900 border rounded shad-input p-1"
                    />

                </div>
            )
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="shad-select-trigger">
                                <SelectValue
                                    placeholder={placeholder}
                                />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="shad-select-content">
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            )
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        placeholder={placeholder} {...field}
                        className="shad-textarea"
                        disabled={props.disabled}/>
                </FormControl>
            )
        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className="flex items-center gap-4">
                        <Checkbox
                            id={props.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="shad-checkbox"
                        />
                        <label htmlFor={props.name} className="check-label">
                            {props.label}
                        </label>
                    </div>
                </FormControl>
            )
        case FormFieldType.SKELETON:
            return (
                renderSkeleton ? renderSkeleton(field) : null
            )

        default:
            break;
    }
}

const CustomFormField = (props: CustomProps) => {
    const {control, fieldType, name, label} = props
    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => (
                <FormItem className="flex-1">
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}

                    <RenderField field={field} props={props}/>

                    <FormMessage className="shad-error"/>

                </FormItem>
            )}
        />
    );
};

export default CustomFormField;