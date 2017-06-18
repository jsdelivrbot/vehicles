#!/usr/bin/python

# googlecloudapiimages.py

from flask import render_template, request, flash, redirect, url_for

from __init__ import app, db, config
import sys
import json
import boto
# import gcs_oauth2_boto_plugin
import os
import shutil
# import StringIO
try:
    import cStringIO as stringIOModule
except ImportError:
    try:
        import StringIO as stringIOModule
    except ImportError:
        import io as stringIOModule
import io

import six
import tempfile
import time

from googleapiclient.discovery import build
from oauth2client.client import GoogleCredentials

# from google.appengine.ext.blobstore import BlobKey
# from google.appengine.api.images import get_serving_url
# from webapp2 import RequestHandler


# URI scheme for Cloud Storage.
GOOGLE_STORAGE = 'gs'
# URI scheme for accessing local files.
LOCAL_FILE = 'file'

# Fallback logic. In https://console.cloud.google.com/
# under Credentials, create a new client ID for an installed application.
# Required only if you have not configured client ID/secret in
# the .boto file or as environment variables.
CLIENT_ID = 'your client id'
CLIENT_SECRET = 'your client secret'

cfgprojectid = config.get('GoogleCloudInfo', 'PROJECT_ID')
cfgclientid = config.get('GoogleCloudInfo', 'CLIENT_ID')
cfgclientsecret = config.get('GoogleCloudInfo', 'CLIENT_SECRET')
cfgbucketname = config.get('GoogleCloudInfo', 'BUCKET_NAME')
cfguri = config.get('GoogleCloudInfo', 'URI')
cfgproject_num = config.get('GoogleCloudInfo', 'PROJECT_NUM')
cfglocaldir = config.get('GoogleCloudInfo', 'GC_LOCAL_DIR')

# below will be used to get environment variable data
# used if exists in place of the above
tmpprojectid = os.environ.get('GOOGLECLOUD_PROJECT_ID', cfgprojectid)
tmpclientid = os.environ.get('GOOGLECLOUD_CLIENT_ID', cfgclientid)
tmpclientsecret = os.environ.get('GOOGLECLOUD_CLIENT_SECRET', cfgclientsecret)
tmpbucketname = os.environ.get('GOOGLECLOUD_BUCKET_NAME', cfgbucketname)
tmpuri = os.environ.get('GOOGLECLOUD_URI', cfguri)
tmpproject_num = os.environ.get('GOOGLECLOUD_PROJECT_NUM', cfgproject_num)
tmplocaldir = os.environ.get('GOOGLECLOUD_GC_LOCAL_DIR', cfglocaldir)

@app.route('/downloadGCImages', methods=['POST', 'GET'])
def downloadGCImages():
    # http://127.0.0.1:53000/downloadGCImages
    print("inside downloadGCImages2")
    imagelist = []
    DOGS_BUCKET="rajpics"
    CATS_BUCKET="rajpics"
    # Listing objects
    uri = boto.storage_uri(DOGS_BUCKET, GOOGLE_STORAGE)
    for obj in uri.get_bucket():
        print('%s://%s/%s' % (uri.scheme, uri.bucket_name, obj.name))
        # print('  "%s"' % obj.get_contents_as_string())
        # , "image":obj.get_contents_as_string()
        imagelist.append({
            "bucket_name":uri.bucket_name,
            "name":obj.name
            
        })
        print("image added to json list")
        src_uri = boto.storage_uri(
            DOGS_BUCKET + '/' + obj.name, GOOGLE_STORAGE)

        # Create a file-like object for holding the object contents.
        object_contents = io.BytesIO()
        # object_contents = obj.get_contents_as_string()

        # The unintuitively-named get_file() doesn't return the object
        # contents; instead, it actually writes the contents to
        # object_contents.
        src_uri.get_key().get_file(object_contents)
        print("after get file")

        local_dst_uri = boto.storage_uri(
            os.path.join(tmplocaldir, obj.name), LOCAL_FILE)

        bucket_dst_uri = boto.storage_uri(
            CATS_BUCKET + '/' + obj.name, GOOGLE_STORAGE)

        print("before writing to local file")
        # for dst_uri in (local_dst_uri, bucket_dst_uri):
        #    print("before seek")
        #    object_contents.seek(0)
        #    print("after seek")
        #    dst_uri.new_key().set_contents_from_file(object_contents)
        #    print("after write")

        print("before seek")
        object_contents.seek(0)
        print("after seek")
        local_dst_uri.new_key().set_contents_from_file(object_contents)
        print("after write")
        object_contents.close()

        print("Images written to dir:"+tmplocaldir)

    return app.response_class(json.dumps(imagelist), content_type='application/json')
  

@app.route('/listGCBucketNames', methods=['POST', 'GET'])
def listGCBucketNames():
    # http://127.0.0.1:53000/listGCBucketNames


    bucketlist = []
    uri = boto.storage_uri('', GOOGLE_STORAGE)
    header_values = {"x-goog-project-id": tmpproject_num}
    # If the default project is defined, call get_all_buckets() without arguments.
    for bucket in uri.get_all_buckets(headers=header_values):
          print("bucket name:"+bucket.name)
          bucketlist.append({
            "bucket_name":bucket.name
        })

    return app.response_class(json.dumps(bucketlist), content_type='application/json')
  
@app.route('/uploadImagestoGC', methods=['POST', 'GET'])
def uploadImagestoGC():
    # http://127.0.0.1:53000/downloadGCImages
    print("inside uploadImagestoGC")
    # print("image :"+request.form(["imageid"]))
    imagelist = []

    DOGS_BUCKET="rajpics"
    CATS_BUCKET="rajpics"

    # local_dst_uri = boto.storage_uri(
    # request.form(["imageid"]), LOCAL_FILE)

    bucket_dst_uri = boto.storage_uri(
            CATS_BUCKET + '/' + request.form.get("imageid"), GOOGLE_STORAGE)
    print("image :"+request.form.get("imageid"))
    
    print("Images written to google cloud")

    return app.response_class(json.dumps(imagelist), content_type='application/json')
@app.route('/getGoogleCloudInstanceList', methods=['POST', 'GET'])
def getGoogleCloudInstanceList():
    # http://127.0.0.1:53000/getGoogleCloudInstanceList

    # gcs_oauth2_boto_plugin.SetFallbackClientIdAndSecret(tmpclientid, tmpclientsecret)

    imagelist = []

    credentials = GoogleCredentials.get_application_default()
    service = build('compute', 'v1', credentials=credentials)
    PROJECT = 'bamboo-machine-422'
    ZONE = 'us-central1-a'
    request = service.instances().list(project=tmpprojectid, zone=ZONE)
    response = request.execute()
    print("Instance list:"+json.dumps(response))

    return app.response_class(json.dumps(response), content_type='application/json')
  