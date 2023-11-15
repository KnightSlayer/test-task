import { Subject } from "./Subject"
import { API_ROOT } from "../../common/api"

export const fetchALlSubjects = async (): Promise<Subject[]> => {
  const res: { data: Subject[] } = await fetch(`${API_ROOT}/subjects`).then(
    (response) => response.json(),
  )

  return res.data
}

export const fetchAllSubjectsMemoized = (() => {
  let memoizedResponsePromise: Promise<Subject[]> | null

  return () => {
    if (!memoizedResponsePromise) {
      memoizedResponsePromise = fetchALlSubjects()
      memoizedResponsePromise.catch(() => {
        memoizedResponsePromise = null
      })
    }

    return memoizedResponsePromise
  }
})()