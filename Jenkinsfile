pipeline {
    agent { label 'Jenkins-Agent' }
    tools {
        jdk 'Java17'
        maven 'Maven3'
    }
    environment {
        APP_NAME = "angular-app"
        RELEASE = "1.0.0"
        DOCKER_USER = "dali05"
        DOCKER_PASS = credentials("dockerhub")
        IMAGE_NAME = "${DOCKER_USER}/${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
        JENKINS_API_TOKEN = credentials("JENKINS_API_TOKEN")
    }

    stages {
        stage("Cleanup Workspace") {
            steps {
                cleanWs()
            }
        }

        stage("Checkout from SCM") {
            steps {
                git branch: 'main', credentialsId: 'github', url: 'https://github.com/dali05/livraison-front'
            }
        }

        stage("Build Angular Application") {
            steps {
                sh 'npm install'
                sh 'ng build --configuration=production'
            }
        }

        stage("Build Docker Image") {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub') {
                        def app = docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                        app.push()
                        app.push("latest")
                    }
                }
            }
        }

        stage("Deploy to Kubernetes") {
            steps {
                script {
                    sh '''
                    kubectl apply -f k8s/deployment.yaml
                    kubectl apply -f k8s/service.yaml
                    '''
                }
            }
        }

        stage("Cleanup Docker Images") {
            steps {
                script {
                    sh "docker rmi ${IMAGE_NAME}:${IMAGE_TAG} || true"
                    sh "docker rmi ${IMAGE_NAME}:latest || true"
                }
            }
        }

        stage("Trigger CD Pipeline") {
            steps {
                script {
                    sh """
                    curl -v -k --user root:${JENKINS_API_TOKEN} -X POST -H 'cache-control: no-cache' -H 'content-type: application/x-www-form-urlencoded' \
                    --data 'IMAGE_TAG=${IMAGE_TAG}' \
                    'http://ec2-13-60-250-38.eu-north-1.compute.amazonaws.com:8080/job/gitops-register-app-cd/buildWithParameters?token=gitops-token'
                    """
                }
            }
        }
    }
}
