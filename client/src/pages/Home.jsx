import { useState, useEffect } from "react";
import { createPaste } from "../api";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttlSeconds, setTtlSeconds] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [link, setLink] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);

  // detect screen size
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 600);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const submit = async () => {
    if (!content.trim()) return alert("Please enter some text");

    const payload = {
      content,
      ttl_seconds: ttlSeconds ? Number(ttlSeconds) : undefined,
      max_views: maxViews ? Number(maxViews) : undefined,
    };

    const res = await createPaste(payload);
    setLink(res.url);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Failed to copy");
    }
  };

  return (
     <div style={styles.page}>
    <div style={styles.container(isMobile)}>
      <h1 style={styles.heading(isMobile)}>Pastebin Lite</h1>
      <p style={styles.subHeading}>
        Create a paste and share it instantly 🚀
      </p>

      <textarea
        style={styles.textarea(isMobile)}
        placeholder="Write your text here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* NEW INPUTS */}
      <div style={styles.inputRow(isMobile)}>
        <input
          type="number"
          placeholder="Time limit (seconds)"
          value={ttlSeconds}
          onChange={(e) => setTtlSeconds(e.target.value)}
          style={styles.input}
          min="1"
        />

        <input
          type="number"
          placeholder="Max views"
          value={maxViews}
          onChange={(e) => setMaxViews(e.target.value)}
          style={styles.input}
          min="1"
        />
      </div>

      <button style={styles.button(isMobile)} onClick={submit}>
        Create Paste
      </button>

      {link && (
        <div style={styles.resultBox}>
          <p style={styles.resultText}>Your paste is ready 👇</p>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            {link}
          </a>

          <button
            onClick={copyToClipboard}
            style={styles.copyButton(isMobile, copied)}
          >
            {copied ? "Copied! ✅" : "Copy Link"}
          </button>
        </div>
      )}
    </div>
    </div>
  );
}

const styles = {
  page: {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#1f1f1f", // matches your dark background
},

  container: (isMobile) => ({
    maxWidth: "700px",
    width: "100%",
    margin: isMobile ? "20px auto" : "60px auto",
    padding: isMobile ? "20px" : "30px",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  }),

  heading: (isMobile) => ({
    marginBottom: "8px",
    fontSize: isMobile ? "22px" : "28px",
    color: "#333",
  }),

  subHeading: {
    marginBottom: "20px",
    color: "#666",
    fontSize: "14px",
  },

  textarea: (isMobile) => ({
    width: "100%",
    minHeight: isMobile ? "140px" : "180px",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
    marginBottom: "16px",
    boxSizing: "border-box",
  }),

  inputRow: (isMobile) => ({
    display: "flex",
    gap: "10px",
    flexDirection: isMobile ? "column" : "row",
    marginBottom: "20px",
  }),

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
  },

  button: (isMobile) => ({
    width: isMobile ? "100%" : "auto",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    padding: isMobile ? "14px" : "12px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
  }),

  resultBox: {
    marginTop: "25px",
    padding: "15px",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    border: "1px dashed #ddd",
  },

  resultText: {
    marginBottom: "8px",
    fontSize: "14px",
    color: "#333",
  },

  link: {
    display: "block",
    marginBottom: "12px",
    color: "#2563eb",
    textDecoration: "none",
    wordBreak: "break-word",
    fontSize: "14px",
  },

  copyButton: (isMobile, copied) => ({
    width: isMobile ? "100%" : "auto",
    backgroundColor: copied ? "#16a34a" : "#e5e7eb",
    color: copied ? "#fff" : "#111",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    fontSize: "13px",
    cursor: "pointer",
    marginTop: "5px",
  }),
};
