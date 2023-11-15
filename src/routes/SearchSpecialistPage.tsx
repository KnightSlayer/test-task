import { useMemo } from "react"
import { SpecialistFilterForm } from "../domain/specialist/SpecialistFilterForm/SpecialistFilterForm"
import { Preloader } from "../common/components/Preloader"
import { fetchALlSubjects } from "../domain/subject/subjectApi";

export const SearchSpecialistPagePath = "/"

export const SearchSpecialistPage = () => {
  const loaders = useMemo(() => [fetchALlSubjects], [])

  return (
    <Preloader loaders={loaders}>
      <div>
        <SpecialistFilterForm />
      </div>
    </Preloader>
  )
}