import styled from '@emotion/styled'
import { memo, useEffect, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import qs from 'qs'
import {
  SpecialistFilterFormData,
  formDataToFilterData,
  filterDataToFormData,
  SEX_OPTIONS,
  AGE_OPTIONS,
  PROF_SPECIALITY_OPTIONS, RATING_OPTIONS
} from "./SpecialistFilterFormService"
import { Select } from "../../../common/components/Select"
import { useAppSelector } from "../../../store/hooks"
import { selectSubjects } from "../../subject/subjectSlice"
import { Button } from "../../../common/components/Button"
import { SpecialistsFilter } from "../specialistApi"
import { colors, desktopMediaQuery } from "../../../common/styles";


const ContainerStyled = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  border-radius: 2px;
  border: 1px solid ${colors.lightGray};
  padding: 8px;

  ${desktopMediaQuery} {
    gap: 36px;
    padding: 0;
    border: none;
  }
`

const FilterBlockStyled = styled.label<{oneLineMobile?: boolean}>`
  width: 100%;
  display: ${(props) => props.oneLineMobile ? 'flex' : 'block'};
  gap: 8px;
  align-items: center;
  
  > div {
    padding-bottom: ${(props) => props.oneLineMobile ? '0' : '8px'};
  }

  ${desktopMediaQuery} {
    width: 312px;
    display: block;
    
    > div {
      padding-bottom: 12px
    }
  }
`
const FilterButtonBlockStyled = styled.label`
  width: 100%;

  ${desktopMediaQuery} {
    width: 312px;
    display: flex;
    align-items: end;
  }

  > button {
    width: 100%;
  }
`
const FromToAgeStyled = styled.div`
  display: flex;
  gap: 15px;
  justify-content: space-between;
  align-items: center;
`
const FromToAgeItemStyled = styled.label`
  display: flex;
  align-items: center;

  gap: 4px;

  ${desktopMediaQuery} {
    gap: 12px;
  }
`

const LabelStyled = styled.div<{isMain?: boolean}>`
  line-height: 100%;
  font-weight: 700;

  font-size: 14px;

  ${desktopMediaQuery} {
    font-size: ${(props) => props.isMain ? '20px' : '18px'};
  }
`

type SpecialistFilterFormProps = {
  onSubmit: (filterData: Omit<SpecialistsFilter, 'limit' | 'offset'>) => void
  disableSubmit: boolean
  style: any
}

export const SpecialistFilterForm = memo((props: SpecialistFilterFormProps) => {
  const navigate = useNavigate();
  const queryFilters = qs.parse(window.location.search.slice(1)) as unknown as SpecialistsFilter // TODO: type guard

  // TODO: вынести subjectOptions в пропсы. а то из-за useAppSelector компонент ререндарится лишние разы
  // вообще с редаксом работать больно. даже с RTK. ререндеринги ещё ладно.
  // вы попробуйте сделать динамическое добавление редюсеров (например когда разные роуты на разные чанки разбиты)
  // есть такие хорошие альтернативы. например взгляните на "Zustand". любовь с первого взгляда
  const subjects = useAppSelector(selectSubjects)
  const subjectOptions = useMemo(() => Object.values(subjects).map(subject => ({
    value: subject.id,
    label: subject.name,
  })), [subjects])

  const { control, handleSubmit, watch, getValues, setValue } = useForm<SpecialistFilterFormData>({
    defaultValues: filterDataToFormData(queryFilters, subjectOptions),
  });

  // keep always ageFrom <= ageTo
  useEffect(() => {
    let prevFormData = getValues()
    watch((newFormData) => {
      try {
        if (!newFormData.ageFrom?.value) return
        if (!newFormData.ageTo?.value) return
        if (newFormData.ageFrom.value <= newFormData.ageTo.value) return

        if (prevFormData.ageTo?.value !== newFormData.ageTo.value) {
          setValue("ageFrom", newFormData.ageTo as any)
        } else {
          setValue("ageTo", newFormData.ageFrom as any)
        }
      } finally {
        prevFormData = newFormData as SpecialistFilterFormData
      }
    })
  }, [])

  const onSubmit = (data: SpecialistFilterFormData) => {
    // TODO: не сабмитить, если фильтр не поменялся.
    const filterData = formDataToFilterData(data)
    navigate(
      {search: qs.stringify(filterData)},
      { replace: true }, // чтобы не возиться с историй браузера
    )
    props.onSubmit(filterData)
  }


  useEffect(() => {
    handleSubmit(onSubmit)()
  }, [])

  return (
    <ContainerStyled onSubmit={handleSubmit(onSubmit)} style={props.style} >
      <FilterBlockStyled>
        <LabelStyled isMain> Я ищу психолога </LabelStyled>
        <Controller
          name="sex"
          control={control}
          render={
            ({ field }) => <Select
              {...field}
              options={SEX_OPTIONS}
            />
          }
        />
      </FilterBlockStyled>

      <FilterBlockStyled oneLineMobile>
        <LabelStyled> В возрасте </LabelStyled>

        <FromToAgeStyled>
          <FromToAgeItemStyled>
            <span> От </span>
            <Controller
              name="ageFrom"
              control={control}
              render={
                ({ field }) => <Select
                  {...field}
                  options={AGE_OPTIONS}
                />
              }
            />
          </FromToAgeItemStyled>

          <FromToAgeItemStyled>
            <span> До </span>
            <Controller
              name="ageTo"
              control={control}
              render={
                ({ field }) => <Select
                  {...field}
                  options={AGE_OPTIONS}
                />
              }
            />
          </FromToAgeItemStyled>
        </FromToAgeStyled>
      </FilterBlockStyled>

      <FilterBlockStyled>
        <LabelStyled> Тема </LabelStyled>
        <Controller
          name="subjectId"
          control={control}
          render={
            ({ field }) => <Select
              {...field}
              options={subjectOptions}
            />
          }
        />
      </FilterBlockStyled>

      <FilterBlockStyled>
        <LabelStyled> Квалификация </LabelStyled>
        <Controller
          name="profSpeciality"
          control={control}
          render={
            ({ field }) => <Select
              {...field}
              options={PROF_SPECIALITY_OPTIONS}
            />
          }
        />
      </FilterBlockStyled>

      <FilterBlockStyled>
        <LabelStyled> Рейтинг </LabelStyled>
        <Controller
          name="rating"
          control={control}
          render={
            ({ field }) => <Select
              {...field}
              options={RATING_OPTIONS}
            />
          }
        />
      </FilterBlockStyled>

      <FilterButtonBlockStyled>
        <Button disabled={props.disableSubmit}>
          Показать анкеты
        </Button>
      </FilterButtonBlockStyled>
    </ContainerStyled>
  )
})