export type towerType = "A" | "B";
type defaultSelectType = "";
export interface IMeetingRoomBooking {
  tower: towerType | defaultSelectType;
  floor: number | defaultSelectType;
  number: number | defaultSelectType;
  date: string;
  comment?: string;
}
