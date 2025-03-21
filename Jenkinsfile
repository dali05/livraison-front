stage('Build Angular') {
    steps {
        sh 'ng build --configuration=production'
    }
}

stage('Docker Build & Push') {
    steps {
        script {
            docker.withRegistry('', 'dockerhub') {
                def app = docker.build("dali05/angular-app:${BUILD_NUMBER}")
                app.push()
                app.push('latest')
            }
        }
    }
}

stage('Deploy to Kubernetes') {
    steps {
        sh 'kubectl apply -f deployment.yaml'
        sh 'kubectl apply -f service.yaml'
    }
}
