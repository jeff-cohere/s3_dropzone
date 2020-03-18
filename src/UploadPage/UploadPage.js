import React from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone-uploader';
import S3 from 'aws-sdk/clients/s3';
import 'react-dropzone-uploader/dist/styles.css';

class Uploader extends React.Component {

  render() {
    const getUploadParams = async ({ file, meta: {name} }) => {
      const s3 = new S3({
        apiVersion: '2006-03-01',
        accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
        // If we don't specify a region, we get the wrong endpoint back!
        region: process.env.REACT_APP_S3_REGION
      });

      let bucketName = process.env.REACT_APP_S3_BUCKET_NAME;
      let params = {
        Bucket: bucketName,
        Fields: {
          key: name
        }
      };

      let {fields, url} = s3.createPresignedPost(params);
      let result = {
        fields,
        url: url,
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      };
      return result;
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
