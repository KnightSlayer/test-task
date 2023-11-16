import styled from '@emotion/styled'
import { useCallback, useMemo, useRef } from "react"
import { SpecialistFilterForm } from "../../domain/specialist/SpecialistFilterForm/SpecialistFilterForm"
import { Preloader } from "../../common/components/Preloader"
import { fetchAllSubjectsThunk } from "../../domain/subject/subjectSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { SpecialistsFilter } from "../../domain/specialist/specialistApi";
import { loadFirstPageThunk, loadMoreThunk, selectSearchSpecialistPageState } from "./searchSpecialistPageSlice";
import { Button } from "../../common/components/Button";
import { SpecialistsList } from "../../domain/specialist/components/SpecialistsList";
import { EmptySearchBanner } from "./EmptySearchBanner";
import { desktopMediaQuery } from "../../common/styles";

export const SearchSpecialistPagePath = "/"

const PageStyled = styled.div`
  margin: auto;
  box-sizing: border-box;
  width: 320px;
  padding: 16px 16px 40px;

  ${desktopMediaQuery} {
  }
  
`

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

  const { status, totalCount, specialistIds } = useAppSelector(selectSearchSpecialistPageState)
  const isLoading = status === 'loading'
  const hasMore = totalCount !== null && totalCount > specialistIds.length
  const isEmptySearch = totalCount === 0

  return (
    <Preloader loaders={loaders}>
      <PageStyled>
        <SpecialistFilterForm
          onSubmit={onSubmit}
          disableSubmit={isLoading}
          style={{marginBottom: '8px'}}
        />

        { isEmptySearch && <EmptySearchBanner />}

        <SpecialistsList specialistIds={specialistIds} />

        { isLoading && <div> TODO: Skeleton </div>}
        { hasMore && (
          <Button onClick={loadMore} style={{margin: '32px auto 0'}}>
            Показать еще
          </Button>
        )}
      </PageStyled>
    </Preloader>
  )
}