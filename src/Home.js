
import './App.css';
import { Component } from 'react';
import React, {useState} from 'react';
import { GoogleLogin } from 'react-google-login';
import GooglePicker from 'react-google-picker';
import { Button } from 'semantic-ui-react';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import logo from './logo.jpg';
import Calendar from 'react-awesome-calendar';
import SearchBar from 'react-js-search';

import {
  AwesomeButton,
} from 'react-awesome-button';

const events = [{
    id: 1,
    color: '#fd3153',
    from: '2019-05-02T18:00:00+00:00',
    to: '2019-05-05T19:00:00+00:00',
    title: 'Reminder: Consent form should be returned by 5th'
}, {
    id: 2,
    color: '#1ccb9e',
    from: '2020-02-01T13:00:00+00:00',
    to: '2020-03-05T14:00:00+00:00',
    title: 'Reminder: Receive consent from patient'
}];

export const Home = () => (
  <div>
  <GooglePicker
         clientId={'814500681178-84hfbtnqfacc1mbli2aa0bbsb2ln6igf.apps.googleusercontent.com'}
          developerKey={'AIzaSyCAKk6fxcEQ9FZ3hcFFEkgFcOsuAfr3yno'}
          scope= {'https://www.googleapis.com/auth/drive'}
          onChange={data => console.log('on change:', data)}
          onAuthFailed={data => console.log('on auth failed:', data)}
          multiselect={true}
          navHidden={true}
          authImmediate={false}
          viewId={'DOCS'}
          mimeTypes={['image/png', 'image/jpeg', 'image/jpg']}
          createPicker={ (google, oauthToken) => {
            const googleViewId = google.picker.ViewId.DOCS;
            const uploadView = new google.picker.DocsUploadView();
            const docsView = new google.picker.DocsView(googleViewId)
                .setIncludeFolders(true)
                .setSelectFolderEnabled(true);

            const picker = new window.google.picker.PickerBuilder()
            .enableFeature(google.picker.Feature.SIMPLE_UPLOAD_ENABLED)
              .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                .addView(docsView)
                .addView(uploadView)/*DocsUploadView added*/
                .setOAuthToken(oauthToken)
                .setDeveloperKey('AIzaSyCAKk6fxcEQ9FZ3hcFFEkgFcOsuAfr3yno')
                .setCallback((data)=>{
                  if (data.action == google.picker.Action.PICKED) {
                      var fileId = data.docs[0].id;
                  }
                });
            picker.build().setVisible(true);
        }}>
            <Button>File Directory</Button>
    </GooglePicker>
    <Calendar
       events={events}
     />
  </div>
)
