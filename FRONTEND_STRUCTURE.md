# Food Order App - Frontend

A React + Vite + Tailwind CSS frontend for a food ordering application.

## Project Structure

```
src/
├── app/                      # App state and socket management
│   ├── store.js             # Redux store configuration
│   └── socket.js            # Socket.io setup
│
├── components/              # Reusable React components
│   ├── common/              # Common UI components
│   │   ├── Button.jsx       # Button component
│   │   ├── Input.jsx        # Input field component
│   │   ├── Loader.jsx       # Loading spinner
│   │   ├── Modal.jsx        # Modal dialog
│   │   └── Badge.jsx        # Badge component
│   │
│   ├── layout/              # Layout components
│   │   ├── Header.jsx       # Navigation header
│   │   ├── BottomNav.jsx    # Mobile bottom navigation
│   │   └── Container.jsx    # Centered container
│   │
│   ├── menu/                # Menu-related components
│   │   ├── CategoryTabs.jsx # Category filter tabs
│   │   ├── MenuCard.jsx     # Menu item card
│   │   └── MenuList.jsx     # Menu grid layout
│   │
│   ├── cart/                # Shopping cart components
│   │   ├── CartItem.jsx     # Cart item row
│   │   ├── CartSummary.jsx  # Order summary
│   │   └── CartDrawer.jsx   # Cart sidebar drawer
│   │
│   └── order/               # Order tracking components
│       ├── OrderStatus.jsx  # Order status badge
│       └── OrderTimeline.jsx # Order progress timeline
│
├── pages/                   # Page components
│   ├── auth/                # Authentication pages
│   │   ├── Login.jsx        # Login page
│   │   ├── Register.jsx     # Registration page
│   │   ├── ForgotPassword.jsx
│   │   └── ResetPassword.jsx
│   │
│   ├── Menu.jsx             # Menu listing page
│   ├── Cart.jsx             # Shopping cart page
│   ├── Checkout.jsx         # Checkout page
│   ├── Orders.jsx           # Order history page
│   └── Profile.jsx          # User profile page
│
├── services/                # API services
│   ├── api.js               # Axios instance with interceptors
│   ├── auth.service.js      # Authentication API
│   ├── menu.service.js      # Menu API
│   ├── order.service.js     # Order API
│   └── payment.service.js   # Payment API
│
├── hooks/                   # Custom React hooks
│   └── useAuth.js           # Authentication hook
│
├── utils/                   # Utility functions
│   ├── constants.js         # App constants
│   └── helpers.js           # Helper functions
│
├── App.jsx                  # Main app component with routing
├── main.jsx                 # App entry point
└── index.css                # Global styles with Tailwind
```

## Features

- ✅ Responsive design with Tailwind CSS
- ✅ React Router for navigation
- ✅ Authentication (Login/Register)
- ✅ Menu browsing with categories
- ✅ Shopping cart functionality
- ✅ Checkout process
- ✅ Order tracking
- ✅ User profile management
- ✅ Real-time updates with Socket.io
- ✅ Payment integration ready

## Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Environment Variables

- `VITE_API_URL` - Backend API URL
- `VITE_SOCKET_URL` - WebSocket server URL

## Technologies Used

- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication
- **ESLint** - Code linting

## API Integration

The app integrates with backend APIs through services:

- **Auth Service** - User authentication
- **Menu Service** - Food items and categories
- **Order Service** - Order management
- **Payment Service** - Payment processing

## Component Guidelines

### Common Components Usage

**Button:**
```jsx
<Button variant="primary" onClick={handleClick}>Click me</Button>
```

**Input:**
```jsx
<Input label="Email" type="email" value={email} onChange={handleChange} error={error} />
```

**Loader:**
```jsx
<Loader fullScreen={true} />
```

**Modal:**
```jsx
<Modal isOpen={isOpen} onClose={handleClose} title="Confirm">Content here</Modal>
```

**Badge:**
```jsx
<Badge variant="success">Delivered</Badge>
```

## Styling

The project uses Tailwind CSS for styling. Tailwind directives are configured in `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Custom themes and styles can be added to `tailwind.config.js`.

## Development

### Run Development Server
```bash
npm run dev
```

### Run Linter
```bash
npm run lint
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Contributing

1. Create feature branches
2. Follow component structure guidelines
3. Use functional components with hooks
4. Keep components modular and reusable
5. Add proper error handling
6. Test API integration thoroughly

## License

ISC
