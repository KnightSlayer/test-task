import { ProfSpeciality, Sex, SpecialistLevel, Specialist } from "./Specialist"
import { SubjectId } from "../subject/Subject"
import { API_ROOT } from "../../common/api";

export enum FetchSpecialistsFilterType {
  ALL = 0,
  ONLINE = 1,
  FAVORITES = 2,
}

export type FetchSpecialistsFilter = {
  limit: number
  offset?: number
  level?: SpecialistLevel
  sex?: Sex
  subjectId?: SubjectId
  profSpeciality?: ProfSpeciality
  isCertified?: boolean
  ratingFrom?: number
  ratingTo?: number
  ageFrom?: number
  ageTo?: number
  filterType?: FetchSpecialistsFilterType
}

export const fetchSpecialists = async (filter: FetchSpecialistsFilter) => {
  const res: {
    data: {
      items: Specialist[]
      totalCount: number
    }
  } = await fetch(`${API_ROOT}/search/specialists`).then((response) =>
    response.json(),
  )

  return res.data
}
