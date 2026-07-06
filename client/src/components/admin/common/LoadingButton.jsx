import "./LoadingButton.css";

function LoadingButton({
  loading,
  text,
  loadingText,
  type = "submit",
}) {
  return (
    <button
      type={type}
      disabled={loading}
      className={`loadingBtn ${loading ? "disabled" : ""}`}
    >
      {loading && <span className="spinner"></span>}

      {loading ? loadingText : text}
    </button>
  );
}

export default LoadingButton;