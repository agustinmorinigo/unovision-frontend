import { LibraryBig, NotebookPen, FileInput, FileSliders, CalendarDays, ChartNoAxesCombined } from 'lucide-react'

export const attendanceReportSteps = [
  {
    step: 1,
    title: "Instructivo",
    description: "¿Cómo funciona?",
    Icon: LibraryBig,
  },
  {
    step: 2,
    title: "Datos básicos",
    description: "Para generar el reporte",
    Icon: FileInput,
  },
  {
    step: 3,
    title: "Validación",
    description: "Correción datos incorrectos",
    Icon: FileSliders,
  },
  {
    step: 4,
    title: "Justificaciones",
    description: "Justificar inasistencias",
    Icon: NotebookPen,
  },
  {
    step: 5,
    title: "Días especiales",
    description: "Feriados, eventos, etc.",
    Icon: CalendarDays,
  },
  {
    step: 6,
    title: "Reporte final",
    description: "Generación del informe final",
    Icon: ChartNoAxesCombined,
  },
]