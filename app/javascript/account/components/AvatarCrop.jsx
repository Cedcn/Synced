import React, { PropTypes } from 'react';
import Cropper from 'react-cropper';
import { observer, inject } from 'mobx-react';
import Dialog from 'react-toolbox/lib/dialog';

import 'cropperjs/dist/cropper.css';

@inject('userinfo', 'croperState') @observer
class AvatarCrop extends React.Component {
  state = {
    cropResult: '',
    isShow: false
  }

  handleToggle = () => {
    this.props.croperState.active = !this.props.croperState.active;
  }

  actions = [
    { label: 'Cancel', onClick: this.handleToggle },
    { label: 'Save', onClick: this.handleToggle }
  ];
  _crop = () => {
    // this.props.userinfo.avatar = this.cropper.getCroppedCanvas().toDataURL();
  }

  render() {
    return (
      <Dialog
        actions={this.actions}
        active={this.props.croperState.active}
        onEscKeyDown={this.handleToggle}
        onOverlayClick={this.handleToggle}
        >
        <Cropper
          ref={cropper => { this.cropper = cropper; }}
          src={this.props.croperState.src}
          style={{ height: 200, width: 300 }}
          aspectRatio={1}
          viewMode={1}
          guides
          // preview=".preview-avatar"
          autoCropArea={1}
          crop={this._crop} />
      </Dialog>
    );
  }
}

AvatarCrop.propTypes = {
  croperState: PropTypes.object
};
export default AvatarCrop;
