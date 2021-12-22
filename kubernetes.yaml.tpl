apiVersion: apps/v1
kind: Deployment
metadata:
  name: bridge-react-app
  labels:
    app: bridge-react-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: bridge-react-app
  template:
    metadata:
      labels:
        app: bridge-react-app
    spec:
      containers:
      - name: bridge-react-app
        image: us-west2-docker.pkg.dev/GOOGLE_CLOUD_PROJECT/palms-park-bridge-club/bridge-react-app:COMMIT_SHA
        ports:
        - containerPort: 8080
---
kind: Service
apiVersion: v1
metadata:
  name: bridge-react-app
spec:
  selector:
    app: bridge-react-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: LoadBalancer
