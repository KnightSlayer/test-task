import { memo, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { SpecialistFilterFormData, formDataToFilterData, SEX_OPTIONS, AGE_OPTIONS } from "./SpecialistFilterFormService"
import { Select } from "../../../common/components/Select";

export const SpecialistFilterForm = memo(() => {
  const { control, handleSubmit, watch, getValues, setValue } = useForm<SpecialistFilterFormData>({
    // defaultValues: { firstName: op.at(1) },
  });

  // const [v, setV] = useState(1)
  // useEffect(() => {
  //   const i = setInterval(() => setV(Math.random()), 2_000)
  //
  //   return () => clearInterval(i)
  // }, [])

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

  const subjectOptions: any[] = []

  const onSubmit = (data: SpecialistFilterFormData) => {
    console.log("onSubmit", data, formDataToFilterData(data))
  }

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
    </form>
  )
})