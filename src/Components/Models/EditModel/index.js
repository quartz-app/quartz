import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import { Modal, Button, Spinner } from 'Components/Common'
import ModelInfo from './ModelInfo'
import Specs from './Specs'

// CSS
import './EditModel.scss'

// Actions
import { updateNBAModel } from 'Actions'

class EditModel extends React.Component {
  state = {
    initialName: this.props.model.name,
    name: this.props.model.name,
    specs: this.props.model.specs
  }

  componentWillReceiveProps (newProps) {
    if (!newProps.updatingModel && this.props.updatingModel) {
      this.props.toggle()
    }
  }

  changeSpecs = (e) => {
    const newSpecs = this.state.specs
    newSpecs[e.target.name] = e.target.value

    this.setState({ specs: newSpecs })
  }

  changeInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  editModel = () => {
    const name = this.state.name || this.state.initialName
    this.props.updateNBAModel(this.props.model.id, {
      model: {
        name,
        specs: this.state.specs,
        status: this.props.model.status
      }
    })
  }

  render () {
    const { toggle, isOpen, updatingModel } = this.props
    let footer
    if (updatingModel) {
      footer = [
        <Button key="disabled" disabled>Closed</Button>,
        <Button key="spinner" style={{ padding: '0 20.3px' }}>
          <Spinner xs show color="#fff" style={{ marginBottom: '3px' }} />
        </Button>
      ]
    } else {
      footer = [
        <Button onClick={toggle} key="close-edit" flat>Close</Button>,
        <Button onClick={this.editModel} key="edit">Edit</Button>
      ]
    }
    return (
      <Modal
        header="Edit Model"
        toggle={toggle}
        isOpen={isOpen}
        footer={footer}
        wrapperStyle={{ minWidth: '500px', minHeight: '500px' }}
      >
        <div styleName="modal-body">
          <ModelInfo name={this.state.name} changeInput={this.changeInput} />
          <Specs specs={this.state.specs} changeSpecs={this.changeSpecs} />
        </div>
      </Modal>
    )
  }
}

EditModel.defaultProps = {
  updatingModel: false
}

EditModel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  model: PropTypes.object.isRequired,
  updateNBAModel: PropTypes.func.isRequired,
  updatingModel: PropTypes.bool
}

const mapStateToProps = ({ routines }) => ({
  updatingModel: routines.callingApi.putNBAModel
})

const mapDispatchToProps = {
  updateNBAModel
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditModel)
