# 🍔 QuickEats – Food Order App (Frontend)

QuickEats is a modern, responsive food ordering web application built with **React**, **Vite**, and **Tailwind CSS**. It provides a smooth and intuitive user experience for browsing menus, managing carts, placing orders, and tracking deliveries in real time.

This repository contains the **frontend** of the QuickEats platform.

---

## 🚀 Features

* ✅ Responsive UI with Tailwind CSS
* ✅ Authentication (Login, Register, Forgot/Reset Password)
* ✅ Menu browsing with category filters
* ✅ Shopping cart with real-time updates
* ✅ Checkout flow
* ✅ Order history and tracking
* ✅ User profile management
* ✅ Real-time order updates using Socket.io
* ✅ Payment integration ready

---

## 🛠 Tech Stack

* **React 19** – UI library
* **Vite** – Fast build tool
* **Tailwind CSS** – Utility-first styling
* **React Router** – Client-side routing
* **Redux Toolkit** – State management
* **Axios** – HTTP client
* **Socket.io Client** – Real-time communication
* **ESLint** – Code linting and quality

---

## 📁 Project Structure

```
src/
├── app/                      # App state and socket management
│   ├── store.js             # Redux store configuration
│   └── socket.js            # Socket.io setup
│
├── components/              # Reusable React components
│   ├── common/              # Shared UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Loader.jsx
│   │   ├── Modal.jsx
│   │   └── Badge.jsx
│   │
│   ├── layout/              # Layout components
│   │   ├── Header.jsx
│   │   ├── BottomNav.jsx
│   │   └── Container.jsx
│   │
│   ├── menu/                # Menu-related components
│   │   ├── CategoryTabs.jsx
│   │   ├── MenuCard.jsx
│   │   └── MenuList.jsx
│   │
│   ├── cart/                # Cart components
│   │   ├── CartItem.jsx
│   │   ├── CartSummary.jsx
│   │   └── CartDrawer.jsx
│   │
│   └── order/               # Order tracking components
│       ├── OrderStatus.jsx
│       └── OrderTimeline.jsx
│
├── pages/                   # Application pages
│   ├── auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── ResetPassword.jsx
│   │
│   ├── Menu.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Orders.jsx
│   └── Profile.jsx
│
├── services/                # API services
│   ├── api.js
│   ├── auth.service.js
│   ├── menu.service.js
│   ├── order.service.js
│   └── payment.service.js
│
├── hooks/                   # Custom hooks
│   └── useAuth.js
│
├── utils/                   # Utilities
│   ├── constants.js
│   └── helpers.js
│
├── App.jsx                  # App routing
├── main.jsx                 # Entry point
└── index.css                # Global Tailwind styles
```

---

## ⚙️ Setup & Installation

### Prerequisites

* Node.js **v16+**
* npm or yarn

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/your-username/quickeats-frontend.git
cd quickeats-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Create environment variables**

Create a `.env.local` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

4. **Start development server**

```bash
npm run dev
```

---

## 🏗 Build & Scripts

* **Run development server**

```bash
npm run dev
```

* **Run ESLint**

```bash
npm run lint
```

* **Build for production**

```bash
npm run build
```

* **Preview production build**

```bash
npm run preview
```

---

## 🔌 API Integration

QuickEats communicates with backend services using Axios-based API layers:

* **Auth Service** – User authentication & authorization
* **Menu Service** – Food items & categories
* **Order Service** – Order placement & tracking
* **Payment Service** – Payment processing (ready for integration)

All API calls are centralized in the `services/` directory with interceptors for token handling and error management.

---

## 🎨 Styling

* Built entirely with **Tailwind CSS**
* Global styles defined in `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Custom themes and extensions can be configured in `tailwind.config.js`.

---

## 🧩 Common Components Usage

### Button

```jsx
<Button variant="primary" onClick={handleClick}>Click me</Button>
```

### Input

```jsx
<Input
  label="Email"
  type="email"
  value={email}
  onChange={handleChange}
  error={error}
/>
```

### Loader

```jsx
<Loader fullScreen={true} />
```

### Modal

```jsx
<Modal isOpen={isOpen} onClose={handleClose} title="Confirm">
  Content here
</Modal>
```

### Badge

```jsx
<Badge variant="success">Delivered</Badge>
```

---

## 🤝 Contributing

Contributions are welcome! 🚀

* Create feature branches
* Follow the existing component structure
* Use functional components with hooks
* Keep components modular and reusable
* Add proper error handling
* Test API integrations thoroughly

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 📌 Project Name

**QuickEats** – Fast, simple, and real-time food ordering experience.

Enjoy building and scaling 🚀
