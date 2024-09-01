# Onco-Care-Data

## Description

Onco-Care-Data is a web application designed for managing patient data in an oncology care setting. It provides a user-friendly interface for healthcare professionals to view and filter patient information.

## Key Features

- Patient dashboard with advanced filtering capabilities
- Responsive design for various screen sizes
- Server-side rendering with Next.js
- Authentication system (likely using NextAuth.js)

## Technologies Used

- React
- Next.js (App Router)
- TypeScript
- Material-UI (MUI Joy)
- SWR for data fetching
- NextAuth.js for authentication

## Project Structure

The project follows the Next.js 13+ App Router structure:

- src/app/layout.tsx: The root layout component
- src/app/(home)/page.tsx: The main page component
- src/components/: Directory for React components
  - Dashboards/Patients/: Components related to the patients dashboard
  - Providers/: Custom provider components
  - ui/: Reusable UI components

## Getting Started

1. Clone the repository
2. Install dependencies:
   `yarn install`
3. Set up environment variables
4. Run the development server:
   `yarn dev`

## Usage

The application provides a patients dashboard where users can:

- View a list of patients
- Filter patients by text search, status, and disease type
- (Additional features to be described)

## Authentication

The application uses NextAuth.js for authentication. Ensure you've set up the necessary providers and environment variables.

## Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## Acknowledgements

- Next.js
- Material-UI
- SWR
- NextAuth.js
