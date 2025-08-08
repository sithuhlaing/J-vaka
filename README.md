# EHR Unified Application

A comprehensive Electronic Health Record (EHR) system built with React and Tailwind CSS.

## Features

- **Dashboard**: Overview of today's schedule and priority items
- **Schedule Management**: Weekly calendar view with appointment scheduling
- **Patient Charts**: Comprehensive patient information including:
  - Patient Summary
  - Encounter Notes (SOAP format)
  - Medication Management
  - Lab Results
- **Inbox**: Task and message management system
- **Reports**: Various clinical and administrative reports

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd j-vaka-ehr
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── InfoCard.jsx
│   ├── Navigation.jsx
│   └── PatientHeader.jsx
├── pages/              # Main application views
│   ├── DashboardView.jsx
│   ├── EncounterNoteView.jsx
│   ├── InboxView.jsx
│   ├── LabsView.jsx
│   ├── MedicationsView.jsx
│   ├── PatientSummaryView.jsx
│   ├── ReportsView.jsx
│   └── ScheduleView.jsx
├── App.jsx             # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles with Tailwind CSS
```

## Technologies Used

- **React 18** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Font Awesome** - Icons
- **Create React App** - Build tooling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.