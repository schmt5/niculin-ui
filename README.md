# Niculin

Niculin is a German-language AI assistant chat application built with Next.js and React. The application provides an interactive chat interface that can respond to user queries and present activity recommendations through rich option cards.

## Getting Started

### Prerequisites

- Node.js 18+
- npm package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd niculin
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your OpenAI API key:
```bash
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_ACCENT_COLOR=015a9d  # Optional: Custom accent color
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The chat interface will appear as a contained widget. You can start chatting with Niculin immediately.

### Building for Production

```bash
npm run build
npm run start
```

## Usage

### Basic Chat
- Type your message and Niculin will respond with AI-generated content

### Activity Recommendations
- Ask about activities (e.g., "show activities")
- Receive structured responses with option cards showing:
  - Activity images
  - Descriptions
  - Pricing information
  - Categories (families, mountains, water, air activities)

### URL Parameters
- `?lang=en` - Set the language code
- `?version=beta` - Display version information in the chat header

## Key Components

### Chat Component
The main chat interface (`src/app/ui/Chat.tsx`) handles:
- Message display and scrolling
- Input handling with Enter key support
- Loading states
- Session management

### Message Content Triage
Intelligent parsing of AI responses (`src/app/ui/MessageContentTriage.tsx`) that can handle:
- Plain text responses
- JSON-embedded responses with activity options
- HTML content rendering

### Option Cards
Rich activity recommendation cards (`src/app/ui/OptionCard.tsx`) featuring:
- Lazy-loaded images with loading states
- Activity details and pricing
- Responsive design

## License

This project is private and not licensed for public use.
