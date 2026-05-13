"use client";

import { useEffect, useState } from "react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contact");

      const data = await res.json();

      if (data.success) {
        setContacts(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1 className="p-10">Loading...</h1>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Customer Inquiries
      </h1>

      <div className="grid gap-6">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className="border rounded-xl p-5 shadow"
          >
            <h2 className="text-xl font-semibold">
              {contact.name}
            </h2>

            <p className="text-gray-600">
              {contact.email}
            </p>

            <p className="mt-2 font-medium">
              Subject: {contact.subject}
            </p>

            <p className="mt-3">
              {contact.message}
            </p>

            <p className="text-sm text-gray-400 mt-4">
              {new Date(contact.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}