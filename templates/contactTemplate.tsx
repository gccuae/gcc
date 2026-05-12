import * as React from "react";

interface ContactEmailProps {
    firstName: string;
    lastName: string;
    email: string;
    contact: string;
    message: string;
}

export const ContactTemplate = ({
    firstName,
    lastName,
    email,
    contact,
    message,
}: ContactEmailProps) => {
    const fullName = `${firstName} ${lastName}`;

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
                        New Contact Enquiry
                    </h2>
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
                            <Row label="Full Name" value={fullName} />
                            <Row label="Email Address" value={email} />
                            <Row label="Contact Number" value={contact} />
                        </tbody>
                    </table>

                    {/* Message Box */}
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
                        <p style={{ margin: "0 0 8px 0", fontWeight: 600, color: "#111827" }}>
                            Message:
                        </p>
                        <p style={{ margin: 0, lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
                            {message}
                        </p>
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
                    This message was submitted through the website contact form.
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