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

 stage("Iniciar con el pipeline y ver en que directorio estamos"){
     
      steps {
          script {			
           sh '''
           echo 'Vamos a iniciar con esto!!'
           pwd
           '''
          }
      }
    }
 stage("Borrar el codigo anterior, clonar el nuevo y construir una nueva imagen"){
      steps {
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
            docker build -t demoweb .
            docker images
            '''
          }
     }
  }
 stage("Guardar la imagen creada en el repositorio de ECR"){
      steps {
          script {
            sh '''
            aws ecr get-login-password --region ca-central-1 | docker login --username AWS --password-stdin 435053451664.dkr.ecr.ca-central-1.amazonaws.com
            docker tag demoweb:latest 435053451664.dkr.ecr.ca-central-1.amazonaws.com/demo-web-app:latest
            docker push 435053451664.dkr.ecr.ca-central-1.amazonaws.com/demo-web-app:latest
            '''
          }
     }
  }
 stage("Crear cluster en ECS"){
      steps {
          script {
            sh '''
            aws ecs create-cluster --cluster-name fargate-cluster
            aws ecs register-task-definition --cli-input-json file://fargate-task.json
            aws ecs list-task-definitions
            aws ecs create-service --cluster fargate-cluster --service-name fargate-service --task-definition sample-fargate:1 --desired-count 1 --launch-type "FARGATE" --network-configuration "awsvpcConfiguration={subnets=[subnet-abcd1234],securityGroups=[sg-abcd1234],assignPublicIp=ENABLED}"
            aws ecs list-services --cluster fargate-cluster
            '''
          }
     }
  }
}
 post {
     always {          
          sh "echo 'Esto siempre se reproduce'"
      }
     success {
            sh "echo 'Todo salio con exito'"
        }

     failure {
            sh "echo 'El pipeline fallo'"
      }
      
    }
}  