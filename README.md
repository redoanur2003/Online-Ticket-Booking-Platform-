#  Project name: TicketBari - Online Ticket Booking Platform

**TicketBari** is a comprehensive full-stack (MERN) travel booking application. It connects travelers with transport providers (Bus, Train, Launch, Flights) through a secure, user-friendly platform. The system features role-based access control for Users, Vendors, and Admins, real-time booking management, and secure payments via Stripe.

---

##  Live Links
- **Live Site:** https://online-ticket-booking-833cc.web.app

---

##  Purpose
The purpose of this project is to streamline the travel ticket booking process in Bangladesh. It solves the problem of physical queuing by allowing users to search, filter, and book tickets online. Simultaneously, it provides Vendors with a dashboard to manage inventory and revenue, and Admins with tools to moderate the platform and ensure safety.

---

##  Key Features

###  General
- **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop.
- **Authentication:** Secure Login/Register with Email/Password and **Google Social Login** via Firebase.
- **Security:** JWT (JSON Web Token) verification for private API routes.
- **Dark/Light Mode:** User-controlled theme toggle.

###  User Features 
- **Browse & Search:** Filter tickets by Transport Type, Location (From/To), and Sort by Price.
- **Booking System:** Real-time ticket booking opportunity from anywhere and countdown timers for departure.
- **Payment Integration:** Secure payments using **Stripe**.
- **Dashboard:** View booking history, booking status (Pending/Accepted/Paid), and payment history.

###  Vendor Features 
- **Ticket Management:** Add, Update, and Delete tickets (ImgBB integration for images).
- **Booking Management:** Accept or Reject booking requests from users.
- **Analytics:** Interactive charts (Recharts) showing Total Revenue, Tickets Sold, and Inventory status.
- **Profile:** Manage vendor details.

### Admin Features 
- **Ticket Verification:** Approve or Reject tickets added by vendors before they go live.
- **User Management:** Promote users to Admin/Vendor roles or **Mark Vendors as Fraud** (restricting their access).
- **Advertisement Control:** Select specific tickets to highlight in the Home Page Advertisement section.

---
##  NPM Packages Used
react
react-router
@tanstack/react-query
axios
sweetalert2
lucide-react
react-icons
recharts
tailwindCSS
