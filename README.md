# ProjectTemplateExample


Sonarqube Scan:
1. Install docker sonarqube as decribed: 
   - docker run -d --name sonarqube -p 9000:9000 sonarqube
   - Log in to http://localhost:9000 with System Administrator credentials (admin/admin).
   - After your server is up and running, you'll need to install one SonarScanners your machines where analysis will be performed.
   
   See also https://github.wdf.sap.corp/pages/sapsalescloud/matterhorn-architecture/06-Onboarding/developer-setup/#installing-via-docker-image

2. npm run sonarqube

How to deploy to AWS kubernetes cluster:
1. Please follow all the steps required to connect to our AWS kubernetes cluster described in https://github.wdf.sap.corp/pages/sapsalescloud/matterhorn-architecture/06-Onboarding/developer-workflow/steps_dev_workflow/

2. Please add your own D-number in the marked places in files k8s/project_manifest.yaml, k8s/mongo_manifest.yaml and k8s/pv_manifest.yaml. This is necessary to avoid overwriting the deployments of other colleagues

3. Uncomment line 12 in file database/index.ts and also enter your D-number. Comment line 9 in the same file.

4. (Run "skaffold init", select "Dockerfile" to build "project_manifest" and "None" to build "mongo_manifest". This step is only necessary if there is not already a skaffold.yaml in the root directory of your project. Otherwise, there will be an error message.)

5. Run "skaffold run" and wait for the deployment to finish

6. Run "kubectl get pods | grep '<your d-number>'". There should be two pods running, one for the nodejs project, one for the mongoDB.

7. Use port forwarding to connect to the pods:
   - kubectl port-forward '<name of project pod>' 50051 --> while running you can use bloomRPC to send requests to localhost:50051
   - kubectl port-forward '<name of mongo pod>' 27017 --> while running you can use MongoDB Compass with URL localhost:27017 to explore the mongodb

8. If you finished working, please use "skaffold delete" to  undeploy all artifacts again!!!