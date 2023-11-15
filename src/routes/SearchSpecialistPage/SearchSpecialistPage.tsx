import { useCallback, useMemo, useRef } from "react"
import { SpecialistFilterForm } from "../../domain/specialist/SpecialistFilterForm/SpecialistFilterForm"
import { Preloader } from "../../common/components/Preloader"
import { fetchAllSubjectsThunk } from "../../domain/subject/subjectSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { SpecialistsFilter } from "../../domain/specialist/specialistApi";
import {loadFirstPageThunk, loadMoreThunk, selectSearchSpecialistPageState} from "./searchSpecialistPageSlice";

export const SearchSpecialistPagePath = "/"

export const SearchSpecialistPage = () => {
  const dispatch = useAppDispatch()
  const loaders = useMemo(() => [() => dispatch(fetchAllSubjectsThunk())], [])
  // я бы хранил применённый filter в редаксе. но в задании специально указано так не делать
  const lastSubmittedFilterRef = useRef<Omit<SpecialistsFilter, 'limit' | 'offset'>>()
  const onSubmit = useCallback((filterData: Omit<SpecialistsFilter, 'limit' | 'offset'>) => {
    lastSubmittedFilterRef.current = filterData
    dispatch(loadFirstPageThunk(lastSubmittedFilterRef.current))
  }, [])

  const loadMore = useCallback((filterData: Omit<SpecialistsFilter, 'limit' | 'offset'>) => {
    dispatch(loadMoreThunk(lastSubmittedFilterRef.current!))
  }, [])

  const isLoading = useAppSelector((state) => selectSearchSpecialistPageState(state).status === 'loading')

  return (
    <Preloader loaders={loaders}>
      <div>
        <SpecialistFilterForm
          onSubmit={onSubmit}
          disableSubmit={isLoading}
        />
      </div>
    </Preloader>
  )
}