# Inventory Control Frontend

This is the **frontend application** for the [Inventory Control API](https://github.com/PauloDev367/Inventory_Control), a complete inventory management system designed to help businesses efficiently track products, sales, suppliers, and stock movements.

> 🔗 **Backend Repository**: [Inventory Control API](https://github.com/PauloDev367/Inventory_Control)

## 🚀 Features

This frontend consumes the Inventory Control API and provides an intuitive interface for managing your inventory data.

### 📦 Products Page
- View detailed product information.
- Access supplier details.
- Add, remove, and view product categories.
- See the product's sales history.
- View the product's price history.
- Track the product's stock movement history.
- Edit product data.
- Remove quantities from inventory, with the option to register it as a sale or not.

### 🗂️ Categories Page
- Manage product categories.

### 💰 Sales Page
- View and manage product sales.

### 🤝 Suppliers Page
- Manage supplier information.

### 👤 Users Page
- View and manage system users.

### 🔄 Stock Movements Page
- Track all stock in/out movements.

### 🔐 Login Page
- Secure login for user authentication.

## 🛠️ Technologies Used

- **Angular** (v18+)
- **Bootstrap** for responsive UI
- **TypeScript** for strong typing
- **RxJS** for reactive programming
- **Toastr** for user notifications
- **JWT** for authentication with the backend

## 📦 Installation

```bash
git clone https://github.com/PauloDev367/Inventory_Control_Front.git
cd Inventory_Control_Front
npm install
```

## ▶️ Running the App

```bash
ng serve
```

Then open your browser at `http://localhost:4200`.

## 🔒 Authentication

This frontend uses JWT for authentication. You must log in via the login page to access protected resources. The token will be stored in `localStorage` and attached to API requests.

## 📁 Folder Structure

```bash
src/
│
├── app/
│   ├── pages/          # Application pages (products, sales, categories, etc.)
│   ├── services/       # API service handlers
│   ├── interfaces/     # Interfaces and models
│   └── shared/         # Shared components
│
└── assets/             # Static assets
```

## 📌 Notes

Make sure the [Inventory Control API](https://github.com/PauloDev367/Inventory_Control) is running locally or remotely and that the environment configuration matches the correct API URL.

## 📄 License

This project is licensed under the MIT License.

---

**Made with ❤️ by [PauloDev367](https://github.com/PauloDev367)**
