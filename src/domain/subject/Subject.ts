export type SubjectId = number & { __brand: "SubjectId" }

export type SubjectName = `#${string}`

export type Subject = {
  id: SubjectId
  name: SubjectName
  sequence: number
}
