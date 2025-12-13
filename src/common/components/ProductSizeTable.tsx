import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IMyBagProductSizes } from "../../interface/types";

interface IProductSizeTableProps {
  sizes: IMyBagProductSizes[];
}

function ProductSizeTable({ sizes }: IProductSizeTableProps) {
  return (
    <>
      <TableContainer
        sx={{
          borderBottom: "none",
          maxWidth: "130px",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  padding: 0,
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  opacity: 0.8,
                }}
                align="center"
              >
                Size
              </TableCell>
              <TableCell
                style={{
                  padding: 0,
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  opacity: 0.8,
                }}
                align="center"
              >
                Qty
              </TableCell>
              <TableCell
                style={{
                  padding: 0,
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  opacity: 0.8,
                }}
                align="center"
              >
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sizes &&
              sizes.length > 0 &&
              sizes.map((size, index) => (
                <TableRow key={index}>
                  <TableCell
                    style={{
                      padding: 0,
                      fontSize: "0.7rem",
                    }}
                    align="center"
                  >
                    {size.size}
                  </TableCell>
                  <TableCell
                    style={{
                      padding: 0,
                      fontSize: "0.7rem",
                    }}
                    align="center"
                  >
                    {size.qty}&#xd7;
                  </TableCell>
                  <TableCell
                    style={{
                      padding: 0,
                      fontSize: "0.7rem",
                    }}
                    align="center"
                  >
                    &#8377;{size.price}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ProductSizeTable;
