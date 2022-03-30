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
           echo 'Vamos a iniciar con esto!!'
           pwd
           cd /home/ubuntu
           rm -dr web-app
           mkdir web-app
           cd web-app
           git clone https://github.com/avudoyra/cinema-webapp.git
           pwd
           ls
           docker build -t .
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