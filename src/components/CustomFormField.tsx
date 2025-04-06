import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string | React.ReactNode,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    readOnly?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode,
    onChange?: (value:any) => void,
    description?: string,
    tooltip?: string,
    isRequired?: boolean,
    className?: string,
    min?: number,
    max?: number,
    step?: number,
    customError?: string,
    autoComplete?: string,
    options?: {label: string, value: string}[],
}

const RequiredIndicator = () => (
    <span className="text-red-500 ml-1">*</span>
);

const FieldTooltip = ({ content }: { content: string }) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <InfoCircledIcon className="h-4 w-4 text-muted-foreground ml-1 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
                <p className="max-w-xs">{content}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

const RenderField = ({field, props, fieldState}: { field: any; props: CustomProps; fieldState: any }) => {
    const {
        iconSrc,
        iconAlt,
        placeholder,
        renderSkeleton,
        showTimeSelect,
        dateFormat,
        disabled,
        readOnly,
        min,
        max,
        step,
        autoComplete,
        options
    } = props;

    const isInvalid = !!fieldState?.error;
    const baseInputClasses = cn(
        "shad-input",
        isInvalid && "border-red-500 focus-visible:ring-red-500",
        readOnly && "opacity-70 cursor-not-allowed",
        props.className
    );

    switch (props.fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className={cn("flex rounded-md border border-dark-500 bg-dark-400", isInvalid && "border-red-500")}>
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
                            disabled={disabled}
                            readOnly={readOnly}
                            autoComplete={autoComplete}
                            className={cn(baseInputClasses, "border-0")}
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
                        disabled={disabled}
                        readOnly={readOnly}
                        numberInputProps={{
                            className: cn("bg-zinc-900 border rounded shad-input p-1",
                                isInvalid && "border-red-500",
                                readOnly && "opacity-70 cursor-not-allowed"
                            )
                        }}
                    />
                </FormControl>
            )
        case FormFieldType.PASSWORD:
            return (
                <div className={cn("flex rounded-md border border-dark-500 bg-dark-400", isInvalid && "border-red-500")}>
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
                            disabled={disabled}
                            readOnly={readOnly}
                            autoComplete={autoComplete}
                            className={cn(baseInputClasses, "border-0")}
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
                        className={cn("bg-zinc-900 border rounded shad-input p-1",
                            isInvalid && "border-red-500",
                            disabled && "opacity-70 cursor-not-allowed",
                            readOnly && "opacity-70 cursor-not-allowed"
                        )}
                        disabled={disabled}
                        readOnly={readOnly}
                    />
                </div>
            )
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={disabled}>
                        <FormControl>
                            <SelectTrigger className={cn("shad-select-trigger",
                                isInvalid && "border-red-500",
                                readOnly && "pointer-events-none opacity-70"
                            )}>
                                <SelectValue
                                    placeholder={placeholder}
                                />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="shad-select-content">
                            {props.children ||
                                options?.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </FormControl>
            )
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        placeholder={placeholder}
                        {...field}
                        disabled={disabled}
                        readOnly={readOnly}
                        className={cn("shad-textarea",
                            isInvalid && "border-red-500",
                            readOnly && "opacity-70 cursor-not-allowed",
                            props.className
                        )}
                    />
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
                            disabled={disabled}
                            className={cn("shad-checkbox",
                                isInvalid && "border-red-500",
                                readOnly && "opacity-70 pointer-events-none"
                            )}
                        />
                        <label
                            htmlFor={props.name}
                            className={cn("check-label",
                                disabled && "opacity-70",
                                readOnly && "opacity-70"
                            )}
                        >
                            {props.label}
                            {props.isRequired && <RequiredIndicator />}
                        </label>
                    </div>
                </FormControl>
            )
        case FormFieldType.RANGE:
            return (
                <FormControl>
                    <Slider
                        value={[field.value]}
                        min={min || 0}
                        max={max || 100}
                        step={step || 1}
                        disabled={disabled || readOnly}
                        onValueChange={(value) => field.onChange(value[0])}
                        className={cn(
                            isInvalid && "border-red-500",
                            props.className
                        )}
                    />
                    <div className="flex justify-between text-xs mt-1">
                        <span>{min || 0}</span>
                        <span>{field.value}</span>
                        <span>{max || 100}</span>
                    </div>
                </FormControl>
            )
        case FormFieldType.COLOR:
            return (
                <FormControl>
                    <div className="flex items-center gap-2">
                        <input
                            type="color"
                            {...field}
                            disabled={disabled}
                            readOnly={readOnly}
                            className={cn("w-10 h-10 rounded cursor-pointer",
                                readOnly && "opacity-70 pointer-events-none"
                            )}
                        />
                        <Input
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            disabled={disabled}
                            readOnly={readOnly}
                            className={cn(baseInputClasses, "uppercase")}
                        />
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
    const {control, fieldType, name, label, description, tooltip, isRequired, customError} = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({field, fieldState}) => (
                <FormItem className={cn("flex-1", props.className)}>
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel className={fieldState.error ? "text-red-500" : ""}>
                            {label}
                            {isRequired && <RequiredIndicator />}
                            {tooltip && <FieldTooltip content={tooltip} />}
                        </FormLabel>
                    )}

                    <RenderField field={field} props={props} fieldState={fieldState} />

                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}

                    <FormMessage className="shad-error">
                        {customError || fieldState.error?.message}
                    </FormMessage>
                </FormItem>
            )}
        />
    );
};

export default CustomFormField;