import Image from 'next/image';
import { useColorScheme } from "@mui/joy";
import logo from "@/app/logo.svg"

export default function Logo() {
    const { mode } = useColorScheme()
    const logoTheme = mode === "light" ? { filter: "invert(1)" } : {}
    return <Image alt="Logo" src={logo} style={logoTheme} width={50} height={50} />;
}