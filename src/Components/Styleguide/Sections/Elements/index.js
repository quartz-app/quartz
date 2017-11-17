import React from 'react'

// Components
import SectionHeader from './../../SectionHeader'
import SubHeader from './../../SubHeader'
import Buttons from './Buttons'

// Props
import { buttonThemes } from './Buttons/button-themes'

// CSS
import './Elements.scss'

const Elements = () => (
  <div styleName="elements">
    <SectionHeader headerText='Elements' />
    <SubHeader subHeaderText='Buttons' />
    <div styleName="buttons-list">
      {
        buttonThemes.map((theme) => (
          <Buttons theme={theme} key={theme.text} />
        ))
      }
    </div>
  </div>
)

export default Elements