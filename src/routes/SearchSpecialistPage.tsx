import { useCallback, useEffect, useMemo } from "react"
import { SpecialistFilterForm } from "../domain/specialist/SpecialistFilterForm/SpecialistFilterForm"
import { Preloader } from "../common/components/Preloader"
import { fetchAllSubjectsThunk } from "../domain/subject/subjectSlice";
import { useAppDispatch } from "../store/hooks";
import {FetchSpecialistsFilter} from "../domain/specialist/specialistApi";

export const SearchSpecialistPagePath = "/"

export const SearchSpecialistPage = () => {
  const dispatch = useAppDispatch()
  const loaders = useMemo(() => [() => dispatch(fetchAllSubjectsThunk())], [])
  const onSubmit = useCallback((filterData: Omit<FetchSpecialistsFilter, 'limit' | 'offset'>) => {
    console.log('onSubmit', filterData)
  }, [])


  return (
    <Preloader loaders={loaders}>
      <div>
        <SpecialistFilterForm onSubmit={onSubmit} />
      </div>
    </Preloader>
  )
}