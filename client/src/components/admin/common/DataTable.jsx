import { useState } from "react";

function DataTable({
  columns,
  data,
  actions,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  const indexOfLastRow = currentPage * rowsPerPage;

  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = data.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const totalPages = Math.ceil(
    data.length / rowsPerPage
  );
return (

<div className="tableContainer">

    <table className="adminTable">

      <thead>

        <tr>

          {columns.map((column) => (

            <th key={column.key}>
              {column.label}
            </th>

          ))}

          {actions && <th>Actions</th>}

        </tr>

      </thead>

      <tbody>

        {currentRows.map((row) => (

          <tr key={row._id}>

            {columns.map((column) => (

              <td key={column.key}>

                {column.render
                  ? column.render(row)
                  : row[column.key]}

              </td>

            ))}

            {actions && (

              <td>

                {actions(row)}

              </td>

            )}

          </tr>

        ))}

      </tbody>

    </table>

    <div className="pagination">

      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (

        <button
          key={index}
          className={currentPage === index + 1 ? "activePage" : ""}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>

      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>

    </div>

  </div>
);
  

}

export default DataTable;