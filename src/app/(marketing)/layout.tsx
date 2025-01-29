"use client";

import NavBar from "../components/navbar";

export default function LandingLayout({ children }) {
    return (
        <>
            <NavBar />

            <main className="landing-content">
                {children}
            </main>
        </>
    );
}
