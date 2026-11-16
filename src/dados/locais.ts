import { LOCAL_IDS, type Local, type LocalId } from '../dominio/tipos';

// Locais reais de Teófilo Otoni. Bairro e distância são aproximados.
// Não acrescente informação sobre os estabelecimentos além do que está aqui.
const POR_ID: Record<LocalId, Local> = {
  'praca-tiradentes': { id: 'praca-tiradentes', nome: 'Praça Tiradentes', curto: 'Pç. Tiradentes', bairro: 'Centro', kmDoCentro: 0, tipo: 'Praça, ao ar livre' },
  'praca-germanica': { id: 'praca-germanica', nome: 'Praça Germânica', curto: 'Pç. Germânica', bairro: 'Centro', kmDoCentro: 0.5, tipo: 'Praça, ao ar livre' },
  'parque-exposicoes': { id: 'parque-exposicoes', nome: 'Parque de Exposições (Pampulhinha)', curto: 'Parque de Exposições', bairro: 'Pampulhinha', kmDoCentro: 4, tipo: 'Espaço de eventos' },
  expominas: { id: 'expominas', nome: 'Expominas Teófilo Otoni', curto: 'Expominas', bairro: 'Pampulhinha', kmDoCentro: 4.5, tipo: 'Centro de convenções e eventos' },
  'green-bar': { id: 'green-bar', nome: 'Green Bar', curto: 'Green Bar', bairro: 'Centro', kmDoCentro: 0.8, tipo: 'Bar com música ao vivo, samba e pagode' },
  'chicos-bar': { id: 'chicos-bar', nome: "Chico's Bar (Bar Praça É Nossa)", curto: "Chico's Bar", bairro: 'Marajoara', kmDoCentro: 1.2, tipo: 'Boteco com shows de sertanejo' },
  trapiche: { id: 'trapiche', nome: 'Trapiche Pub', curto: 'Trapiche Pub', bairro: 'Centro', kmDoCentro: 0.5, tipo: 'Pub com música ao vivo, rock' },
  butiquim: { id: 'butiquim', nome: 'Butiquim Villa', curto: 'Butiquim', bairro: 'São Diogo', kmDoCentro: 1.5, tipo: 'Bar e casa noturna, festas e DJs' },
  'arena-sports': { id: 'arena-sports', nome: 'Arena Sports Bar', curto: 'Arena Sports', bairro: 'Dr. Laerte Laender', kmDoCentro: 3.5, tipo: 'Sports bar, música ao vivo e entretenimento' },
  raynices: { id: 'raynices', nome: "Raynice's Bar e Restaurante", curto: "Raynice's", bairro: 'Castro Pires', kmDoCentro: 3.5, tipo: 'Bar tradicional com música ao vivo' },
};

export const LOCAIS: readonly Local[] = LOCAL_IDS.map((id) => POR_ID[id]);

export function localPorId(id: LocalId): Local {
  return POR_ID[id];
}
