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

type SpecialistFilterFormProps = {
  onSubmit: (filterData: Omit<SpecialistsFilter, 'limit' | 'offset'>) => void
  disableSubmit: boolean
}

export const SpecialistFilterForm = memo((props: SpecialistFilterFormProps) => {
  const navigate = useNavigate();
  const queryFilters = qs.parse(window.location.search.slice(1)) as unknown as SpecialistsFilter // TODO: type guard

  // TODO: вынести subjectOptions в пропсы. а то из-за useAppSelector компонент ререндарится лишние разы
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
    // TODO: не сабмитить, если фильтр не поменялся
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <span> Я ищу психолога </span>
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
      </label>

      <div>
        <span> В возрасте </span>

        <label>
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
        </label>

        <label>
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
        </label>
      </div>

      <label>
        <span> Тема </span>
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
      </label>

      <label>
        <span> Квалификация </span>
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
      </label>

      <label>
        <span> Рейтинг </span>
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
      </label>

      <Button disabled={props.disableSubmit}>
        Показать анкеты
      </Button>
    </form>
  )
})