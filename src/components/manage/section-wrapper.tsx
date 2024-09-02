import { Typography, Box } from "@mui/joy";
import { ReactNode, Suspense } from "react";
import CenteredLoading from "../ui/centered-loading";

interface SectionWrapperProps {
    children: ReactNode;
    title: string;
    addButton: ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
    children,
    title,
    addButton,
}) => (
    <Box
        sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}
    >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography level="h3">{title}</Typography>
            {addButton}
        </Box>
        <Box sx={{ flexGrow: 1, position: 'relative' }}>
            <Suspense fallback={<CenteredLoading />}>{children}</Suspense>
        </Box>
    </Box>
);

export default SectionWrapper;