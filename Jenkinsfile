import groovy.json.JsonSlurperClassic

def jsonParse(def json) {
    new groovy.json.JsonSlurperClassic().parseText(json)
}
pipeline {
  agent any
  environment {
    appName = "variable" 
  }
  stages {

 stage("Iniciar y correr"){
     
      steps {
          script {			
           sh '''
           echo 'hola mundo'
           pwd
           sudo su -S jenkins
           cd /home/avudoyra/web-app
           docker build -t imagecicd .
           docker images
           '''
        }
      }
    }
  }
  post {
      always {          
          deleteDir()
           sh "echo 'fase always'"
      }
      success {
            sh "echo 'fase success'"
        }

      failure {
            sh "echo 'fase failure'"
      }
      
  }
}  