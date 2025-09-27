import { SquareCheckBig } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatBytes } from "@/hooks/use-file-upload"
import {
  attendanceFileHeaders,
  maxSizeInBytes,
  validFileExtensions,
} from "@/modules/attendance/constants/attendance-report-file-requirements"

function RequirementItem({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full flex items-center gap-1 text-sm">
      <SquareCheckBig className="shrink-0 size-5 text-green-400" />
      <div className="w-full flex items-center gap-2 flex-wrap">
        {children}
      </div>
    </div>
  )
}

export default function FileRequirements() {
  return (
    <div className="w-full flex flex-col gap-4 my-4">
      <div>
        <p className="text-sm">Requisitos del archivo</p>
        <p className="text-sm text-muted-foreground">
          Para que puedas subir el archivo de asistencia, asegúrate de que cumpla con los siguientes requisitos:
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <RequirementItem>
          <span>Formato:</span>
          {validFileExtensions.map((ext) => (
            <Badge key={ext}>{ext}</Badge>
          ))}
        </RequirementItem>

        <RequirementItem>
          <span>Columnas obligatorias:</span>
          {attendanceFileHeaders.map((header) => (
            <Badge key={header}>{header}</Badge>
          ))}
        </RequirementItem>

        <RequirementItem>
          <p>Sin filas vacías en columnas obligatorias.</p>
        </RequirementItem>

        <RequirementItem>
          <p>
            Dos <Badge>Nombre</Badge> distintos con mismo{" "}
            <Badge>Usuario Nro.</Badge> es inválido.
          </p>
        </RequirementItem>

        <RequirementItem>
          <p>
            Todas las fechas deben seguir el formato{" "}
            <Badge>DD/MM/AAAA HH:MM</Badge> (por ejemplo,{" "}
            <Badge>10/01/2024 07:56</Badge>{" "}
            <Badge>7/01/2024 07:56</Badge>).
          </p>
        </RequirementItem>

        {/* TO DO: MEJORAR ESTE MSJ AGREGAR EJEMPLO */}
        <RequirementItem>
          <p>
            Cada <Badge>Fecha/Hora</Badge> debe estar en el mes y año
            seleccionado arriba.
          </p>
        </RequirementItem>

        <RequirementItem>
          <p>
            El archivo no debe exceder los{" "}
            <Badge>{formatBytes(maxSizeInBytes)}</Badge> de tamaño.
          </p>
        </RequirementItem>

        {/* TO DO: MEJORAR ESTE MSJ AGREGAR EJEMPLO */}
        <RequirementItem>
          <p>
            Todos los usuarios del archivo deben estar dado de alta en el sistema, con mismo tipo y valor de documento como figura en el Excel.
          </p>
        </RequirementItem>

        {/* TO DO: MEJORAR ESTE MSJ AGREGAR EJEMPLO */}
        <RequirementItem>
          <p>
            Los DNI no pueden contener puntos, comas, espacios ni nada, solo números.
          </p>
        </RequirementItem>
      </div>
    </div>
  )
}
