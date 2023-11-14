import { Link } from "react-router-dom"
import { SearchSpecialistPagePath } from "./SearchSpecialistPage"

export const NotFoundPage = () => (
  <div>
    Куда пошёл? Других роутов нет.
    <Link to={SearchSpecialistPagePath}> Вернись на главную. </Link>
  </div>
)