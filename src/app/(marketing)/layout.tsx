"use client";

import NavBar from "../components/navbar";

export default function LandingLayout({ children: children }: { children: React.ReactNode }) {
    return (
        <>
            <NavBar />
            <main className="landing-content">
                {children}
            </main>
        </>
    );
}
