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
           '''
          }
          dir('web-app'){
            deleteDir()
          }
          script {
            sh '''
            mkdir web-app
            cd web-app
            git clone https://github.com/avudoyra/cinema-webapp.git
            cd cinema-webapp
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