import { Routes, Route, Navigate } from "react-router-dom";

import { ContactsPage } from "src/pages/contacts/contacts-page";
import { ContactDetailPage } from "src/pages/contacts/contact-details-page/contact-details-page";
import { SignInPage } from "src/pages/auth/sign-in-page";
import { RegisterPage } from "src/pages/auth/register-page";

import { Protected } from "./protected";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/contacts" />} />
      <Route
        path="/contacts"
        element={
          <Protected>
            <ContactsPage />
          </Protected>
        }
      />
      <Route
        path="/contacts/:id"
        element={
          <Protected>
            <ContactDetailPage />
          </Protected>
        }
      />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};
