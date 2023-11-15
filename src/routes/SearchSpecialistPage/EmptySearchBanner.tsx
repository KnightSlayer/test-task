import NotFoundCardIcon from '../../common/assets/not-found-card.svg'

export const EmptySearchBanner = () => (
  <div>
    <img src={NotFoundCardIcon} />

    <div>
      К сожалению, нет анкет с такими параметрами
    </div>
  </div>
)