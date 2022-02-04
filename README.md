<<<<<<< HEAD
# newton-candidate

## Getting Started

These instructions will get you up and running.

### Developing

You'll have to modify your hosts file (/etc/hosts/ on Mac) to attach local.newton.co to 127.0.0.1. Append this line to the hosts file:

```
127.0.0.1       local.newton.co
```

Basic development

```
npm run dev
```

### Windows

For Windows machines, in order to run the tests successfully, you will need to run the command:

```
npm run win-test
```

### Running HTTPS locally (Recommended)

\*\* Disclaimer: This only works for MacOS. If you do not have a MacOS, please follow the non-HTTPs steps to run it locally
To run the project on https please follow the commands below (run all the commands below under the ssl folder):

When asked for certificate information just answer with any newton information provided

```
cd ./ssl

# create a root authority cert

./create_root_cert_and_key.sh

# create a wildcard cert for local.newton.co

./create_certificate_for_domain.sh local.newton.co
```

Once all the certificates are created run the command below so your Mac recognises all the previously generated certificates (Stay within ./ssl)

```
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain rootCA.pem
```

### Running non-HTTPS locally

In case you are not able to run the https version of the app, you will have to download a specific version of Brave as their latest version doesn't accept non-https calls.
The most up to date version that still had the changes we needed is this [one](https://github.com/brave/brave-browser/releases/tag/v1.24.86) and download the Brave-Browser-x64.dmg file.
To run the application in non-HTTPS you'll have to remove the `--https` & `--cert ./ssl/local.newton.co.crt --key ./ssl/device.key` from the command before running for example `npm run dev`
=======
# newton-candidate-melissa
>>>>>>> 6a75e1c36969ac7d721766836b365b38a10db173
