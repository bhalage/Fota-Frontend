# Fota-Frontend

A React-based frontend for managing models and variants in the FOTA (Firmware Over-The-Air) system.

## Project Structure

```
Fota-Frontend/
├── public/
│   └── ...                # Static assets
├── src/
│   ├── app/               # App-level configuration
│   ├── features/
│   │   ├── model/         # Model-related Redux logic and components
│   │   └── variants/      # Variant-related Redux logic and components
│   │       └── components/
│   │           └── NewVariantDrawer.jsx
│   ├── assets/            # Images, icons, etc.
│   ├── components/        # Shared UI components
│   ├── utils/             # Utility functions
│   └── index.js           # App entry point
├── package.json
├── README.md
└── ...                    # Other config files
```

## Getting Started

### Prerequisites

- Node.js v20.19.5
- npm v10.8.2
- React Js ^19.1.0

### Installation

```bash
npm install

### Running the App

```bash
npm run dev
```


### Building for Production

```bash
npm run build
```

## Features

- Model and variant management
- Drawer-based UI for creating new variants
- Form validation with Formik and Yup
- Redux for state management
- Ant Design for UI components
## UI Libraries Used

- **Ant Design (`antd`)**: Modern React UI components for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Lucide React**: Icon library for React.
- **React Icons**: Popular icon packs for React.
- **Echarts & echarts-for-react**: Charting and visualization components.



## Folder Details

- **src/features/model/**: Redux logic and components for models
- **src/features/variants/**: Redux logic and components for variants
- **src/features/variants/components/NewVariantDrawer.jsx**: Drawer component for creating/editing variants

