const TableWrapper = ({ children }) => {
  return (
    <div className="custom-scrollbar-horizontal-dark w-full overflow-x-auto">
      <table>{children}</table>
    </div>
  )
}

export default TableWrapper
