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

       stage('Install Node.js and Angular CLI') {
                steps {
                    sh 'npm install -g @angular/cli'
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



        stage("Cleanup Docker Images") {
            steps {
                script {
                    sh "docker rmi ${IMAGE_NAME}:${IMAGE_TAG} || true"
                    sh "docker rmi ${IMAGE_NAME}:latest || true"
                }
            }
        }


    }
}
