const GenericPage = ({ title, description }) => (
  <div className="container-fluid py-4">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="text-muted">This page will contain the {title.toLowerCase()} management interface.</p>
      </div>
    </div>
  </div>
);

export default GenericPage;