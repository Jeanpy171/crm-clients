import { useCallback, useState } from "react";
import type { Client } from "../../../../../../core/domain/entities/Client";
import GenericTable from "../../../../shared/components/generic-table/GenericTable";
import { useInteractionPhases } from "../../../../shared/hooks/useInteractionPhases";
import { useInterestLevels } from "../../../../shared/hooks/useInterestLevels";
import { useContactStatus } from "../../../../shared/hooks/useContactStatus";
import { Pagination } from "@heroui/react";

const columns = [
  { name: "CLIENTE", uid: "name" },
  { name: "EMPRESA", uid: "company" },
  { name: "TIPO", uid: "status" },
  { name: "Fase", uid: "interactionPhase" },
  { name: "ULTIMA ACTIVIDAD", uid: "lastActivity" },
  { name: "ACCIONES", uid: "actions" },
];

export const ClientsTable = ({
  data,
  totalPages,
}: {
  data: Client[];
  totalPages: number;
}) => {
  const [page, setPage] = useState(0);
  const { getPhaseDescriptionByName } = useInteractionPhases();
  const { getInterestDescriptionByName } = useInterestLevels();
  const { getStatusDescriptionByName } = useContactStatus();

  const renderCell = useCallback((data: Client, columnKey: string) => {
    const {
      name,
      email,
      interactionPhase,
      interestLevel,
      status,
      company,
      lastActivity,
    } = data.data;
    switch (columnKey) {
      case "name":
        return (
          <span>
            <h3 className="font-semibold">{name}</h3>
            <h4>{email}</h4>
          </span>
        );
      case "status":
        return <span>{getStatusDescriptionByName(status)}</span>;
      case "interactionPhase":
        return <span>{getPhaseDescriptionByName(interactionPhase)}</span>;
      case "interestLevel":
        return <span>{getInterestDescriptionByName(interestLevel)}</span>;
      case "company":
        return <span>{company}</span>;
      case "lastActivity":
        return <span>{lastActivity.toISOString()}</span>;
      case "actions":
        return <div className="flex gap-2">[Editar] [Ver]</div>;
      default:
        return null;
    }
  }, []);

  return (
    <GenericTable
      columns={columns}
      data={data}
      renderCell={renderCell}
    //   bottomContent={
    //     <div className="flex w-full justify-center">
    //       <Pagination
    //         isCompact
    //         showControls
    //         showShadow
    //         color="secondary"
    //         page={page}
    //         total={totalPages}
    //         onChange={(page) => setPage(page)}
    //       />
    //     </div>
    //   }
    />
  );
};

//   const cellValue = data.data[columnKey];

//   switch (columnKey) {
//     case "name":
//       return (
//         <span>
//           <p>{}</p>
//         </span>
//         // <User
//         //   avatarProps={{ radius: "lg", src: user.avatar }}
//         //   description={user.email}
//         //   name={cellValue}
//         // >
//         //   {user.email}
//         // </User>
//       );
//     case "role":
//       return (
//         <div className="flex flex-col">
//           <p className="text-bold text-sm capitalize">{cellValue}</p>
//           <p className="text-bold text-sm capitalize text-default-400">
//             {user.team}
//           </p>
//         </div>
//       );
//     case "status":
//       return (
//         <Chip
//           className="capitalize"
//           color={statusColorMap[user.status]}
//           size="sm"
//           variant="flat"
//         >
//           {cellValue}
//         </Chip>
//       );
//     case "actions":
//       return (
//         <div className="relative flex items-center gap-2">
//           <Tooltip content="Details">
//             <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
//               <EyeIcon />
//             </span>
//           </Tooltip>
//           <Tooltip content="Edit user">
//             <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
//               <EditIcon />
//             </span>
//           </Tooltip>
//           <Tooltip color="danger" content="Delete user">
//             <span className="text-lg text-danger cursor-pointer active:opacity-50">
//               <DeleteIcon />
//             </span>
//           </Tooltip>
//         </div>
//       );
//     default:
//       return cellValue;
//   }
