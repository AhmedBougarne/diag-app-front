import React, { useMemo } from "react";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    firstName: "John",
    lastName: "Doe",
    address: "261 Erdman Ford",
    city: "East Daphne",
    state: "Kentucky",
  },
];

const AdminHome = () => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "firstName", //access nested data with dot notation
        header: "First Name",
        
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "address", //normal accessorKey
        header: "Address",
      },
      {
        accessorKey: "city",
        header: "City",
      },
      {
        accessorKey: "state",
        header: "State",
      },
    ],
    []
  );

  return <MaterialReactTable columns={columns} data={data} />;
};

export default AdminHome;
