pipeline {
  agent any
  environment {
    DOCKER_IMAGE = "username/react-tictactoe:latest"
    DOCKER_CREDENTIALS = "dockerhub-credentials"
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build Docker Image') {
      steps {
        script {
          bat "docker build -t %DOCKER_IMAGE% ."
        }
      }
    }

    stage('Push to DockerHub') {
      steps {
        withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
          bat "docker push %DOCKER_IMAGE%"
        }
      }
    }

    stage('Deploy Test') {
      steps {
        script {
          bat 'docker rm -f tictactoe-test || echo "No previous container"'
          bat "docker run -d --name tictactoe-test -p 8080:80 %DOCKER_IMAGE%"
        }
      }
    }
  }

  post {
    success { echo "✅ Successfully built and deployed to test container" }
    failure { echo "❌ Build failed" }
  }
}
