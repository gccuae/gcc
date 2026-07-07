import * as React from "react";

interface CareerAcknowledgementProps {
    firstName: string;
    position: string;
}

export const CareerAcknowledgementTemplate = ({
    firstName,
    position,
}: CareerAcknowledgementProps) => {
    return (
        <div
            style={{
                backgroundColor: "#f3f4f6",
                padding: "32px 16px",
                fontFamily: "Arial, Helvetica, sans-serif",
            }}
        >
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
                <div style={{ padding: "24px", fontSize: "14px", color: "#374151", lineHeight: 1.6 }}>
                    <p>Dear {firstName},</p>

                    <p>
                        Thank you for taking the time to apply for the {position} position at GCC.
                        We have successfully received your application and our team will be reviewing
                        it carefully.
                    </p>

                    <p>
                        We wish you all the best and look forward to the possibility of welcoming you
                        to our team.
                    </p>

                    <p style={{ marginTop: "24px" }}>
                        Warm regards,
                        <br />
                        HR Manager
                    </p>
                </div>
            </div>
        </div>
    );
};