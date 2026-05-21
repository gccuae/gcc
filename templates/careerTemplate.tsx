import * as React from "react";

interface CareerEmailProps {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nationality?: string;
    currentLocation: string;
    position:string;
    coverLetter?: string;
    resume?: string;
}

export const CareerTemplate = ({
    firstName,
    lastName,
    email,
    phone,
    nationality,
    currentLocation,
    position,
    coverLetter,
    resume,
}: CareerEmailProps) => {
    const fullName = `${firstName} ${lastName}`;

    console.log(firstName,
        lastName,
        email,
        phone,
        nationality,
        currentLocation,
        coverLetter,
        resume)

    return (
        <div
            style={{
                backgroundColor: "#f3f4f6",
                padding: "32px 16px",
                fontFamily: "Arial, Helvetica, sans-serif",
            }}
        >
            {/* Card */}
            <div
                style={{
                    maxWidth: "640px",
                    margin: "0 auto",
                    backgroundColor: "#ffffff",
                    borderRadius: "10px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                    overflow: "hidden",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        backgroundColor: "#111827",
                        padding: "20px 24px",
                        color: "#ffffff",
                    }}
                >
                    <h2
                        style={{
                            margin: 0,
                            fontSize: "20px",
                            fontWeight: 600,
                        }}
                    >
                        New Career Application
                    </h2>
                    <p
                        style={{
                            margin: "4px 0 0",
                            fontSize: "13px",
                            color: "#d1d5db",
                        }}
                    >
                        A candidate has submitted a job application
                    </p>
                </div>

                {/* Body */}
                <div style={{ padding: "24px" }}>
                    <table
                        width="100%"
                        cellPadding={0}
                        cellSpacing={0}
                        style={{ borderCollapse: "collapse" }}
                    >
                        <tbody>
                            <Row label="Candidate Name" value={fullName} />
                            <Row label="Email Address" value={email} />
                            <Row label="Phone Number" value={phone} />
                            <Row label="Current Location" value={currentLocation} />
                            <Row label="Nationality" value={nationality} />
                            <Row label="Position" value={position} />

                        </tbody>
                    </table>

                    {/* Files */}
                    <div
                        style={{
                            marginTop: "24px",
                            padding: "12px 16px",
                            backgroundColor: "#f9fafb",
                            borderLeft: "4px solid #2563eb",
                            fontSize: "13px",
                            color: "#374151",
                        }}
                    >
                        {/* 📎 Documents:
                        <ul style={{ marginTop: "8px", paddingLeft: "18px" }}>
                            {resume && (
                                <li>
                                    Resume:{" "}
                                    <a href={resume} target="_blank">
                                        View File
                                    </a>
                                </li>
                            )}
                            {coverLetter && (
                                <li>
                                    Cover Letter:{" "}
                                    <a href={coverLetter} target="_blank">
                                        View File
                                    </a>
                                </li>
                            )}
                        </ul> */}
                    </div>
                </div>

                {/* Footer */}
                <div
                    style={{
                        padding: "16px 24px",
                        backgroundColor: "#f9fafb",
                        fontSize: "12px",
                        color: "#6b7280",
                        textAlign: "center",
                    }}
                >
                    This application was submitted through the website career form.
                </div>
            </div>
        </div>
    );
};

const Row = ({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) => (
    <tr>
        <td
            style={{
                padding: "10px 0",
                fontWeight: 600,
                width: "180px",
                verticalAlign: "top",
                color: "#111827",
            }}
        >
            {label}
        </td>
        <td
            style={{
                padding: "10px 0",
                color: "#374151",
                verticalAlign: "top",
            }}
        >
            {value}
        </td>
    </tr>
);