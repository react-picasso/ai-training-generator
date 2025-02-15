# Sustainability Training Generator

![Thumbnail](/public/thumbnail.png)

## Overview

The Sustainability Training Generator is an AI-powered web application that creates tailored sustainability training outlines for companies across various industries. By leveraging advanced language models, this tool helps businesses develop comprehensive sustainability programs aligned with their specific goals and industry context.

## Features
* User-friendly interface for inputting company details and sustainability goals
* AI-generated, customized sustainability training outlines
* Industry-specific recommendations and strategies
* Responsive design for seamless use on desktop and mobile devices
* Real-time generation with visual feedback
* Persistent storage of generated training outlines

## Tech Stack
* Frontend: Next.js, React, Tailwind CSS
* Backend: Next.js API Routes
* Database: PostgreSQL with Prisma ORM
* AI: Google AI Studio's Gemini 2.0-flash model
* Styling: ShadCN UI components
* Deployment: Vercel (recommended)

## Getting Started

### Prerequisites
* Node.js (v14 or later)
* npm or yarn
* PostgreSQL database

### Installation

1. Clone the repository:

```
git clone https://github.com/react-picasso/ai-training-generator.git
cd ai-training-generator
```

2. Install dependencies:
```
bun install
```

3. Set up environment variables: Create a .env file in the root directory and add the following:
```
DATABASE_URL="your_postgresql_database_url_here"
GEMINI_API_KEY="your_gemini_api_key_here"
```

4. Set up the database:
```
bunx prisma init
bunx prisma db push
```

5. Run the development server:
```
bun run dev
```

6. Open http://localhost:3000 in your browser to see the application.

## Usage
1. Fill out the form with your company's details:
    * Company Name
    * Industry (select from the dropdown)
    * Sustainability Goals
    * Additional Context (optional)

2. Click the "Generate Training" button.

3. Wait for the AI to generate your customized sustainability training outline.

4. Review the generated outline in the right-hand panel.

## Deployment

This application is designed to be easily deployed on Vercel. Follow these steps:

1. Push your code to a GitHub repository.

2. Connect your GitHub repository to Vercel.

3. Configure the environment variables (DATABASE_URL and GOOGLE_API_KEY) in your Vercel project settings.

4. Deploy the application.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgements

* [Empacto](https://empacto.eco)

* [Next.js](https://nextjs.org)

* [React](https://react.dev)

* [Tailwind CSS](https://tailwindcss.com/)

* [ShadCN UI](https://ui.shadcn.com/)

* [Prisma](https://www.prisma.io/)

* [Google AI Studio](https://aistudio.google.com)

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.