import { ProfSpeciality, Sex } from "../Specialist"
import { SubjectId } from "../../subject/Subject"
import { FetchSpecialistsFilter } from "../specialistApi"

type SelectValueOf<V> = {
  value: V | undefined
  label: string
}

export type SpecialistFilterFormData = {
  sex?: SelectValueOf<Sex>
  profSpeciality?: SelectValueOf<ProfSpeciality>
  ageFrom?: SelectValueOf<number>
  ageTo?: SelectValueOf<number>
  subjectId?: SelectValueOf<SubjectId>
  rating?: SelectValueOf<{ from: number; to: number }>
}

const RATING_STEP = 10
const MAX_RATING = 100

export const SEX_OPTIONS: SelectValueOf<Sex>[] = [
  {
    value: undefined,
    label: "Любого пола",
  },
  {
    value: Sex.FEMALE,
    label: "Женщину",
  },
  {
    value: Sex.MALE,
    label: "Мужчину",
  },
]

export const PROF_SPECIALITY_OPTIONS: SelectValueOf<ProfSpeciality>[] = [
  {
    value: undefined,
    label: "Все варианты",
  },
  {
    value: ProfSpeciality.COACH,
    label: "Коуч",
  },
  {
    value: ProfSpeciality.CONSULTANT,
    label: "Консультант",
  },
  {
    value: ProfSpeciality.SEXOLOGIST,
    label: "Сексолог",
  },
]

const MIN_AGE = 18
const MAX_AGE = 99
export const AGE_OPTIONS: SelectValueOf<number>[] = Array(MAX_AGE - MIN_AGE + 1).fill(null).map((_, index) => ({
    value: MIN_AGE + index,
    label: String(MIN_AGE + index),
}))

export const RATING_OPTIONS: SelectValueOf<{ from: number; to: number }>[] = (() => {
    const options: SelectValueOf<{ from: number; to: number }>[] = [
      {
        value: undefined,
        label: "Не важен",
      },
      {
        value: { from: 0, to: 0 },
        label: "New",
      },
    ]

    let currentRating = 1

    while (currentRating <= MAX_RATING) {
      const from = currentRating
      const to = Math.min(from + RATING_STEP - 1, MAX_RATING)
      options.push({
        value: { from, to },
        label: from === to ? String(from) : `${from} - ${to}`,
      })
      currentRating += RATING_STEP
    }

    return options
})()

export const formDataToFilterData = (formDara: SpecialistFilterFormData): Omit<FetchSpecialistsFilter, 'limit' | 'offset'> => {
  return {
    sex: formDara.sex?.value,
    profSpeciality: formDara.profSpeciality?.value,
    ageFrom: formDara.ageFrom?.value,
    ageTo: formDara.ageTo?.value,
    ratingFrom: formDara.rating?.value?.from,
    ratingTo: formDara.rating?.value?.to,
    subjectId: formDara.subjectId?.value,
  }
}

export const filterDataToFormData = (filterData: FetchSpecialistsFilter, subjectOptions: SelectValueOf<SubjectId>[] ): SpecialistFilterFormData => {
  return {
    sex: SEX_OPTIONS.find((opt) => opt.value === filterData.sex),
    profSpeciality: PROF_SPECIALITY_OPTIONS.find((opt) => opt.value === filterData.profSpeciality),
    ageFrom: filterData.ageFrom == null ? undefined : { value: filterData.ageFrom, label: String(filterData.ageFrom) },
    ageTo: filterData.ageTo == null ? undefined : { value: filterData.ageTo, label: String(filterData.ageTo) },
    rating: RATING_OPTIONS.find((opt) => opt.value?.from === filterData.ageFrom && opt.value?.to === filterData.ageTo),
    subjectId: subjectOptions.find((opt) => opt.value === filterData.subjectId),
  }
}