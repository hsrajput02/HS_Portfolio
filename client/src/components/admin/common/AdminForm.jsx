import LoadingButton from "./LoadingButton";

function AdminForm({
  title,
  children,
  onSubmit,
  buttonText,
  loading = false,
  loadingText = "Saving...",
}) {
  return (
    <div className="adminFormContainer">

      <h2>{title}</h2>

      <form onSubmit={onSubmit} className="adminForm">

        {children}

        <LoadingButton
  loading={loading}
  text={buttonText}
  loadingText={loadingText}
/>

      </form>

    </div>
  );
}

export default AdminForm;