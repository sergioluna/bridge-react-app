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
        - containerPort: 80
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
    targetPort: 80
  type: NodePort
---
apiVersion: networking.gke.io/v1
kind: ManagedCertificate
metadata:
  name: palmsparkbridge-managed-cert
spec:
  domains:
    - palmsparkbridge.com
    - www.palmsparkbridge.com
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: palmsparkbridge-ingress
  annotations:
    kubernetes.io/ingress.global-static-ip-name: palmsparkbridge-ip-address
    networking.gke.io/managed-certificates: palmsparkbridge-managed-cert
    kubernetes.io/ingress.class: "gce"
spec:
  defaultBackend:
    service:
      name: bridge-react-app
      port:
        number: 80
  rules:
    - host: palmsparkbridge.com
      http:
        paths:
          - path: /*
            pathType: ImplementationSpecific
            backend:
              service:
                name: bridge-react-app
                port:
                  number: 80