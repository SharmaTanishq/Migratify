# Migratify

![Migratify Logo](public/icons/Bridgeflow.svg)

Migratify is a powerful e-commerce platform migration tool that helps businesses seamlessly transition between different e-commerce platforms. With an intuitive visual workflow builder and intelligent data mapping, Migratify simplifies the complex process of migrating your online store.

## Features

- **Visual Workflow Builder**: Create and customize migration workflows using a drag-and-drop interface powered by ReactFlow
- **Intelligent Schema Mapping**: Easily map data fields between different e-commerce platforms
- **Real-time Search**: Quickly find specific fields in complex schemas
- **Webhook Integration**: Connect with external services through customizable webhooks
- **File Upload Support**: Import data from CSV files for products, inventory, customers, and categories
- **Project Management**: Organize multiple migration projects in one place

## Tech Stack

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Convex for real-time database and serverless functions
- **Authentication**: Clerk for secure user authentication
- **Flow Canvas**: ReactFlow (XYFlow) for the visual workflow builder
- **UI Components**: Shadcn UI and Radix UI for accessible, customizable components

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- A Clerk account for authentication
- A Convex account for the backend

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/migratify.git
   cd migratify
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/projects
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Convex Setup

1. Initialize Convex:
   ```bash
   npx convex dev
   ```

2. This will open the Convex dashboard where you can manage your database and functions.

## Project Structure

- `/app`: Next.js app router pages and layouts
- `/components`: Reusable React components
- `/convex`: Convex backend functions and schema
- `/lib`: Utility functions and helpers
- `/public`: Static assets
- `/utils`: Helper functions

## Key Components

### Schema Viewer

The Schema Viewer component allows users to explore and interact with JSON schemas. It provides:

- Hierarchical display of nested objects and arrays
- Drag-and-drop functionality for field mapping
- Real-time search to filter fields
- Proper path notation for accessing nested properties and array items

### Flow Canvas

The Flow Canvas is built with ReactFlow and enables users to:

- Create nodes representing different e-commerce platforms
- Connect nodes to establish data flow
- Configure data mappings between platforms
- Visualize the entire migration process

### Data Mapping

The data mapping functionality allows users to:

- Drag fields from the source schema
- Drop them onto target fields
- Create relationships between source and target data
- Preview how data will be transformed during migration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Convex](https://www.convex.dev/)
- [Clerk](https://clerk.dev/)
- [ReactFlow](https://reactflow.dev/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

# Convex + TypeScript + Next.js + Clerk + Tailwind + shadcn/ui

This template provides a minimal setup to get Convex working with [Next.js](https://nextjs.org/). It uses [Clerk](https://clerk.dev/) for user authentication.

Start by editing `convex/myFunctions.ts` and interact with your Next.js app.

See Convex docs at https://docs.convex.dev/home

## Setting up

```
npm create convex@latest -t nextjs-clerk-shadcn
```

Then:

1. Follow steps 1 to 3 in the [Clerk onboarding guide](https://docs.convex.dev/auth/clerk#get-started)
2. Paste the Issuer URL as `CLERK_JWT_ISSUER_DOMAIN` to your dev deployment environment variable settings on the Convex dashboard (see [docs](https://docs.convex.dev/auth/clerk#configuring-dev-and-prod-instances))
3. Paste your publishable key as `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="<your publishable key>"` to the `.env.local` file in this directory.

If you want to sync Clerk user data via webhooks, check out this [example repo](https://github.com/thomasballinger/convex-clerk-users-table/).
