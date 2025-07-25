const MainContent = ({ children }) => {
  return (
    <main className="main-content flex-grow-1 bg-blue w-full overflow-y-hidden">
      <div className="content-wrapper h-100">
        {children}
      </div>
    </main>
  );
};

export default MainContent;