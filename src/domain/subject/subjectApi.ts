import { Subject } from "./Subject"
import { API_ROOT } from "../../common/api";

export const fetchALlSubjects = async (): Promise<Subject[]> => {
  const res: { data: Subject[] } = await fetch(`${API_ROOT}/subjects`).then(
    (response) => response.json(),
  )

  return res.data
}