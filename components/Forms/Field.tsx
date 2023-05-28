import { FormControl, FormLabel, Input } from "@mui/joy";
import { capitalize } from "@mui/material";

interface Props {
    register: any,
    fieldName: string,
    placeholder: string,
    type: string,
    label: string,
    required?: boolean
}
export default function Field({
    register,
    fieldName,
    placeholder,
    type,
    label,
    required = false }: Props) {
    return (
        <FormControl>
            <FormLabel
                sx={(theme) => ({
                    '--FormLabel-color': theme.vars.palette.primary.plainColor,
                })}>
                {capitalize(label)}
            </FormLabel>
            <Input
                required={required}
                {...register(fieldName)}
                type={type}
                placeholder={placeholder}
            />
        </FormControl>
    )
}