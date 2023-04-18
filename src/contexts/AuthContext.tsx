import { createContext, ReactNode, useEffect, useRef, useState } from 'react'
import mqtt, { MqttClient } from 'mqtt'
import React from 'react'
import { api } from '@/services/api'
import { useQuery } from 'react-query'

type AuthContextData = {
  content: RawEnergyProps[]
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProviderProps = {
  children: ReactNode
}

const host = '143.107.102.8'
const port = '8083'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const topic = 'garsoft/dev/je05/dados'
const connectUrl = `ws://${host}:${port}/mqtt`;

// "VARMS": TENSAO EM A RMS
//     "VBRMS": TENSAO EM B RMS
//     "VCRMS": TENSAO EM C RMS
//     "IARMS": CORRENTE EM A RMS
//     "IBRMS": CORRENTE EM B RMS
//     "ICRMS": CORRENTE EM C RMS
//     "VABRMS": TEMSAP EMTRE A E B RMS
//     "VBCRMS": TENSAO ENTRE B E C RMS
//     "VCARMS": TENSAO ENTRE C E A RMS
//     "VABCTRMS": ?
//     "PA": POTENCIA ATIVA A
//     "PB": POTENCIA ATIVA B
//     "PC": POTENCIA ATIVA C
//     "PT": POTENCIA TOTAL
//     "QA": POTENCIA REATIVA A
//     "QB": POTENCIA REATIVA B
//     "QC": POTENCIA REATIVA C
//     "QT": POTENCIA REATIVA TOTAL
//     "SA": POTENCIA APARENTE A
//     "SB": POTENCIA APARENTE B
//     "SC": POTENCIA APARENTE C
//     "ST": POTENCIA APARENTE TOTAL
//     "FPA": FATOR DE POTENCIA A
//     "FPB": FATOR DE POTENCIA B
//     "FPC": FATOR DE POTENCIA C
//     "FPT": FATOR DE POTENCIA TOTAL
//     "KVARHA":  ENERGIA REATIVA EM A
//     "KVARHB": ENERGIA REATIVA EM B
//     "KVARHC": ENERGIA REATIVA EM C
//     "KVARHT": ENERGIA REATIVA TOTAL
//     "KWHA": ENERGIA ATIVA A
//     "KWHB": ENERGIA ATIVA B
//     "KWHC": ENERGIA ATIVA C
//     "KWHT": ENERGIA ATIVA TOTAL;
//     "FREQ": FREQUENIA (X100)
//     "TEMP": TEMPERATURA
//     "SERRS": ?
//     "WRSSI": ?
//     "UPTIME": 62924

interface RawEnergyProps {
  VARMS: number; // TENSAO EM A RMS
  VBRMS: number; // TENSAO EM B RMS
  VCRMS: number; // TENSAO EM C RMS
  IARMS: number; // CORRENTE EM A RMS
  IBRMS: number; // CORRENTE EM B RMS
  ICRMS: number; // CORRENTE EM C RMS
  VABRMS: number; // TEMSAP EMTRE A E B RMS
  VBCRMS: number; // TENSAO ENTRE B E C RMS
  VCARMS: number; // TENSAO ENTRE C E A RMS
  VABCTRMS: number; // ?
  PA: number;  // POTENCIA ATIVA A
  PB: number;   // POTENCIA ATIVA B
  PC: number;   // POTENCIA ATIVA C
  PT: number;   // POTENCIA TOTAL
  QA: number;   // POTENCIA REATIVA A
  QB: number;   // POTENCIA REATIVA B
  QC: number;   // POTENCIA REATIVA C
  QT: number;   // POTENCIA REATIVA TOTAL
  SA: number;   // POTENCIA APARENTE A
  SB: number;   // POTENCIA APARENTE B
  SC: number;   // POTENCIA APARENTE C
  ST: number;   // POTENCIA APARENTE TOTAL
  FPA: number;  // FATOR DE POTENCIA A
  FPB: number;  // FATOR DE POTENCIA B
  FPC: number;  // FATOR DE POTENCIA C
  FPT: number;  // FATOR DE POTENCIA TOTAL
  KVARHA: number; // ENERGIA REATIVA EM A
  KVARHB: number; // ENERGIA REATIVA EM B
  KVARHC: number; // ENERGIA REATIVA EM C
  KVARHT: number; // ENERGIA REATIVA TOTAL
  KWHA: number; // ENERGIA ATIVA A
  KWHB: number; // ENERGIA ATIVA B
  KWHC: number;  // ENERGIA ATIVA C
  KWHT: number; // ENERGIA ATIVA TOTAL;
  FREQ: number; // FREQUENIA (X100)
  TEMP: number; // TEMPERATURA
  SERRS: number;
  WRSSI: number;
  UPTIME: number;
  created_at: Date;
}

interface RawEnergyMessage {
  DATA: RawEnergyProps
}

export function AuthProvider({ children }: AuthProviderProps) {
  const query = useQuery('content', async () => {
    const response = await api.get<{ data: RawEnergyProps[] }>('/')

    return response.data.data
  }, {
    refetchInterval: 10000,
  })

  return (
    <AuthContext.Provider value={{ content: query.data || [] }}>
      {children}
    </AuthContext.Provider>
  )
}
