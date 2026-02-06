import * as React from "react";

interface VendorEmailProps {
    vendorName: string;
    tradeLicense: string;
    classification?: string;
    website?: string;
    services: string;
    expertise?: string;
    contactDetails: string;
}

export const VendorEmail = ({
    vendorName,
    tradeLicense,
    classification,
    website,
    services,
    expertise,
    contactDetails,
}: VendorEmailProps) => {
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
                            letterSpacing: "0.3px",
                        }}
                    >
                        New Vendor Registration
                    </h2>
                    <p
                        style={{
                            margin: "4px 0 0",
                            fontSize: "13px",
                            color: "#d1d5db",
                        }}
                    >
                        A new vendor has submitted their details
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
                            <Row label="Vendor Name" value={vendorName} />
                            <Row label="Trade License" value={tradeLicense} />

                            {classification && (
                                <Row label="Classification" value={classification} />
                            )}

                            {website && (
                                <Row
                                    label="Website"
                                    value={
                                        <a
                                            href={website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: "#2563eb",
                                                textDecoration: "none",
                                                wordBreak: "break-all",
                                            }}
                                        >
                                            {website}
                                        </a>
                                    }
                                />
                            )}

                            <Row label="Services Provided" value={services} />

                            {expertise && (
                                <Row
                                    label="Expertise / Capabilities"
                                    value={expertise}
                                />
                            )}

                            <Row label="Contact Details" value={contactDetails} />
                        </tbody>
                    </table>

                    {/* Attachments note */}
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
                        📎 Supporting documents and attachments are included with this email.
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
                    This vendor registration was submitted via the website.
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
                whiteSpace: "pre-wrap",
            }}
        >
            {value}
        </td>
    </tr>
);
