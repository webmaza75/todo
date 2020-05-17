export interface TaskItem {
  id: number,
  enabled?: boolean,
  type: string,
  title: string,
  timeZone: string,
  reportTime: string,
  repeat: number[],
  from?: string,
  recipient?: string,
  equipment?: string,
}

export enum AvatarType {
  PAYLOAD_MONITORING_REPORT = 'Payload Monitoring Report',
  FRAGMENTATION_REPORT = 'Fragmentation Report',
  TOOTH_DETECTION_REPORT = 'Tooth Detection Report',
  NOT_APPLICABLE = 'NA'
}
