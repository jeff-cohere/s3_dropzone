import React from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone-uploader';
import S3 from 'aws-sdk/clients/s3';
import 'react-dropzone-uploader/dist/styles.css';

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bucketName: 's3-dropzone-test',
      s3: new S3({
        apiVersion: '2006-03-01',
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      })
    };
  }

  render() {
    const getUploadParams = ({ meta: {name} }) => {
      let params = {
        Bucket: this.state.bucketName,
        Fields: {key: name}
      };
      this.state.s3.createPresignedPost(params, function(err, data) {
        if (err) {
          console.error("Presigning post data encountered an error: ", err);
          return '';
        }
        else {
          console.log("The POST data is ", data);
          let {fields, url} = data;
          return {fields, meta: {name}, url: url}
        }
      })
    }

    const handleChangeStatus = ({ meta }, status) => {
      console.log(status, meta)
    }

    const handleSubmit = (files, allFiles) => {
      console.log(files.map(f => f.meta))
      allFiles.forEach(f => f.remove())
    }

    return (
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
      />
    )
  }
}

class UploadPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem('user'))
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Greetings, {user.firstName}!</h1>
        <Uploader />
        <p>
          <Link to="/login">Logout</Link>
        </p>
      </div>
    );
  }
}

export { UploadPage };
