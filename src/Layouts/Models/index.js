import Loadable from 'react-loadable'

// Components
import { Loading } from 'Components/Common'

const ModelsLayout = Loadable({
  loader: () => import('./ModelsRoute'),
  loading: Loading
})

export default ModelsLayout
