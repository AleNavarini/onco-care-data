import { Button, FormControl, FormLabel, Input } from "@mui/joy";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function PasswordChangeForm() {
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: any) => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log(result);
            reset();
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
                sx={{
                    width: '18dvw',
                    display: 'flex',
                }}>
                <FormLabel
                    sx={(theme) => ({
                        '--FormLabel-color': theme.vars.palette.primary.plainColor,
                    })}>
                    Cambiar Contraseña
                </FormLabel>
                <Input
                    sx={{ pr: 0 }}
                    {...register('changedPassword')}
                    type="text"
                    placeholder="Cambia tu contraseña"
                    endDecorator={
                        <Button
                            sx={{ p: 2, m: 0, alignContent: 'en', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                            type="submit"
                            loading={isLoading}
                            loadingIndicator="Cargando…"
                            variant="solid">
                            Cambiar Contraseña
                        </Button>
                    }
                />

            </FormControl>
        </form >
    )
}