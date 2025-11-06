"use client"
import Link from "next/link";
import { ReactNode, useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "sans-serif" }}>
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          color: "#000",
          padding: "10px 20px",
          boxSizing: "border-box",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <h2 style={{ margin: 0 }}>Dashboard</h2>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              backgroundColor: "#fff",
              color: "#1f1f1f",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ☰
          </button>

          {/* Dropdown menu */}
          {isMenuOpen && (
            <ul
              style={{
                position: "absolute",
                right: 0,
                top: "100%",
                backgroundColor: "#1f1f1f",
                color: "#fff",
                listStyle: "none",
                padding: "10px",
                margin: 0,
                boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                borderRadius: "4px",
              }}
            >
              <li style={{ marginBottom: "8px" }}>
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <Link href="/dashboard/admin/users" onClick={() => setIsMenuOpen(false)}>
                  Users
                </Link>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <Link href="/dashboard/admin/staff" onClick={() => setIsMenuOpen(false)}>
                  Staff
                </Link>
              </li>
              <li>
                <Link href="/dashboard/admin/settings" onClick={() => setIsMenuOpen(false)}>
                  Settings
                </Link>
              </li>
            </ul>
          )}
        </div>
      </header>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          backgroundColor: "#fffff",
          color: "#000",
          overflowY: "auto",
        }}
      >
        {children}
      </main>
    </div>
  );
}
