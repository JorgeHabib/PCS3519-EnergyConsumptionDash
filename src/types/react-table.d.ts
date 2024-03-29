import { toPatternTypes } from '@/components/Forms/ControlledInput/toPattern'
import { RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: string) => void
  }
  interface ColumnMeta<TData extends RowData, TValue> {
    isEditable?: boolean
    inputType?: toPatternTypes
    content?: 'component'
  }
}
