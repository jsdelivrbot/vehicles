
### Install backend

```
bash ./vehicles_backend/scripts/remake_db.sh
bash ./vehicles_backend/scripts/install.sh
```

### Run backend

```
vehicles-run
```

Now, the server is running on localhost:8888


### Install React frontend

```
npm install
npm run build
```


        (c) configuration information:

            config.py contains database user information
            it can take config data from environment variables
                as well

        (d) get an account from
            https://cloud.google.com/storage/docs/json_api/

        (e) Google Cloud SDK

                install https://cloud.google.com/sdk/docs/

                https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe

                gcloud components install --help
                gcloud components list
                gcloud auth login
                gsutil config -a
                gcloud components install app-engine-python
                gcloud components install app-engine-python-extras

        (f) DO one of the following
           (f.1) add/edit the below to .boto file
               under section [Credentials]

               export gs_access_key_id=*
                export gs_secret_access_key=*

               or

           (f.2) define OS ( operating system ) environment variable
           using export in a shell

               or in the OS environment options

                export gs_access_key_id = *
                export gs_secret_access_key = *
