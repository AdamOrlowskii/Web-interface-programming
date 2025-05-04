export default function Footer() {
    return (
        <footer style={{
            width: "100%",
            textAlign: "center",
            padding: "1rem 0",
            backgroundColor: "#f3f4f6",
            position: "fixed",
            bottom: 0,
            left: 0,
            borderTop: "1px solid #e5e7eb"
        }}>
            <a
                href="mailto:273005@student.pwr.edu.pl"
                style={{
                    color: "#4b5563",
                    textDecoration: "none"
                }}
            >
                Contact: 273005@student.pwr.edu.pl
            </a>
        </footer>
    );
}