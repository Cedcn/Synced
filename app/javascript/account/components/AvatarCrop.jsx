import React from 'react';
import $ from 'jquery';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class AvatarCrop extends React.Component {
  state = {
    src: 'https://o7h2xtq3g.qnssl.com/uploads/user/avatar/9ddec0bf-6de4-4bf3-9924-4b89d648e5c6/11457566__.png',
    cropResult: '',
    isShow: false
  }

  upLoadImage = e => {
    this.setState({ isShow: true });
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  _crop = () => {
    // this.setState({ img: this.refs.cropper.getCroppedCanvas().toDataURL() });
  }

  render() {
    return (
      <div className="avatar-crop">
        <p>头像设置</p>
        <input ref="imageInput" type="file" accept="image/*" onChange={this.upLoadImage} />
        <div className="avatar" onClick={() => $(this.refs.imageInput).trigger('click')} >
          <div className="preview-avatar" />
          <div className="tip">上传头像</div>
        </div>
        <div className={`${this.state.isShow ? 'show' : ''} avatar-cropper`}>
          <h5>裁切（选择区域）</h5>
          <Cropper
            ref="cropper"
            src={this.state.src}
            style={{ height: 200, width: 300 }}
            aspectRatio={1}
            viewMode={1}
            guides
            preview=".preview-avatar"
            autoCropArea={1}
            crop={this._crop} />
        </div>
      </div>
    );
  }
}

export default AvatarCrop;
