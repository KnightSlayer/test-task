import { SubjectName } from "../subject/Subject"
import { IsoDate } from "../../common/types"

export type SpecialistId = string & { __brand: "SpecialistId" }

export enum Sex {
  MALE = 1,
  FEMALE = 2,
}
export enum SpecialistLevel {
  BASE = 0,
  PREMIUM = 1,
}

export enum OnlineStatus {
  OFFLINE = 1,
  ONLINE = 2,
}

export enum ProfSpeciality {
  CONSULTANT = 1,
  SEXOLOGIST = 2,
  COACH = 3,
}

export type Specialist = {
  userId: SpecialistId
  name: string
  sex: Sex
  age: number
  birthDate: IsoDate
  photoUrl: string
  avatarId: string
  level: SpecialistLevel
  rating: number
  hasVideo: boolean
  defaultSubjectName: SubjectName
  subjectsCount: number
  isFavorite: boolean
  onlineStatus: OnlineStatus
  lastActivityTime: IsoDate
}
